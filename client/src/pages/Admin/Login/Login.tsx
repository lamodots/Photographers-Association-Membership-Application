import React, { useState } from "react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import TextInput from "../../../components/Input/TextInput";
import Lable from "../../../components/Lable/Lable";
import LoginAsset from "../../../assets/loginassets.svg";
import Button from "../../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";

interface ValuesProps {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();

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
    // same shape as initial values
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const res = await fetch(
        "http://localhost:5000/api/v1/secure/auth/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
          credentials: "include",
        }
      );

      if (res.ok) {
        const { message } = await res.json();
        toast.success(message);
        navigate("/secure");
      } else {
        const errorData = await res.json();
        toast.error(errorData.msg || "An error occurred. Please try again.");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <main className=" bg-[#F4F6F7] w-screen grid grid-cols-1 items-center mx-auto px-[1.8rem]  max-w-lg h-screen overflow-hidden">
      <div className="userform">
        <h1 className=" text-2xl text-[#212529] text-center font-bold">
          Admin Portal Login
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
              <div className=" flex flex-col gap-2">
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
              <div className="password flex flex-col gap-2">
                <Lable label="Password" />
                <TextInput
                  type="password"
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

        <p className=" text-center text-base mt-8">
          <Link to="forgot-password" className="text-base text-[#1A4F83]">
            Forgot your password? we will help you reset it
          </Link>
        </p>
        {/* <p className="text-center text-sm mt-6">
          Dont have an account ?{" "}
          <Link to="/secure/register" className="text-[#1A4F83]">
            Register
          </Link>
        </p> */}
      </div>

      {/* <div className="loginFormIllutration w-[614px] h-screen">
        <img src={LoginAsset} className="w-[614px] h-full" />
      </div> */}
    </main>
  );
}

export default Login;
