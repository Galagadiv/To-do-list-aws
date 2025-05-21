import {useState} from "react";
import "../../global-styles/index.css";
import "./ManageTaskPage.css";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import Header from "../../components/Header/Header";

type Props = {};

export default function ManageTaskPage({}: Props) {
  const [done, setDone] = useState<boolean>(false);

  const handleSubmit = async () => {
    setDone((prev) => !prev);
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
              placeholder="Введіть заголовок..."
              className="input-title"
              required
            />
            <button
              className={`control-btn done-query ${!done ? "undone" : "done"}`}
              type="submit"
            >
              {!done ? (
                <DoneOutlinedIcon className="icon" />
              ) : (
                <DoneAllOutlinedIcon className="icon" />
              )}
            </button>
          </div>
          <div className="decription-create-box">
            <div className="sectionTitle">
              <h2>Опис:</h2>
            </div>
            <textarea
              placeholder="Введіть опис..."
              className="textarea-decription"
            />
          </div>
        </form>
      </main>
    </>
  );
}
