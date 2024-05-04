import { useState } from "react";
import { Link } from "react-router-dom";
import { learningList } from "../data/learning-list";

export function LearningList() {
  const [keyword, setKeyword] = useState("");
  const [learningListItems, setLearningListItems] = useState(learningList);
  const [newLearningListTitle, setNewLearningListTitle] = useState("");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewLearningListTitle(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newLearningListTitle.trim()) return;

    const nextId = Math.max(...learningListItems.map((item) => item.id), 0) + 1;
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

  const filteredLearningListItems = learningListItems.filter(
    (learningListItem) => learningListItem.title.toLowerCase().includes(keyword)
  );

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full max-w-3xl mx-auto p-6 bg-gray-700 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
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
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md mb-4"
            required
          />
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
        <hr className="mb-6" />
        <ul className="list-none p-0">
          {filteredLearningListItems.map((learningListItem) => (
            <li
              key={learningListItem.id}
              className="bg-white p-4 mb-4 rounded-md shadow-md flex justify-between items-center transition duration-300 ease-in-out transform hover:bg-gray-200 hover:scale-105 cursor-pointer"
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
