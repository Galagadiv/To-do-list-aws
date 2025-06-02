import {useEffect, useState} from "react";
import "../../global-styles/index.css";
import "./ToDoPage.css";
import {Link, useNavigate} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import Header from "../../components/Header/Header";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import CircularProgress from "@mui/material/CircularProgress";

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
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [modalState, setModalState] = useState<boolean>(false);

  const [statusFilter, setStatusFilter] = useState<boolean | null>(false);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem("accessToken");
      if (!userId) {
        throw new Error("User ID не знайдено");
      }

      const url = new URL(
        "https://ubu9jz8e3f.execute-api.us-east-1.amazonaws.com/dev/getUserTasks"
      );
      url.searchParams.append("userId", userId);
      if (statusFilter) {
        url.searchParams.append("completed", statusFilter.toString());
      }

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

  useEffect(() => {
    fetchTasks();
  }, [statusFilter]);

  // const openModal = () => {setModalState(true)}
  // const closeModal = () => {setModalState(false)}

  const handleDelete = async (taskTitle: string, taskId: string) => {
    if (confirm(`Ви дійсно хочете видалити завдання: ${taskTitle}`) !== true) {
      return;
    }
    const url = new URL(
      "https://ubu9jz8e3f.execute-api.us-east-1.amazonaws.com/dev/deleteTask"
    );

    const userId = localStorage.getItem("accessToken");
    if (!userId) {
      throw new Error("User ID не знайдено");
    }

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userId, taskId}),
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || "Не вдалося видалити завдання");
    } else {
      fetchTasks();
    }
  };

  const handleEdit = (taskId: string) => {
    navigate(`/new-task/${taskId}`);
  };

  const handleTaskDone = async (taskId: string) => {
    const userId = localStorage.getItem("accessToken");
    if (!userId) {
      throw new Error("User ID не знайдено");
    }

    try {
      const res = await fetch(
        "https://ubu9jz8e3f.execute-api.us-east-1.amazonaws.com/dev/updateTask",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            taskId,
            completed: true,
          }),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Не вдалося оновити завдання");
      }
      fetchTasks();
    } catch (err: any) {
      console.error("Помилка оновлення таски:", err.message || err);
      alert("Не вдалося відмітити завдання як виконане");
    }
  };

  return (
    <>
      <Header title="Список завдань" />
      <main className="pageWrapper">
        <ButtonGroup
          variant="contained"
          className="filters-bar"
          aria-label="Status filter button group"
        >
          <Button
            onClick={() => {
              setStatusFilter(null);
            }}
            className="filter-btn"
          >
            Всі
          </Button>
          <Button
            onClick={() => {
              setStatusFilter(false);
            }}
            className="filter-btn"
          >
            Активні
          </Button>
          <Button
            onClick={() => {
              setStatusFilter(true);
            }}
            className="filter-btn"
          >
            Завершені
          </Button>
        </ButtonGroup>

        {isLoading ? (
          <div style={{display: "flex", flexDirection: "column"}}>
            <CircularProgress size="30px" sx={{mx: "auto", color: "#646cff"}} />
            <h2 style={{margin: "0 auto"}}>Триває завантаження</h2>
          </div>
        ) : tasks && tasks.length > 0 ? (
          <ul className="task-list">
            {tasks.map((task) => (
              <li className="task" key={task.taskId}>
                <div style={{display: "flex", gap: "6px"}}>
                  <button
                    className={`control-btn done-query ${
                      task.completed ? "done" : "undone"
                    }`}
                    onDoubleClick={() => handleTaskDone(task.taskId)}
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
                  <button
                    className="control-btn edit"
                    onClick={() => handleEdit(task.taskId)}
                  >
                    <EditOutlinedIcon className="icon edit" />
                  </button>
                  <button
                    className="control-btn del"
                    onClick={() => handleDelete(task.title, task.taskId)}
                  >
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
