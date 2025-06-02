import {useEffect, useState} from "react";
import "../../global-styles/index.css";
import "./ManageTaskPage.css";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import Header from "../../components/Header/Header";
import {useParams} from "react-router-dom";

type Task = {
  userId: string;
  taskId: string;
  completed: boolean;
  createdAt: string;
  description?: string;
  title: string;
};

export default function ManageTaskPage() {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescr, setTaskDescr] = useState<string>("");
  const [taskData, setTaskData] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Явно типізуємо useParams
  const {taskId} = useParams<{taskId: string}>();

  useEffect(() => {
    if (!taskId) return;

    setIsLoading(true);
    console.log("____ fetchTask, taskId:", taskId);

    const fetchTask = async () => {
      try {
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
        const json = await res.json();
        const data: Task = Array.isArray(json) ? json[0] : json;
        console.log("____ Отримані дані завдання:", data);

        setTaskData(data);
        setTaskTitle(data.title);
        setTaskDescr(data.description || "");
      } catch (er: any) {
        console.error("____ Помилка fetchTask:", er.message || er);
        alert("Не вдалося завантажити завдання");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const updateTask = async () => {
    if (!taskData) {
      alert("Немає даних завдання для оновлення");
      return;
    }

    const payload: Record<string, any> = {
      userId: taskData.userId,
      taskId: taskData.taskId,
      title: taskTitle.trim(),
      completed: taskData.completed,
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
        throw new Error(err.error || "Не вдалося оновити завдання");
      }

      alert("Завдання оновлено успішно!");
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

    const userId = localStorage.getItem("accessToken");
    if (!userId) {
      throw new Error("User ID не знайдено");
    }

    const payload: Record<string, any> = {
      userId,
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
    taskId ? await updateTask() : await createTask();
  };

  return (
    <>
      <Header title={taskId ? "Редагувати завдання" : "Нове завдання"} />
      <main className="pageWrapper">
        {/* Якщо ми зараз чекаємо на fetchTask, показуємо короткий “Завантаження…” */}
        {isLoading ? (
          <div className="loading">Завантаження даних завдання…</div>
        ) : (
          <form className="form-create-task" onSubmit={handleSubmit}>
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
        )}
      </main>
    </>
  );
}
