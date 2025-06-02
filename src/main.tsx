import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./global-styles/reset.css";
import "./global-styles/index.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./pages/App/App.tsx";
import ToDoPage from "./pages/ToDoPage/ToDoPage.tsx";
import ManageTaskPage from "./pages/ManageTaskPage/ManageTaskPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/task-list" element={<ToDoPage />} />
        <Route path="/new-task/:taskId" element={<ManageTaskPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
