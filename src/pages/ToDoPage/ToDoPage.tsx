import {useEffect, useState, type JSX} from "react";
import "../../global-styles/index.css";
import "./ToDoPage.css";
import {Link, useNavigate} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import Header from "../../components/Header/Header";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ReplayIcon from "@mui/icons-material/Replay";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type Props = {};

type Task = {
  userId: string;
  taskId: string;
  completed: boolean;
  createdAt: string;
  description?: string;
  title: string;
};

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  minWidth: 300,
  maxWidth: 500,
  bgcolor: "#3a3a3a",
  border: "1px solid #555",
  borderRadius: "8px",
  boxShadow: 24,
  p: {xs: 2, sm: 3, md: 4},
  color: "rgba(255, 255, 255, 0.87)",
};

export default function ToDoPage({}: Props) {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const [alert, setAlert] = useState<JSX.Element | null>(null);
  const [statusFilter, setStatusFilter] = useState<boolean | null>(false);

  useEffect(() => {
    fetchTasks();
  }, [statusFilter]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem("accessToken");
      if (!userId) {
        setAlert(<Alert severity="error">User ID не знайдено</Alert>);
        return;
      }

      const url = new URL(
        "https://ubu9jz8e3f.execute-api.us-east-1.amazonaws.com/dev/getUserTasks"
      );
      url.searchParams.append("userId", userId);
      if (typeof statusFilter === "boolean") {
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
        setAlert(
          <Alert severity="error">
            Не вдалося отримати завдання: {errData.error}
          </Alert>
        );
        return;
      }

      const data: Task[] = await res.json();
      setTasks(data);
    } catch (err: any) {
      setAlert(
        <Alert severity="error">
          Виникла помилка при отриманні завдань: {err.message || err}
        </Alert>
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDeleteModal = (task: Task) => {
    setTaskToDelete(task);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setTaskToDelete(null);
  };

  const confirmDeleteTask = async () => {
    if (!taskToDelete) return;

    try {
      const userId = localStorage.getItem("accessToken");
      if (!userId) {
        setAlert(<Alert severity="error">User ID не знайдено</Alert>);
        handleCloseDeleteModal();
        return;
      }

      const res = await fetch(
        "https://ubu9jz8e3f.execute-api.us-east-1.amazonaws.com/dev/deleteTask",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({userId, taskId: taskToDelete.taskId}),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Не вдалося видалити завдання");
      }

      setAlert(<Alert severity="success">Завдання видалено успішно</Alert>);
      fetchTasks();
    } catch (err: any) {
      setAlert(
        <Alert severity="error">
          Помилка при видаленні завдання: {err.message || err}
        </Alert>
      );
    } finally {
      handleCloseDeleteModal();
    }
  };

  const handleEdit = (taskId: string) => {
    navigate(`/new-task/${taskId}`);
  };

  const handleTaskDone = async (taskId: string) => {
    try {
      const userId = localStorage.getItem("accessToken");
      if (!userId) {
        setAlert(<Alert severity="error">User ID не знайдено</Alert>);
        return;
      }

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
        setAlert(
          <Alert severity="error">
            Не вдалося оновити завдання: {errData.error}
          </Alert>
        );
        return;
      }

      setAlert(
        <Alert severity="success">Завдання позначено як виконане</Alert>
      );
      fetchTasks();
    } catch (err: any) {
      setAlert(
        <Alert severity="error">
          Не вдалося оновити завдання: {err.message || err}
        </Alert>
      );
    }
  };

  return (
    <>
      <Header title="Список завдань" />
      {alert && (
        <div style={{margin: "10px auto", width: "fit-content"}}>{alert}</div>
      )}
      <main className="pageWrapper">
        <ButtonGroup
          variant="contained"
          className="filters-bar"
          aria-label="Status filter button group"
        >
          <Button
            onClick={() => setStatusFilter(null)}
            className={`filter-btn ${
              statusFilter === null ? "active-filter-btn" : ""
            }`}
          >
            Всі
          </Button>
          <Button
            onClick={() => setStatusFilter(false)}
            className={`filter-btn ${
              statusFilter === false ? "active-filter-btn" : ""
            }`}
          >
            Активні
          </Button>
          <Button
            onClick={() => setStatusFilter(true)}
            className={`filter-btn ${
              statusFilter === true ? "active-filter-btn" : ""
            }`}
          >
            Завершені
          </Button>
        </ButtonGroup>

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
        ) : tasks.length > 0 ? (
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
                    onClick={() => handleOpenDeleteModal(task)}
                  >
                    <DeleteOutlinedIcon className="icon del" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <Button onClick={fetchTasks}>
            <ReplayIcon /> Перезавантажити завдання
          </Button>
        )}

        <div>
          <Link to="/new-task/" className="addButton">
            <AddIcon className="icon" />
          </Link>
        </div>
      </main>
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="delete-modal-title"
            variant="h6"
            component="h2"
            sx={{mb: 2, fontWeight: "bold"}}
          >
            Підтвердження видалення
          </Typography>
          <Typography id="delete-modal-description" sx={{mb: 3}}>
            Ви точно хочете видалити завдання:{" "}
            <strong style={{color: "#64cff"}}>{taskToDelete?.title}</strong>?
          </Typography>
          <Box sx={{display: "flex", justifyContent: "flex-end", gap: "10px"}}>
            <Button
              onClick={handleCloseDeleteModal}
              variant="outlined"
              sx={{
                color: "rgba(255, 255, 255, 0.87)",
                borderColor: "rgba(255, 255, 255, 0.5)",
                "&:hover": {
                  borderColor: "rgba(255, 255, 255, 0.87)",
                },
              }}
            >
              Скасувати
            </Button>
            <Button
              onClick={confirmDeleteTask}
              variant="contained"
              color="error"
            >
              Видалити
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
