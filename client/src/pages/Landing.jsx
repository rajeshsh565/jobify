import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracking </span>App
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            quasi dicta magni eligendi a, saepe nisi molestias itaque molestiae
            eos ipsam excepturi consequatur incidunt nostrum velit aperiam ea
            quam, libero laudantium enim asperiores! Officiis, ipsa?
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
        <div>
          <img src={main} alt="main" className="img main-img"></img>
        </div>
      </div>
    </Wrapper>
  );
};
export default Landing;
