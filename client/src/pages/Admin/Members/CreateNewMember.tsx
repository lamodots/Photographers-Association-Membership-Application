import React from "react";
import Lable from "../../../components/Lable/Lable";
import TextInput from "../../../components/Input/TextInput";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "../../../components/Button/Button";
import Select from "react-select";
import { CircleUserRound, SquarePen } from "lucide-react";

function CreateNewMember() {
  const settingsSchema = Yup.object().shape({
    title: Yup.string()
      .max(
        65,
        "Subscription name must be a string with a maximum of 65 characters"
      )
      .required("Subscription name is required"),
    duration: Yup.string().required("Subscription duration is required."),
    amount: Yup.number().required("Subscription amount is required."),
    description: Yup.string()
      .min(120)
      .max(400)
      .required("Subcription description is required"),
  });

  const initialValues = {
    title: "",
    duration: "",
    amount: "",
    description: "",
  };
  return (
    <main>
      <div className=" max-w-[600px] w-full ">
        <h1 className="text-2xl text-[#212529] font-bold mb-[24px]">
          Add New User
        </h1>
        <form>
          <div className=" flex gap-2 items-center ">
            <div>
              <CircleUserRound size={80} strokeWidth={1} />
              <SquarePen
                size={24}
                strokeWidth={1}
                className=" relative top-[-40px] right-[-60px] z-10 cursor-pointer"
              />
            </div>
            <span className=" text-xs text-[#3E454C]">
              Upload profile picture
            </span>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Lable label="First name" />
              <TextInput
                type="text"
                placeholderText="Enter firstname"
                name=""
                value=""
                handleInputChange={(event) => console.log("hello")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Lable label="Last name" />
              <TextInput
                type="text"
                placeholderText="Enter lastname"
                name=""
                value=""
                handleInputChange={(event) => console.log("hello")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Lable label="Date of Birth" />
              <TextInput
                type="date"
                placeholderText="Enter Date of Birth"
                name=""
                value=""
                handleInputChange={(event) => console.log("hello")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Lable label="Phone Number" />
              <TextInput
                type="text"
                placeholderText="Enter Phone Number"
                name=""
                value=""
                handleInputChange={(event) => console.log("hello")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Lable label="Location" />
              <TextInput
                type="text"
                placeholderText="Example Ikeja"
                name=""
                value=""
                handleInputChange={(event) => console.log("hello")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Lable label="Address" />
              <TextInput
                type="text"
                placeholderText="Enter Address"
                name=""
                value=""
                handleInputChange={(event) => console.log("hello")}
              />
            </div>
          </div>
          <div>
            <h3 className="text-xl text-[#212529] font-bold mt-6">
              About User
            </h3>
            <div className="flex  flex-col gap-2 mt-8">
              <Lable label="Tell us about yourself" className=" text-xs" />
              <textarea
                placeholder="Write text"
                className="bg-[#F4F6F7] border border-[#A6B4BA] rounded-lg p-4 h-[102px]"
              />
              <span className=" flex justify-end text-sm text-[#212529]">
                0/400
              </span>
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <Lable label="Add your social link" />
              <TextInput
                type="text"
                name=""
                value=""
                placeholderText="EG. https://www.google.com/me"
                handleInputChange={() => console.log("console")}
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl text-[#212529] font-bold mb-8 ">
              Set user interest
            </h3>
            <div>
              <p className="mb-6">Select user photography interests</p>
              <div className=" grid grid-cols-2 gap-4">
                <div className=" w-full flex items-center gap-2 bg-[#F4F6F7] border border-[#A6B4BA] px-3 py-2 rounded-lg">
                  <TextInput
                    id="People_Photography"
                    type="checkbox"
                    name=""
                    value=""
                    handleInputChange={() => console.log("herllo")}
                    className="w-6 h-14"
                  />
                  <Lable
                    label="People Photography"
                    htmlFor="People_Photography"
                  />
                </div>
                <div className=" w-full flex items-center gap-2 bg-[#F4F6F7] border border-[#A6B4BA] px-3 py-2 rounded-lg">
                  <TextInput
                    type="checkbox"
                    name=""
                    value=""
                    handleInputChange={() => console.log("herllo")}
                    className="w-6 h-14"
                  />
                  <Lable label="Manmade Objects" />
                </div>
                <div className=" w-full flex items-center gap-2 bg-[#F4F6F7] border border-[#A6B4BA] px-3 py-2 rounded-lg">
                  <TextInput
                    type="checkbox"
                    name=""
                    value=""
                    handleInputChange={() => console.log("herllo")}
                    className="w-6 h-14"
                  />
                  <Lable label="Nature Photography" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Button
              text="Create User"
              handleClick={() => console.log("hello")}
              className="w-full"
            />
          </div>
        </form>
      </div>
    </main>
  );
}

export default CreateNewMember;