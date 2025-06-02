import "./App.css";
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("sub")) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("sub");
      if (token) {
        localStorage.setItem("accessToken", token);
        navigate("/task-list", {replace: true});
      } else {
        console.log("error");
      }
    }
  }, [navigate]);

  return (
    <>
      <main className="navContainer">
        <h1 className="navTitle">Навігація по сайту</h1>
        <nav className="card">
          <ul className="listOfNavLinks">
            <li className="itemOfNavLinks">
              <a
                className="links"
                href="https://us-east-1atoghhejc.auth.us-east-1.amazoncognito.com/login?client_id=16jtunov7n5jlg34414vi7p84u&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fgalagadiv.github.io%2FTo-do-list-aws%2Ftask-list"
              >
                Register
              </a>
            </li>
            <li className="itemOfNavLinks">
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
