import React, { useState } from "react";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import TextInput from "../../components/Input/TextInput";
import Lable from "../../components/Lable/Lable";
import LoginAsset from "../../assets/loginassets.svg";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

interface ValuesProps {
  email: string;
  password: string;
}

function Login() {
  const loginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).max(16).required(),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleFormSubmit = (
    values: ValuesProps,
    { setSubmitting }: FormikHelpers<ValuesProps>
  ) => {
    // same shape as initial values
    console.log(values);
  };
  return (
    <main className=" bg-[#F4F6F7] w-screen grid grid-cols-2 gap-8 items-center pl-[7rem] h-screen overflow-hidden">
      <div className="userform">
        <h1 className=" text-2xl text-[#212529] text-center font-bold">
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

              <Button text="Login" disableBtn={isSubmitting} />
            </form>
          )}
        </Formik>

        <p className=" text-center text-base mt-8">
          <Link to="forgot-password" className="text-base text-[#1A4F83]">
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

      <div className="loginFormIllutration w-[614px] h-screen">
        <img src={LoginAsset} className="w-[614px] h-full" />
      </div>
    </main>
  );
}

export default Login;
