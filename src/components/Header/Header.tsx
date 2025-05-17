import React from "react";
import {Link} from "react-router";
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
      <Link to="/login" className="links">
        Вийти
      </Link>
    </header>
  );
}
