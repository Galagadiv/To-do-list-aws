import {useEffect, useState} from "react";
import "../../global-styles/index.css";
import "./ToDoPage.css";
import {Link} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import Header from "../../components/Header/Header";

type Props = {};

type Task = {
  userId: string;
  taskId: string;
  completed: boolean;
  createdAt: string;
  description?: string;
  title: string;
};

export default function ToDoPage({}: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const userId = localStorage.getItem("accessToken");
        if (!userId) {
          throw new Error("User ID не знайдено");
        }

        const url = new URL(
          "https://ubu9jz8e3f.execute-api.us-east-1.amazonaws.com/dev/getUserTask"
        );
        url.searchParams.append("userId", userId);

        const res = await fetch(url.toString(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Не вдалося отримати завдання");
        }

        const data: Task[] = await res.json();
        setTasks(data);
      } catch (err: any) {
        console.error("Fetch error:", err.message || err);
        alert("Виникла помилка при отриманні завдань: " + (err.message || err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      <Header title="Список завдань" />
      <main className="pageWrapper">
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

        {isLoading ? (
          <h2>Триває завантаження</h2>
        ) : tasks && tasks.length > 0 ? (
          <ul className="task-list">
            {tasks.map((task) => (
              <li className="task" key={task.taskId}>
                <div style={{display: "flex", gap: "6px"}}>
                  <button
                    className={`control-btn done-query ${
                      task.completed ? "done" : "undone"
                    }`}
                    // onDoubleClick={handleTaskDone}
                  >
                    {task.completed ? (
                      <DoneAllOutlinedIcon className="icon" />
                    ) : (
                      <DoneOutlinedIcon className="icon" />
                    )}
                  </button>
                  <div className="task-info-bar">
                    <h2 className="task-title">{task.title}</h2>
                    <h3 className="task-status">
                      {task.completed ? "Завершено" : "Активне"}
                    </h3>
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
            ))}
          </ul>
        ) : (
          <h2>На жаль, у вас немає завдань</h2>
        )}

        <div>
          <Link to="/new-task" className="addButton">
            <AddIcon className="icon" />
          </Link>
        </div>
      </main>
    </>
  );
}
