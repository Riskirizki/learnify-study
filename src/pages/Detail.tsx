import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  deleteLearningListItemById,
  editLearningListItemById,
  learningList,
} from "../data/learning-list";

type LearningItem = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  priority: string;
  isDone: boolean;
};

export function Detail() {
  const { id } = useParams<{ id: string }>();
  const itemId = id ? parseInt(id, 10) : undefined;

  const navigate = useNavigate();
  const [learningItem, setLearningItem] = useState<LearningItem | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedDeadline, setEditedDeadline] = useState("");
  const [editedPriority, setEditedPriority] = useState("");
  const [editedStatus, setEditedStatus] = useState(false);

  useEffect(() => {
    const foundItem = learningList.find((item) => item.id === itemId);
    if (foundItem) {
      setLearningItem(foundItem);
      setEditedTitle(foundItem.title);
      setEditedDescription(foundItem.description);
      setEditedDeadline(foundItem.deadline);
      setEditedPriority(foundItem.priority);
      setEditedStatus(foundItem.isDone);
    } else {
      navigate("/");
    }
  }, [itemId, navigate]);

  if (itemId === undefined || learningItem === null) {
    return <p className="text-red-500">Item not found!</p>;
  }

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    if (itemId !== undefined) {
      deleteLearningListItemById(itemId);
      navigate("/");
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleEdit = () => {
    setShowEditForm(true);
  };

  const confirmEdit = () => {
    if (itemId !== undefined) {
      editLearningListItemById(itemId, {
        title: editedTitle,
        description: editedDescription,
        deadline: editedDeadline,
        priority: editedPriority,
        isDone: editedStatus,
      });
      setShowEditForm(false);
      setLearningItem({
        id: itemId,
        title: editedTitle,
        description: editedDescription,
        deadline: editedDeadline,
        priority: editedPriority,
        isDone: editedStatus,
      });
      navigate("/");
    }
  };

  const cancelEdit = () => {
    setShowEditForm(false);
    if (learningItem) {
      setEditedTitle(learningItem.title);
      setEditedDescription(learningItem.description);
      setEditedDeadline(learningItem.deadline);
      setEditedPriority(learningItem.priority);
      setEditedStatus(learningItem.isDone);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-700 text-white">
      <div className="w-full max-w-2xl p-10 bg-white rounded-lg shadow-lg border border-gray-200 text-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Learning Item Detail
        </h2>
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-base font-medium mb-2 text-gray-800">
              Title: {learningItem.title}
            </h3>
            <p className="text-base font-medium mb-2 text-gray-800">
              Description: {learningItem.description}
            </p>
            <p className="text-base font-medium mb-2 text-gray-800">
              Deadline: {learningItem.deadline}
            </p>
            <p className="text-base font-medium mb-2 text-gray-800">
              Priority: {learningItem.priority}
            </p>
            <p className="flex items-center">
              Status:{" "}
              <input
                type="checkbox"
                checked={editedStatus}
                onChange={(e) => setEditedStatus(e.target.checked)}
                className="ml-2 h-4 w-4 text-blue-500"
              />
              <span className="ml-1">
                {editedStatus ? "Completed" : "Pending"}
              </span>
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 shadow-md transition duration-300 ease-in-out"
            >
              Delete
            </button>
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-md transition duration-300 ease-in-out"
            >
              Edit
            </button>
          </div>
          {showEditForm && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Edit Item
              </h3>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-md mb-2 text-base"
              />
              <input
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-md mb-2 text-base"
              />
              <input
                type="date"
                value={editedDeadline}
                onChange={(e) => setEditedDeadline(e.target.value)}
                className="w-full px-4 py-2 border rounded-md mb-2 text-base"
              />
              <select
                value={editedPriority}
                onChange={(e) => setEditedPriority(e.target.value)}
                className="w-full px-4 py-2 border rounded-md mb-2 text-base"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <div className="flex items-center">
                Status:{" "}
                <input
                  type="checkbox"
                  checked={editedStatus}
                  onChange={(e) => setEditedStatus(e.target.checked)}
                  className="ml-2 h-4 w-4 text-blue-500"
                />
                <span className="ml-1">
                  {editedStatus ? "Completed" : "Pending"}
                </span>
              </div>
              <div className="flex justify-center space-x-4 mt-2">
                <button
                  onClick={confirmEdit}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 shadow-md transition duration-300 ease-in-out ml-3"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 shadow-md transition duration-300 ease-in-out"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {showConfirmation && (
            <div className="flex flex-col items-center space-y-2 mt-4">
              <p className="text-red-500 text-sm font-semibold">
                Are you sure you want to delete this item?
              </p>
              <div className="space-x-2">
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 shadow-md transition duration-300 ease-in-out"
                >
                  Yes
                </button>
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 shadow-md transition duration-300 ease-in-out"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
