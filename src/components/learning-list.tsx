import { learningList } from "../data/learning-data";

export function LearningList() {
  return (
    <ul>
      {learningList.map((learningList) => (
        <li key={learningList.id}>{learningList.title}</li>
      ))}
    </ul>
  );
}
