import {useEffect, useState, type JSX} from "react";
import "../../global-styles/index.css";
import "./ManageTaskPage.css";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import Header from "../../components/Header/Header";
import {useNavigate, useParams} from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

type Task = {
  userId: string;
  taskId: string;
  completed: boolean;
  createdAt: string;
  description?: string;
  title: string;
};

export default function ManageTaskPage() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState<JSX.Element | null>(null);

  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescr, setTaskDescr] = useState<string>("");
  const [taskData, setTaskData] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {taskId} = useParams<{taskId: string}>();

  useEffect(() => {
    if (!taskId) return;

    setIsLoading(true);
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

        setTaskData(data);
        setTaskTitle(data.title);
        setTaskDescr(data.description || "");
      } catch (er: any) {
        setAlert(
          <Alert severity="error">Не вдалося завантажити завдання</Alert>
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const updateTask = async () => {
    if (!taskData) {
      setAlert(
        <Alert severity="error">Немає даних завдання для оновлення</Alert>
      );
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
        setAlert(
          <Alert severity="error">
            Не вдалося оновити завдання.
            <br />
            {err.error}
          </Alert>
        );
        return;
      }

      setAlert(<Alert severity="success">Завдання оновлено успішно!</Alert>);
      setTimeout(() => navigate("/task-list"), 1000);
    } catch (err: any) {
      setAlert(
        <Alert severity="error">
          Не вдалося оновити завдання.
          <br />
          {err.error}
        </Alert>
      );
    }
  };

  const createTask = async () => {
    if (!taskTitle.trim()) {
      setAlert(
        <Alert severity="warning">Будь ласка, заповніть заголовок</Alert>
      );
      return;
    }

    const userId = localStorage.getItem("accessToken");
    if (!userId) {
      setAlert(<Alert severity="error">Користувач не знайдений</Alert>);
      return;
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
        setAlert(
          <Alert severity="error">
            Не вдалося створити завдання.
            <br />
            {err.error}
          </Alert>
        );
        return;
      }

      setAlert(<Alert severity="success">Завдання створено успішно!</Alert>);
      setTimeout(() => navigate("/task-list"), 1000);
    } catch (err: any) {
      setAlert(
        <Alert severity="error">Виникла помилка при збереженні завдання.</Alert>
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    taskId ? await updateTask() : await createTask();
  };

  return (
    <>
      <Header title={taskId ? "Редагувати завдання" : "Нове завдання"} />
      {alert && (
        <div style={{margin: "10px auto", width: "fit-content"}}>{alert}</div>
      )}
      <main className="pageWrapper" style={{height: "100%"}}>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#fff",
            }}
          >
            <CircularProgress
              size={30}
              sx={{
                mx: "auto",
                "& svg": {
                  width: "30px !important",
                  height: "30px !important",
                },
                "& circle": {
                  stroke: "#646cff",
                },
              }}
            />
            <h2 style={{margin: "0 auto", color: "#fff"}}>
              Триває завантаження
            </h2>
          </div>
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
