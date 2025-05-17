import React, {useState} from "react";
import "./ToDoPage.css";
import {Link} from "react-router";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";

type Props = {};

export default function ToDoPage({}: Props) {
  const [done, setDone] = useState<boolean>(false);

  const handleTaskDone = () => {
    setDone((prev) => !prev);
  };

  return (
    <main className="pageWrapper">
      <div className="settings-bar">
        <Link to="/login" className="links">
          Вийти
        </Link>
      </div>
      <h1 className="pageTitle">Список завдань</h1>
      <div className="filters-bar">
        <button onClick={() => {}} className="filter-btn">
          Статус
        </button>
        <button onClick={() => {}} className="filter-btn">
          Фільтр 2
        </button>
        <button onClick={() => {}} className="filter-btn">
          Фільтр 3
        </button>
      </div>

      <ul className="task-list">
        <li className="task">
          <div style={{display: "flex", gap: "6px"}}>
            <button
              className={`control-btn done-query ${!done ? "undone" : "done"}`}
              onDoubleClick={handleTaskDone}
            >
              {!done ? (
                <DoneOutlinedIcon className="icon" />
              ) : (
                <DoneAllOutlinedIcon className="icon" />
              )}
            </button>
            <div className="task-info-bar">
              <h2 className="task-title">Title</h2>
              <h3 className="task-status">Status</h3>
            </div>
          </div>
          <div className="task-control-btn-bar">
            <button className="control-btn edit">
              <EditOutlinedIcon className="icon edit" />
            </button>
            <button className="control-btn del">
              <DeleteOutlinedIcon className="icon del" />
            </button>
          </div>
        </li>
      </ul>
      <div>
        <Link to="/new-task" className="addButton">
          <AddIcon className="icon" />
        </Link>
      </div>
    </main>
  );
}
