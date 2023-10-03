import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const errors = { msg: "" };
  if (data.password.length < 8) {
    errors.msg = "Password must be at least 8 characters long";
    return errors;
  }
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successful");
    return redirect("/dashboard");
  } catch (error) {
    errors.msg = error?.response?.data?.msg || error.message;
    return errors;
  }
};

const Login = () => {
  const errors = useActionData();
  const navigate = useNavigate();

  const testUser = async () => {
    try {
      const data = {
        email: "test@test.com",
        password: "secret123",
      };
      await customFetch.post("/auth/login", data);
      toast.success("Take a test drive");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg || error.message);
    }
  };

  return (
    <Wrapper>
      <Form method="POST" className="form">
        <Logo />
        <h4>Login</h4>
        {errors?.msg && <p style={{ color: "red" }}>{errors.msg}</p>}
        <FormRow type="email" name="email" placeholder="Enter Your Email" />
        <FormRow
          type="password"
          name="password"
          placeholder="Enter Your Password"
        />
        <SubmitBtn formBtn text="Login" waitingLabel="Signing In" />

        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
