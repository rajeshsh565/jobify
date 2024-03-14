import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo } from "../components";
import { FormRow } from "../components";
import {
  Link,
  Form,
  redirect,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import errorString from "../utils/errorString";

export const action = (queryClient) => async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    queryClient.invalidateQueries();
    toast.success("Login Successful!");
    return redirect("/dashboard");
  } catch (error) {
    setTimeout(() => {
      toast.error(errorString(error));
    }, 100);
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const submitting = navigation.state === "submitting";
  let isTestUser = false;

  const testUser = async () => {
    const testData = {
      email: "test@test.com",
      password: "testtesttest",
    };
    try {
      await customFetch.post("/auth/login", testData);
      toast.success("Demo User. Take a test drive!")
      navigate("/dashboard");
    } catch (error) {
      toast.error(errorString(error));
    }
  };
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" labelText="Email" />
        <FormRow type="password" name="password" labelText="Password" />
        <button type="submit" className="btn btn-block" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </button>
        <button type="button" className="btn btn-block" onClick={()=>testUser()}>
          Explore the App!
        </button>
        <p>
          Not a Member Yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
