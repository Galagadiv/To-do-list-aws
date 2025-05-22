import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./global-styles/reset.css";
import "./global-styles/index.css";
import {BrowserRouter, Routes, Route} from "react-router";
import App from "./pages/App/App.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import RegPage from "./pages/RegPage/RegPage.tsx";
import ToDoPage from "./pages/ToDoPage/ToDoPage.tsx";
import ManageTaskPage from "./pages/ManageTaskPage/ManageTaskPage.tsx";

const basename = "/To-do-list-aws";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegPage />} />
        <Route path="/task-list" element={<ToDoPage />} />
        <Route path="/new-task" element={<ManageTaskPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
