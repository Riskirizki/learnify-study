import { useState } from "react";
import { Link } from "react-router-dom";
import { learningList } from "../data/learning-list";

const LearningList = () => {
  const [keyword, setKeyword] = useState("");
  const [learningListItems, setLearningListItems] = useState(learningList);
  const [newLearningListTitle, setNewLearningListTitle] = useState("");
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [editedItemTitle, setEditedItemTitle] = useState("");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewLearningListTitle(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newLearningListTitle.trim()) return;

    const nextId =
      learningListItems.length > 0
        ? Math.max(...learningListItems.map((item) => item.id)) + 1
        : 1;
    const newLearningListItem = {
      id: nextId,
      title: newLearningListTitle.trim(),
      isDone: false,
    };

    setLearningListItems((prevItems) => [...prevItems, newLearningListItem]);
    setNewLearningListTitle("");
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value.toLowerCase());
  }

  function removeLearningListItemById(idToRemove: number) {
    setLearningListItems((prevItems) =>
      prevItems.filter((item) => item.id !== idToRemove)
    );
  }

  function handleEdit(id: number, title: string) {
    setEditItemId(id);
    setEditedItemTitle(title);
  }

  function handleEditInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEditedItemTitle(event.target.value);
  }

  function handleEditSubmit(
    event: React.FormEvent<HTMLFormElement>,
    id: number
  ) {
    event.preventDefault();
    const editedItems = learningListItems.map((item) =>
      item.id === id ? { ...item, title: editedItemTitle.trim() } : item
    );
    setLearningListItems(editedItems);
    setEditItemId(null);
  }

  const filteredLearningListItems = learningListItems.filter(
    (learningListItem) => learningListItem.title.toLowerCase().includes(keyword)
  );

  return (
    <div className="max-w-lg mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Learnify Study</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          id="newItem"
          name="newItem"
          placeholder="Enter new item title"
          value={newLearningListTitle}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:border-blue-500"
          required
        />
        <button
          type="submit"
          className="block w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Add New Item
        </button>
      </form>
      <form className="mb-6">
        <input
          type="text"
          id="keyword"
          name="q"
          placeholder="Search learning items..."
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:border-blue-500"
        />
      </form>
      <hr className="mb-6" />
      <ul className="list-none p-0">
        {filteredLearningListItems.map((learningListItem) => (
          <li
            key={learningListItem.id}
            className="bg-white p-4 mb-4 rounded-md shadow-md flex justify-between items-center"
          >
            {editItemId === learningListItem.id ? (
              <form
                onSubmit={(e) => handleEditSubmit(e, learningListItem.id)}
                className="flex items-center w-full"
              >
                <input
                  type="text"
                  value={editedItemTitle}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:border-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                  Save
                </button>
              </form>
            ) : (
              <>
                <Link
                  to={`/detail/${learningListItem.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {learningListItem.title}
                </Link>
                <div>
                  <button
                    onClick={() =>
                      handleEdit(learningListItem.id, learningListItem.title)
                    }
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300 ease-in-out"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      removeLearningListItemById(learningListItem.id)
                    }
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                  >
                    Remove
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LearningList;
