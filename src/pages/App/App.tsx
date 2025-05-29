import "./App.css";
import {Link} from "react-router-dom";

function App() {
  return (
    <>
      <main className="navContainer">
        <h1 className="navTitle">Навігація по сайту</h1>
        <nav className="card">
          <ul className="listOfNavLinks">
            <li className="itemOfNavLinks">
              {/* <Link to="/register" className="links">
                Register
              </Link> */}
              <a
                className="links"
                href="https://us-east-1atoghhejc.auth.us-east-1.amazoncognito.com/login?client_id=16jtunov7n5jlg34414vi7p84u&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fgalagadiv.github.io%2FTo-do-list-aws%2Ftask-list"
              >
                Register
              </a>
            </li>
            <li className="itemOfNavLinks">
              {/* <Link to="/login" className="links">
                Login
              </Link> */}
              <a
                className="links"
                href="https://us-east-1atoghhejc.auth.us-east-1.amazoncognito.com/login?client_id=16jtunov7n5jlg34414vi7p84u&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fgalagadiv.github.io%2FTo-do-list-aws%2Ftask-list"
              >
                Login
              </a>
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
