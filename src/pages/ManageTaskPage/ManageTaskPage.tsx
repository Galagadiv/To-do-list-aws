import {useState} from "react";
import "../../global-styles/index.css";
import "./ManageTaskPage.css";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
// import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import Header from "../../components/Header/Header";

type Props = {};

export default function ManageTaskPage({}: Props) {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescr, setTaskDescr] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("Access token not found");
      return;
    }

    if (!taskTitle.trim()) {
      alert("Будь ласка, заповніть заголовок");
      return;
    }

    const payload: Record<string, any> = {
      userId: accessToken,
      title: taskTitle.trim(),
      completed: false,
    };
    if (taskDescr.trim()) {
      payload.description = taskDescr.trim();
    }

    try {
      const res = await fetch(
        "https://ubu9jz8e3f.execute-api.us-east-1.amazonaws.com/dev/CRUD-tasks",
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
