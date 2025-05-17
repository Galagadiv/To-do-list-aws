import "./App.css";
import {Link} from "react-router";

function App() {
  return (
    <>
      <main className="navContainer">
        <h1 className="navTitle">Навігація по сайту</h1>
        <nav className="card">
          <ul className="listOfNavLinks">
            <li className="itemOfNavLinks">
              <Link to="/register" className="links">
                Register
              </Link>
            </li>
            <li className="itemOfNavLinks">
              <Link to="/login" className="links">
                Login
              </Link>
            </li>
            <li className="itemOfNavLinks">
              <Link to="/task-list" className="links">
                ToDoList
              </Link>
            </li>
          </ul>
        </nav>
      </main>
    </>
  );
}

export default App;
