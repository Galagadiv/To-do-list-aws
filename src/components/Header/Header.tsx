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
      {/* <Link to="/login" className="links">
        Вийти
      </Link> */}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://us-east-1atoghhejc.auth.us-east-1.amazoncognito.com/login?client_id=16jtunov7n5jlg34414vi7p84u&nonce=FT89hmJtcuVCdoBhi29AOwUiMjYmDVAJ5HZIw7wLQgM&redirect_uri=https://To-Do-List-AuthForm-Page&response_type=code&scope=openid+email+phone&state=WNbH59iXPKlbcLTaD_VN6GvvMKbi3RfEqRReEcr77Dw"
        className="links"
      >
        Вийти
      </a>
    </header>
  );
}
