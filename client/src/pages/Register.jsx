import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo } from "../components";
import { FormRow } from "../components";
import { Link, Form, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import errorString from "../utils/errorString";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration Successful!");
    return redirect("/login");
  } catch (error) {
    setTimeout(() => {
      toast.error(errorString(error))}, 100);
    console.log(errStr);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" labelText="First Name" />
        <FormRow type="text" name="lastName" labelText="Last Name" />
        <FormRow type="text" name="location" labelText="Location" />
        <FormRow type="email" name="email" labelText="Email" />
        <FormRow type="password" name="password" labelText="Password" />
        <button type="submit" className="btn btn-block" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </button>
        <p>
          Already a User?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
