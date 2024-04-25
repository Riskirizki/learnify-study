import { LearningList } from "./components/learning-list";

export function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Welcome to Learnify Study!
      </h1>
      <LearningList />
    </div>
  );
}
