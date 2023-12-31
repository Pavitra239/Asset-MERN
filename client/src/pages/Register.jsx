import { Form, redirect, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  console.log(data);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg || error.message);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="POST" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" placeholder="Enter your name" />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          placeholder="Enter your last name"
        />
        <FormRow
          type="text"
          name="location"
          placeholder="Enter your location"
        />
        <FormRow type="email" name="email" placeholder="Enter your email" />
        <FormRow
          type="password"
          name="password"
          placeholder="Enter your password"
        />
        <SubmitBtn formBtn text="Register" />
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
