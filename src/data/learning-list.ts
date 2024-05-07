export const learningList = [
  {
    id: 1,
    title: "Learn React",
    description: "Study React fundamentals and build projects.",
    deadline: "2024-06-30",
    priority: "High",
    isDone: true,
  },
  {
    id: 2,
    title: "Complete project tasks",
    description: "Finish tasks related to ongoing projects.",
    deadline: "2024-07-15",
    priority: "Medium",
    isDone: false,
  },
  {
    id: 3,
    title: "Fix bugs",
    description: "Debug and fix issues in existing codebases.",
    deadline: "2024-07-30",
    priority: "High",
    isDone: true,
  },
  {
    id: 4,
    title: "Manage study time",
    description:
      "Organize time effectively to balance learning and other activities.",
    deadline: "2024-08-15",
    priority: "Medium",
    isDone: false,
  },
  {
    id: 5,
    title: "Prepare presentation slides",
    description: "Create slides for upcoming project presentation.",
    deadline: "2024-08-20",
    priority: "Medium",
    isDone: false,
  },
];

let nextId = Math.max(...learningList.map((item) => item.id)) + 1;

export function addLearningListItem(newItem: {
  title: string;
  description: string;
  deadline: string;
  priority: string;
  isDone: boolean;
}) {
  const newItemWithId = { ...newItem, id: nextId++ };
  learningList.push(newItemWithId);
  return newItemWithId;
}

export function deleteLearningListItemById(idToDelete: number) {
  const indexToDelete = learningList.findIndex(
    (item) => item.id === idToDelete
  );
  if (indexToDelete !== -1) {
    learningList.splice(indexToDelete, 1);
  }
}

export function editLearningListItemById(
  idToEdit: number,
  updatedItem: {
    title: string;
    description: string;
    deadline: string;
    priority: string;
    isDone: boolean;
  }
) {
  const indexToEdit = learningList.findIndex((item) => item.id === idToEdit);
  if (indexToEdit !== -1) {
    learningList[indexToEdit] = {
      ...learningList[indexToEdit],
      ...updatedItem,
    };
  }
}
