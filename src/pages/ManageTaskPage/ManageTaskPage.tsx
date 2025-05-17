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
            <h2 className="sectionTitle">Назва:</h2>
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
            <h2 className="sectionTitle">Опис:</h2>
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
