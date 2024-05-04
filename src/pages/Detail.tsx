import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deleteLearningListItemById,
  editLearningListItemById,
  learningList,
} from "../data/learning-list";

type LearningItem = {
  id: number;
  title: string;
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
  const [editedStatus, setEditedStatus] = useState(false);

  useEffect(() => {
    const foundItem = learningList.find((item) => item.id === itemId);
    if (foundItem) {
      setLearningItem(foundItem);
      setEditedTitle(foundItem.title);
      setEditedStatus(foundItem.isDone);
    }
  }, [itemId]);

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
        isDone: editedStatus,
      });
      setShowEditForm(false);
      setLearningItem({ id: itemId, title: editedTitle, isDone: editedStatus });
      navigate("/");
    }
  };

  const cancelEdit = () => {
    setShowEditForm(false);
    if (learningItem) {
      setEditedTitle(learningItem.title);
      setEditedStatus(learningItem.isDone);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Learning Item Detail
        </h2>
        {learningItem ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Title: {learningItem.title}
            </h3>
            <p className="flex items-center text-gray-700">
              Status:{" "}
              <input
                type="checkbox"
                checked={learningItem.isDone}
                readOnly
                className="ml-2 h-4 w-4 text-blue-500"
              />
              <span className="ml-1">
                {learningItem.isDone ? "Completed" : "Pending"}
              </span>
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
              >
                Delete
              </button>
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                Edit
              </button>
            </div>
            {showEditForm && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Edit Item
                </h3>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md mb-2"
                />
                <div className="flex items-center text-gray-700">
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
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out"
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
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                  >
                    Yes
                  </button>
                  <button
                    onClick={cancelDelete}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-red-500">Item not found!</p>
        )}
      </div>
    </div>
  );
}
