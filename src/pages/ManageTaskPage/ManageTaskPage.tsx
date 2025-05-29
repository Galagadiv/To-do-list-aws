import {useState} from "react";
import "../../global-styles/index.css";
import "./ManageTaskPage.css";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
// import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import Header from "../../components/Header/Header";

type Props = {};

export default function ManageTaskPage({}: Props) {
  // const [done, setDone] = useState<boolean>(false);

  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescr, setTaskDescr] = useState<string>("");

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   setDone((prev) => !prev);

  //   const accessToken = localStorage.getItem("accessToken");
  //   if (!accessToken) {
  //     console.error("Access token not found");
  //     return;
  //   }

  //   if (!taskTitle) {
  //     alert("Будь ласка, заповніть заголовок");
  //     return;
  //   }

  //   try {
  //     const response = await fetch(
  //       "https://o35hv6iua4.execute-api.us-east-1.amazonaws.com/Firebase-Test-4/AddTask",
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           title: taskTitle,
  //           description: taskDescr ?? "",
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       const error = await response.json();
  //       console.error("Server error:", error);
  //       alert("Сервер не прийняв завдання");
  //       return;
  //     }

  //     const result = await response.json();
  //     console.log("Task saved:", result);
  //     alert("Завдання створено успішно!");
  //   } catch (err: any) {
  //     console.error("Fetch error:", err?.message || err);
  //     alert("Виникла помилка при збереженні завдання.");
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setDone((prev) => !prev);

    const accessToken = localStorage.getItem("accessToken");
    console.log(`Add ${accessToken}`);
    if (!accessToken) {
      alert("Access token not found");
      return;
    }

    if (!taskTitle.trim()) {
      alert("Будь ласка, заповніть заголовок");
      return;
    }

    console.log("taskTitle перед сабмітом:", JSON.stringify(taskTitle));

    try {
      const response = await fetch(
        "https://o35hv6iua4.execute-api.us-east-1.amazonaws.com/Firebase-Test-4/AddTask",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: taskTitle,
            description: taskDescr ?? "",
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error("Server error:", result);
        alert(`Помилка: ${result.error || "невідома"}`);
        return;
      }

      console.log("Task saved:", result);
      alert("Завдання створено успішно!");
    } catch (err: any) {
      console.error("Fetch error:", err?.message || err);
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
            <button
              // className={`control-btn done-query ${!done ? "undone" : "done"}`}
              className={`control-btn done-query`}
              type="submit"
            >
              <DoneOutlinedIcon className="icon" />

              {/* {!done ? (
                <DoneOutlinedIcon className="icon" />
              ) : (
                <DoneAllOutlinedIcon className="icon" />
              )} */}
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
