import React, { useState } from "react";

import TextInput from "../../../components/Input/TextInput";
import Lable from "../../../components/Lable/Lable";
import LoginAsset from "../../../assets/loginassets.svg";
import Button from "../../../components/Button/Button";
import { Link } from "react-router-dom";

function Register() {
  const [userEmail, setUserEmail] = useState("");
  return (
    <main className=" bg-[#F4F6F7] w-screen grid grid-cols-2 gap-8 items-center pl-[7rem] h-screen overflow-hidden">
      <div className="userform">
        <h1 className=" text-2xl text-[#212529] text-center font-bold">
          Membership Registration
        </h1>
        <form className="flex flex-col gap-6">
          <div className=" flex flex-col gap-2">
            <Lable label="Email" />
            <TextInput
              type="text"
              placeholderText="Enter your email"
              name="email"
              value={userEmail}
              handleInputChange={(event: React.FormEvent<HTMLInputElement>) =>
                setUserEmail("hello")
              }
            />
          </div>
          <div className="password flex flex-col gap-2">
            <Lable label="Password" />
            <TextInput
              type="text"
              placeholderText="Enter your password"
              name="email"
              value={userEmail}
              handleInputChange={(event: React.FormEvent<HTMLInputElement>) =>
                setUserEmail("hello")
              }
            />
          </div>
          <div className="password flex flex-col gap-2">
            <Lable label="Confirm password" />
            <TextInput
              type="text"
              placeholderText="Confirm password"
              name="email"
              value={userEmail}
              handleInputChange={(event: React.FormEvent<HTMLInputElement>) =>
                setUserEmail("hello")
              }
            />
          </div>
          <Button text="Register" />
        </form>

        <Link to="" className=" block text-center text-base mt-8">
          <p>Agree to terms and conditions</p>
        </Link>
        <p className="text-center text-sm mt-6">
          Already have an account ?{" "}
          <Link to="/" className="text-[#1A4F83]">
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
