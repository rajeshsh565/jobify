import { useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";
import { Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <Wrapper>
        <img src={img} alt="error_code" />
        <h3>Ohh! Page Not Found</h3>
        <p>we can't seem to find the page you are looking for.</p>
        <Link to="/dashboard">back home</Link>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h3>Something Went Wrong!!!</h3>
    </Wrapper>
  );
};
export default Error;
