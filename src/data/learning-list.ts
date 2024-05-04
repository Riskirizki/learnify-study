export const learningList = [
  {
    id: 1,
    title: "Learn React",
    isDone: true,
  },
  {
    id: 2,
    title: "Complete project tasks",
    isDone: false,
  },
  {
    id: 3,
    title: "Fix bugs",
    isDone: true,
  },
  {
    id: 4,
    title: "Manage study time",
    isDone: false,
  },
];

let nextId = Math.max(...learningList.map((item) => item.id)) + 1;

export function addLearningListItem(newItem: {
  title: string;
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
