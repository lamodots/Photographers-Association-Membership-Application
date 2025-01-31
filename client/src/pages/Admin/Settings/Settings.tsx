import React, { useEffect, useState } from "react";
import Lable from "../../../components/Lable/Lable";
import TextInput from "../../../components/Input/TextInput";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Button from "../../../components/Button/Button";
import Select from "react-select";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const API_URL = process.env.REACT_APP_CLIENT_URL;

const options = [
  { value: "content", label: "Content" },
  { value: "certificate", label: "Certificate" },
  { value: "id-card", label: "Id-Card" },
];

interface ValuesProps {
  appname: string;
  appname_acronym: string;
  paymentapi: string;
  whatsappapi: string;
  pagelink: string[];
  applogo: File | null;
  sendgridapi: string;
}
function Settings() {
  const [appData, setAppData] = useState<ValuesProps | null>(null);
  const [showSettingsData, setShowSettingsData] = useState({
    paymentapi: false,
    whatsappapi: false,
    sendgridapi: false,
  });

  const navigate = useNavigate();
  const settingsSchema = Yup.object().shape({
    appname: Yup.string()
      .trim()
      .max(
        150,
        "Application name must be a string with a maximum of 150 characters"
      )
      .required("Application name is required"),
    appname_acronym: Yup.string()
      .trim()
      .max(
        4,
        "Application name acronym must be a string with a maximum of 4 characters"
      )
      .required("Application name is required"),
    paymentapi: Yup.string().required("API key is required.").trim(),
    whatsappapi: Yup.string().required("WhatsApp API key is required.").trim(),
    sendgridapi: Yup.string().required("Sendgrid API key is required.").trim(),
    pagelink: Yup.array().of(Yup.string()),
    applogo: Yup.mixed().required("Event image is required"),
  });

  const initialValues: ValuesProps = {
    appname: appData?.appname || "",
    appname_acronym: appData?.appname_acronym || "",
    paymentapi: appData?.paymentapi || "",
    whatsappapi: appData?.whatsappapi || "",
    pagelink: [],
    applogo: null,
    sendgridapi: appData?.sendgridapi || "",
  };
  // const initialValues: ValuesProps = {
  //   appname: "",
  //   paymentapi: "",
  //   whatsappapi: "",
  //   pagelink: [],
  //   applogo: null,
  //   sendgridapi: "",
  // };

  async function getAppSettings() {
    try {
      const res = await fetch(`${API_URL}/api/v1/secure/settings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`Error fetching App settings`);
      }
      const { appDetails } = await res.json();
      setAppData(appDetails[0]);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAppSettings();
  }, []);

  async function handleSubmitSettings(
    values: ValuesProps,
    { setSubmitting }: FormikHelpers<ValuesProps>
  ) {
    try {
      const formData = new FormData();

      formData.append("appname", values.appname);
      formData.append("appname_acronym", values.appname_acronym);
      formData.append("paymentapi", values.paymentapi);
      formData.append("whatsappapi", values.whatsappapi);
      formData.append("applogo", values.applogo as File);
      formData.append("sendgridapi", values.sendgridapi);
      // formData.append("pagelink", values.pagelink.filter((p)=> {p}));
      console.log(formData);
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      const res = await fetch(`${API_URL}/api/v1/secure/settings`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (res.ok) {
        const { message } = await res.json();
        toast.success(message);
        // navigate("/secure/settings");
      } else {
        const errorData = await res.json();
        toast.error(errorData.msg || "An error occurred. Please try again.");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  // handleshow Config data
  const handleShowSettingsData = (field: keyof typeof showSettingsData) => {
    setShowSettingsData((prevData) => ({
      ...prevData,
      [field]: !prevData[field],
    }));
  };
  return (
    <main>
      <section>
        <h1 className="text-2xl text-[#212529] font-bold">General settings</h1>
        <div className="form mt-8 w-full max-w-[600px]">
          <Formik
            initialValues={initialValues}
            validationSchema={settingsSchema}
            onSubmit={handleSubmitSettings}
            enableReinitialize
          >
            {({
              values,
              errors,
              handleChange,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="flex flex-col gap-6">
                  <div className=" space-x-2 grid grid-cols-[8fr_4fr] items-center">
                    <div>
                      <Lable
                        label="Customize Application full name *"
                        className=" text-xs"
                      />
                      <TextInput
                        type="text"
                        placeholderText="Enter application name"
                        name="appname"
                        value={values.appname}
                        handleInputChange={handleChange}
                        className="w-full"
                      />
                      <span className="text-[10px] text-red-400">
                        {errors.appname && errors.appname}
                      </span>
                    </div>
                    <div>
                      <Lable
                        label="Customize Application acronym  *"
                        className=" text-xs"
                      />
                      <TextInput
                        type="text"
                        placeholderText="Enter application acronym "
                        name="appname_acronym"
                        value={values.appname_acronym}
                        handleInputChange={handleChange}
                        className="w-full"
                      />
                      <span className="text-[10px] text-red-400">
                        {errors.appname_acronym && errors.appname_acronym}
                      </span>
                    </div>
                  </div>
                  <div className=" space-y-2">
                    <Lable
                      label="Setup payment API (For Handing payments) *"
                      className=" text-xs"
                    />
                    <div className="flex space-x-2 border border-[#515F69] bg-[#F4F6F7] rounded-lg pr-2 ">
                      <TextInput
                        type={showSettingsData.paymentapi ? "text" : "password"}
                        placeholderText="Enter payment API Key"
                        name="paymentapi"
                        value={values.paymentapi}
                        handleInputChange={handleChange}
                        className="w-full rounded-tr-none rounded-br-none border-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleShowSettingsData("paymentapi")}
                      >
                        {showSettingsData.paymentapi ? "hide" : "show"}
                      </button>
                    </div>
                    <span className="text-[10px] text-red-400">
                      {errors.paymentapi && errors.paymentapi}
                    </span>
                  </div>
                  <div className=" space-y-2">
                    <Lable
                      label="Setup WhatsApp API Key (For sending Birthday WhatsApp Text Message) *"
                      className=" text-xs"
                    />
                    <div className="flex space-x-2 border border-[#515F69] bg-[#F4F6F7] rounded-lg pr-2 ">
                      <TextInput
                        type={
                          showSettingsData.whatsappapi ? "text" : "password"
                        }
                        placeholderText="Enter WhatsApp API"
                        name="whatsappapi"
                        value={values.whatsappapi}
                        handleInputChange={handleChange}
                        className="w-full rounded-tr-none rounded-br-none border-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleShowSettingsData("whatsappapi")}
                      >
                        {showSettingsData.whatsappapi ? "hide" : "show"}
                      </button>
                    </div>

                    <span className="text-[10px] text-red-400">
                      {errors.whatsappapi && errors.whatsappapi}
                    </span>
                  </div>
                  <div className=" space-y-2">
                    <Lable
                      label="Setup SendGrid API (For sending Transactional emails) *"
                      className=" text-xs"
                    />
                    <div className="flex space-x-2 border border-[#515F69] bg-[#F4F6F7] rounded-lg pr-2 ">
                      <TextInput
                        type={
                          showSettingsData.sendgridapi ? "text" : "password"
                        }
                        placeholderText="Enter sendgrid API Key"
                        name="sendgridapi"
                        value={values.sendgridapi}
                        handleInputChange={handleChange}
                        className="w-full rounded-tr-none rounded-br-none border-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleShowSettingsData("sendgridapi")}
                      >
                        {showSettingsData.sendgridapi ? "hide" : "show"}
                      </button>
                    </div>

                    <span className="text-[10px] text-red-400">
                      {errors.sendgridapi && errors.sendgridapi}
                    </span>
                  </div>
                  {/* <div className=" space-y-2"> */}
                  {/* <Lable label="Add pages to disable" className=" text-xs" /> */}
                  {/* https://react-select.com/home */}
                  {/* <Select
                      options={options}
                      isMulti
                      name="pagelink"
                      value={options.filter((option) =>
                        values.pagelink.includes(option.value)
                      )}
                      className=" bg-[#F4F6F7]"
                      onChange={(selectedOptions) =>
                        setFieldValue(
                          "pagelink",
                          selectedOptions
                            ? selectedOptions.map((option) => option.value)
                            : []
                        )
                      }
                    /> */}
                  {/* 
                    <span className="text-[10px] text-red-400">
                      {errors.pagelink && errors.pagelink}
                    </span> */}
                  {/* </div> */}
                  <div className=" space-y-2">
                    <Lable
                      label="Upload app logo 32 x 32 size with transparent background *"
                      className=" text-xs"
                    />
                    <TextInput
                      type="file"
                      name="applogo"
                      accept="image/*"
                      handleInputChange={(event) => {
                        const file =
                          event.currentTarget.files &&
                          event.currentTarget.files[0];
                        if (file) {
                          setFieldValue("applogo", file);
                        }
                      }}
                      className="w-full border-none"
                    />
                    <span className="text-[10px] text-red-400">
                      {errors.applogo && errors.applogo}
                    </span>
                  </div>
                </div>
                <Button
                  type="submit"
                  text="Update settings "
                  className="w-full mt-8"
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
      </section>
    </main>
  );
}

export default Settings;
