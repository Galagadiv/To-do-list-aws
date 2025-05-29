import {Link} from "react-router-dom";
import "../../global-styles/index.css";

type Props = {
  title: string;
};

export default function Header({title}: Props) {
  return (
    <header>
      <Link to="/login" className="links">
        Назад
      </Link>
      <h1 className="pageTitle">{title}</h1>
      <a
        rel="noopener noreferrer"
        href={`${process.env.REACT_APP_API_BASE_URL}/logout`}
        className="links"
      >
        Вийти
      </a>
    </header>
  );
}
