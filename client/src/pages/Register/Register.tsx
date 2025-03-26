import { useState } from "react";

import TextInput from "../../components/Input/TextInput";
import Lable from "../../components/Lable/Lable";

import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";

import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";

const API_URL = process.env.REACT_APP_CLIENT_URL;
interface RegisterValueProps {
  email: string;
  password: string;
  confirmPassword: string;
}
function Register() {
  const [setAlert, isSetAlert] = useState(false);
  const [useremail, setUseremail] = useState("");
  console.log(setAlert);
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

  const handleFormSubmit = async (
    values: RegisterValueProps,
    { setSubmitting, resetForm }: FormikHelpers<RegisterValueProps>
  ) => {
    // setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/users/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        }),
      });

      const { msg, message } = await res.json();
      if (!res.ok) {
        toast.error(msg);
      }
      toast.success(message);
      setUseremail(values.email);
      isSetAlert(true);
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong");
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };
  return (
    <main className=" regpage bg-[#F4F6F7] w-screen  h-screen overflow-y-auto">
      {setAlert && (
        <div className="flex justify-center">
          <div className=" bg-indigo-300 rounded-lg  p-4 w-full  md:max-w-[512px] mt-6">
            <p>
              A confirmation email has been sent to your email address <br />
              <span className=" bg-yellow-50 p-1 rounded-sm">{useremail}</span>.
              Please click on the link in the email to verify your email
              address.
            </p>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center  md:h-screen">
        <div className="max-w-[512px] w-full">
          <div className="userform  bg-white px-6 py-8 rounded-lg shadow-lg md:bg-white md:shadow-none">
            <h1 className=" text-2xl text-[#212529] text-center font-bold mb-8 md:mb-0">
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
                resetForm,
              }) => (
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  <div className=" flex flex-col gap-2 w-full">
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
                  <div className="password flex flex-col gap-2  w-full">
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
                  <div className="password flex flex-col gap-2  w-full">
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
                  <Button
                    type="submit"
                    text="Get started"
                    disableBtn={isSubmitting}
                    isSubmitting={isSubmitting}
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
          <Link to="" className=" block text-center text-base mt-6 md:mt-0">
            <p>Agree to terms and conditions</p>
          </Link>
          <p className="text-center text-sm mt-6">
            Already have an account ?{" "}
            <Link to="/login" className="text-[#1A4F83]">
              Login
            </Link>
          </p>
        </div>

        {/* <div className=" hidden md:block  md:w-[614px] h-screen  relative">
        <img src={LoginAsset} className="w-[614px] h-full relative -right-8" />
      </div> */}
      </div>
    </main>
  );
}

export default Register;
