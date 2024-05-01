import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import LearningList from "./components/learning-list";
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <div className="flex flex-col items-center">
      <nav className="bg-gray-200 py-4 w-full">
        <ul className="flex justify-center space-x-4">
          <li>
            <Link to="/" className="text-gray-800 hover:text-blue-500">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/learning-list"
              className="text-gray-800 hover:text-blue-500"
            >
              Learning List
            </Link>
          </li>
          <li>
            <Link to="/detail" className="text-gray-800 hover:text-blue-500">
              Detail
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learning-list" element={<LearningList />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
