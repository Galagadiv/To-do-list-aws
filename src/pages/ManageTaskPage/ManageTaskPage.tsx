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
      const response = await fetch(
        "https://ubu9jz8e3f.execute-api.us-east-1.amazonaws.com/dev/addTask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Не вдалося додати завдання");
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
            <button className="control-btn done-query" type="submit">
              <DoneOutlinedIcon className="icon" />
            </button>
          </div>

          <div className="description-create-box">
            <div className="sectionTitle">
              <h2>Опис:</h2>
            </div>
            <textarea
              value={taskDescr}
              onChange={(e) => setTaskDescr(e.target.value)}
              placeholder="Введіть опис..."
              className="textarea-description"
            />
          </div>
        </form>
      </main>
    </>
  );
}
