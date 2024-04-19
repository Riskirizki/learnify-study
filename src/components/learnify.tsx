import { learnify } from "../data/learnify";

export function Learnify() {
  return (
    <ul>
      {learnify.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
