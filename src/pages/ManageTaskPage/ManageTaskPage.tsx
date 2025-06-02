import {useEffect, useState} from "react";
import "../../global-styles/index.css";
import "./ManageTaskPage.css";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import Header from "../../components/Header/Header";

type Props = {
  taskId?: string;
};

type Task = {
  userId: string;
  taskId: string;
  completed: boolean;
  createdAt: string;
  description?: string;
  title: string;
};

export default function ManageTaskPage({taskId}: Props) {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescr, setTaskDescr] = useState<string>("");
  const [_, setTaskData] = useState<Task>();

  useEffect(() => {
    if (!taskId) return;

    const fetchTask = async () => {
      const url = new URL(
        "https://ubu9jz8e3f.execute-api.us-east-1.amazonaws.com/dev/getUserTaskByID"
      );

      const userId = localStorage.getItem("accessToken");
      if (!userId) {
        throw new Error("User ID не знайдено");
      }
      url.searchParams.append("userId", userId);

      url.searchParams.append("taskId", taskId);

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
      const data: Task = await res.json();
      setTaskData(data);

      setTaskTitle(data.title);
      setTaskDescr(data.description || "");
    };

    fetchTask();
  });

  const updateTask = async () => {
    const payload: Record<string, any> = {
      userId: localStorage.getItem("accessToken"),
      title: taskTitle.trim(),
      completed: false,
    };
    if (taskDescr.trim()) {
      payload.description = taskDescr.trim();
    }

    try {
      const res = await fetch(
        "https://ubu9jz8e3f.execute-api.us-east-1.amazonaws.com/dev/updateTask",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Не вдалося створити завдання");
      }

      alert("Завдання створено успішно!");
    } catch (err: any) {
      console.error("Fetch error:", err.message || err);
      alert("Виникла помилка при збереженні завдання.");
    }
  };

  const createTask = async () => {
    if (!taskTitle.trim()) {
      alert("Будь ласка, заповніть заголовок");
      return;
    }

    const payload: Record<string, any> = {
      userId: localStorage.getItem("accessToken"),
      title: taskTitle.trim(),
      completed: false,
    };
    if (taskDescr.trim()) {
      payload.description = taskDescr.trim();
    }

    try {
      const res = await fetch(
        "https://ubu9jz8e3f.execute-api.us-east-1.amazonaws.com/dev/addTask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Не вдалося створити завдання");
      }

      alert("Завдання створено успішно!");
    } catch (err: any) {
      console.error("Fetch error:", err.message || err);
      alert("Виникла помилка при збереженні завдання.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("Access token not found");
      return;
    }

    taskId ? updateTask() : createTask();
  };

  return (
    <>
      <Header title="Нове завдання" />
      <main className="pageWrapper">
        <form className="form-crete-task" onSubmit={handleSubmit}>
          <div className="title-create-box">
            <div className="sectionTitle">
              <h2>Назва:</h2>
            </div>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Введіть заголовок..."
              className="input-title"
              required
            />
            <button className={`control-btn done-query`} type="submit">
              <DoneOutlinedIcon className="icon" />
            </button>
          </div>
          <div className="decription-create-box">
            <div className="sectionTitle">
              <h2>Опис:</h2>
            </div>
            <textarea
              value={taskDescr}
              onChange={(e) => setTaskDescr(e.target.value)}
              placeholder="Введіть опис..."
              className="textarea-decription"
            />
          </div>
        </form>
      </main>
    </>
  );
}
