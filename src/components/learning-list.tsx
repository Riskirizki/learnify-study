// LearningList.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { learningList } from "../data/learning-list";

export function LearningList() {
  const [keyword, setKeyword] = useState("");
  const [learningListItems, setLearningListItems] = useState(learningList);
  const [newLearningListTitle, setNewLearningListTitle] = useState("");
  const [newLearningListDescription, setNewLearningListDescription] =
    useState("");
  const [newLearningListPriority, setNewLearningListPriority] =
    useState("Medium");
  const [newLearningListDeadline, setNewLearningListDeadline] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLearningListTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewLearningListDescription(event.target.value);
  };

  const handlePriorityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNewLearningListPriority(event.target.value);
  };

  const handleDeadlineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLearningListDeadline(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newLearningListTitle.trim() || !newLearningListDescription.trim()) {
      setErrorMessage("Title and description are required");
      return;
    }

    const deadlinePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!deadlinePattern.test(newLearningListDeadline)) {
      setErrorMessage("Invalid deadline format. Please use YYYY-MM-DD format.");
      return;
    }

    const nextId = Math.max(...learningListItems.map((item) => item.id), 0) + 1;
    const newLearningListItem = {
      id: nextId,
      title: newLearningListTitle.trim(),
      description: newLearningListDescription,
      deadline: newLearningListDeadline,
      priority: newLearningListPriority,
      isDone: false,
    };

    setLearningListItems((prevItems) => [...prevItems, newLearningListItem]);
    setNewLearningListTitle("");
    setNewLearningListDescription("");
    setNewLearningListDeadline("");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value.toLowerCase());
  };

  const filteredLearningListItems = learningListItems.filter(
    (learningListItem) =>
      learningListItem.title.toLowerCase().includes(keyword) ||
      learningListItem.description.toLowerCase().includes(keyword)
  );

  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-3xl mx-auto p-6 bg-gray-700 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Welcome to Learnify Study!
        </h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <label
            htmlFor="newItem"
            className="block mb-2 text-lg font-medium text-white"
          >
            Add New Item
          </label>
          <input
            type="text"
            id="newItem"
            name="newItem"
            placeholder="Enter new item title"
            value={newLearningListTitle}
            onChange={handleTitleChange}
            className="w-full px-4 py-2 border rounded-md mb-4"
            required
          />
          <input
            type="text"
            id="newDescription"
            name="newDescription"
            placeholder="Enter item description"
            value={newLearningListDescription}
            onChange={handleDescriptionChange}
            className="w-full px-4 py-2 border rounded-md mb-4"
            required
          />
          <input
            type="date"
            id="newDeadline"
            name="newDeadline"
            value={newLearningListDeadline}
            onChange={handleDeadlineChange}
            className="w-full px-4 py-2 border rounded-md mb-4"
          />
          <select
            id="priority"
            name="priority"
            value={newLearningListPriority}
            onChange={handlePriorityChange}
            className="w-full px-4 py-2 border rounded-md mb-4"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Add
          </button>
        </form>
        <form className="mb-6">
          <label
            htmlFor="keyword"
            className="block mb-2 text-lg font-medium text-white"
          >
            Search
          </label>
          <input
            type="text"
            id="keyword"
            name="q"
            placeholder="Search learning items..."
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border rounded-md mb-4"
          />
        </form>
        {errorMessage && (
          <div className="bg-red-500 text-white p-4 mb-4 rounded-md">
            {errorMessage}
          </div>
        )}
        <hr className="mb-6" />
        <ul className="list-none p-0">
          {filteredLearningListItems.map((learningListItem) => (
            <li
              key={learningListItem.id}
              className="bg-gray-200 p-4 mb-4 rounded-md shadow-md flex justify-between items-center transition duration-300 ease-in-out transform hover:bg-gray-300 hover:scale-105 cursor-pointer"
            >
              <Link
                to={`/learning-list/${learningListItem.id}`}
                className="text-lg text-blue-500 hover:text-blue-700"
              >
                {learningListItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
