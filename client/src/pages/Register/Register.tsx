import React, { useState } from "react";

import TextInput from "../../components/Input/TextInput";
import Lable from "../../components/Lable/Lable";
import LoginAsset from "../../assets/loginassets.svg";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import { match } from "assert";

interface RegisterValueProps {
  email: string;
  password: string;
  confirmPassword: string;
}
function Register() {
  const registerSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required."),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long.")
      .max(16, "Password cannot be longer than 16 characters.")
      .required("Password is required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Your passwords do not match.")
      .required("Please retype your password."),
  });

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleFormSubmit = (
    values: RegisterValueProps,
    { setSubmitting }: FormikHelpers<RegisterValueProps>
  ) => {
    console.log(values);
  };
  return (
    <main className=" bg-[#F4F6F7] w-screen grid grid-cols-2 gap-8 items-center pl-[7rem] h-screen overflow-hidden">
      <div className="userform">
        <h1 className=" text-2xl text-[#212529] text-center font-bold">
          Membership Registration
        </h1>

        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validationSchema={registerSchema}
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
                  type="text"
                  placeholderText="Enter your email"
                  name="email"
                  value={values.email}
                  handleInputChange={handleChange}
                  onBlur={handleBlur}
                />
                <span className="text-xs text-red-400">
                  {errors.email && touched.email && errors.email}
                </span>
              </div>
              <div className="password flex flex-col gap-2">
                <Lable label="Password" />
                <TextInput
                  type="text"
                  placeholderText="Enter your password"
                  name="password"
                  value={values.password}
                  handleInputChange={handleChange}
                  onBlur={handleBlur}
                />
                <span className="text-xs text-red-400">
                  {errors.password && touched.password && errors.password}
                </span>
              </div>
              <div className="password flex flex-col gap-2">
                <Lable label="Confirm password" />
                <TextInput
                  type="text"
                  placeholderText="Confirm password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  handleInputChange={handleChange}
                  onBlur={handleBlur}
                />
                <span className="text-xs text-red-400">
                  {errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword}
                </span>
              </div>
              <Button text="Register" disableBtn={isSubmitting} />
            </form>
          )}
        </Formik>
        <Link to="" className=" block text-center text-base mt-8">
          <p>Agree to terms and conditions</p>
        </Link>
        <p className="text-center text-sm mt-6">
          Already have an account ?{" "}
          <Link to="/login" className="text-[#1A4F83]">
            Login
          </Link>
        </p>
      </div>

      <div className="loginFormIllutration w-[614px] h-screen ">
        <img src={LoginAsset} className="w-[614px] h-full" />
      </div>
    </main>
  );
}

export default Register;
