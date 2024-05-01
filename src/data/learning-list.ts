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
