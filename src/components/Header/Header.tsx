import {Link} from "react-router-dom";
import "../../global-styles/index.css";

type Props = {
  title: string;
};

export default function Header({title}: Props) {
  return (
    <header>
      <Link to="/task-list" className="links">
        Додому
      </Link>
      <h1 className="pageTitle">{title}</h1>
      <a
        rel="noopener noreferrer"
        href={`https://ubu9jz8e3f.execute-api.us-east-1.amazonaws.com/dev/logout`}
        className="links"
      >
        Вийти
      </a>
    </header>
  );
}
