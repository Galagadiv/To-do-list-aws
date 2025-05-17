import React, {useState} from "react";
import {Link} from "react-router";
import "./ManageTaskPage.css";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";

type Props = {};

export default function ManageTaskPage({}: Props) {
  const [done, setDone] = useState<boolean>(false);

  const handleTaskDone = () => {
    setDone((prev) => !prev);
  };

  return (
    <main className="pageManageTaskWrapper">
      <div>
        <Link to="/login" className="links">
          Вийти
        </Link>
        <h1 className="pageTitle">Створіть завдання</h1>
        <Link to="/login" className="links">
          Вийти
        </Link>
      </div>
      <div className="task">
        <div className="task-info-bar">
          <h2 className="task-title">Title:</h2>
          <input placeholder="Введіть заголовок ..."> </input>
        </div>
        <div className="task-control-btn-bar">
          <button
            className={`control-btn done-query ${!done ? "undone" : "done"}`}
            onClick={handleTaskDone}
          >
            {!done ? (
              <DoneOutlinedIcon className="icon" />
            ) : (
              <DoneAllOutlinedIcon className="icon" />
            )}
          </button>
        </div>
      </div>
      <div>
        <Link to="/new-task" className="addButton">
          <AddIcon className="icon" />
        </Link>
      </div>
    </main>
  );
}
