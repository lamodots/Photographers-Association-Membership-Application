import { useEffect } from "react";
import toast from "react-hot-toast";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import TextInput from "../../components/Input/TextInput";
import Lable from "../../components/Lable/Lable";
import ksnImage from "../../assets/ksn.jpg";

import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { useCurrentUser } from "../../context/AdminContext";
interface ValuesProps {
  email: string;
  password: string;
}

const API_URL = process.env.REACT_APP_CLIENT_URL;

function Login() {
  const { currentUser, setCurrentUser } = useCurrentUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser, navigate]);

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required."),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long.")
      .max(16, "Password cannot be longer than 16 characters.")
      .required("Password is required."),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleFormSubmit = async (
    values: ValuesProps,
    { setSubmitting }: FormikHelpers<ValuesProps>
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const res = await fetch(`${API_URL}/api/v1/users/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        credentials: "include",
      });

      const { msg, message, user } = await res.json();
      if (!res.ok) {
        return toast.error(msg || "Invalid email or password");
      }

      toast.success(message || "Login sucessfull");
      setCurrentUser(user);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main
      className=" bg-cover bg-center w-full flex justify-center  items-center  py-24  h-screen md:h-full overflow-hidden"
      style={{ backgroundImage: `url(${ksnImage})` }}
    >
      <div className="max-w-[512px] w-full bg-[#F4F6F7] pb-8 rounded-lg shadow-lg ">
        <div className="userform bg-[#F4F6F7] px-6 py-8 rounded-lg  md:bg-inherit md:rounded-none ">
          <h1 className=" text-2xl text-[#212529] text-center font-bold mb-8 md:mb-0">
            Welcome Back !
          </h1>
          <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={loginSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className=" flex flex-col gap-2  w-full">
                  <Lable label="Email" />
                  <TextInput
                    type="email"
                    placeholderText="Enter your email"
                    name="email"
                    value={values.email}
                    handleInputChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="text-sm text-red-400">
                    {errors.email && touched.email && errors.email}
                  </span>
                </div>
                <div className="password flex flex-col gap-2  w-full">
                  <Lable label="Password" />
                  <TextInput
                    type="text"
                    placeholderText="Enter your email"
                    name="password"
                    value={values.password}
                    handleInputChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="text-sm text-red-400">
                    {errors.password && touched.password && errors.password}
                  </span>
                </div>

                <Button
                  type="submit"
                  text="Login"
                  isSubmitting={isSubmitting}
                  disableBtn={isSubmitting}
                >
                  {isSubmitting && (
                    <Oval
                      visible={true}
                      height="24"
                      width="24"
                      color="#4fa94d"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  )}
                </Button>
              </form>
            )}
          </Formik>
        </div>
        <p className=" text-center text-base mt-8">
          <Link to="/forgot-password" className="text-base text-[#1A4F83]">
            Forgot your password? we will help you reset it
          </Link>
        </p>
        <p className="text-center text-sm mt-6">
          Dont have an account ?{" "}
          <Link to="/register" className="text-[#1A4F83]">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
