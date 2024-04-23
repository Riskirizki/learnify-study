import { learningList } from "../data/learning-data";

export function LearningList() {
  return (
    <ul>
      {learningList.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
