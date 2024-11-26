import React from "react";
import Lable from "../../../components/Lable/Lable";
import TextInput from "../../../components/Input/TextInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../../../components/Button/Button";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
function Settings() {
  const settingsSchema = Yup.object().shape({
    appName: Yup.string()
      .max(
        8,
        "Application name must be a string with a maximum of 8 characters"
      )
      .required("Application name is required"),
    apiKey: Yup.string().required("API key is required."),
    whatsAPPaPI: Yup.string().required("WhatsApp API key is required."),
    disablePage: Yup.string(),
    file: Yup.string(),
    page: Yup.string(),
  });

  const initialValues = {
    appName: "",
    apiKey: "",
    whatsAPPaPI: "",
    disablePage: "",
    file: "",
    page: "",
  };
  return (
    <main>
      <section>
        <h1 className="text-2xl text-[#212529] font-bold">General settings</h1>
        <div className="form mt-8 w-full max-w-[600px]">
          <Formik
            initialValues={initialValues}
            validationSchema={settingsSchema}
            onSubmit={(value) => console.log(value)}
          >
            {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className=" space-y-2">
                    <Lable
                      label="Customize Application name *"
                      className=" text-xs"
                    />
                    <TextInput
                      type="text"
                      placeholderText="Enter application name"
                      name="appName"
                      value={values.appName}
                      handleInputChange={handleChange}
                      className="w-full"
                    />
                    <span className="text-[10px] text-red-400">
                      {errors.appName && errors.appName}
                    </span>
                  </div>
                  <div className=" space-y-2">
                    <Lable
                      label="Setup payment API (For Handing payments) *"
                      className=" text-xs"
                    />
                    <TextInput
                      type="text"
                      placeholderText="Enter payment API"
                      name="apiKey"
                      value={values.apiKey}
                      handleInputChange={handleChange}
                      className="w-full"
                    />
                    <span className="text-[10px] text-red-400">
                      {errors.apiKey && errors.apiKey}
                    </span>
                  </div>
                  <div className=" space-y-2">
                    <Lable
                      label="Setup WhatsApp API (For sending Birthday WhatsApp Text Message) *"
                      className=" text-xs"
                    />
                    <TextInput
                      type="text"
                      placeholderText="Enter WhatsApp API"
                      name="whatsAppaPI"
                      value={values.whatsAPPaPI}
                      handleInputChange={handleChange}
                      className="w-full"
                    />
                    <span className="text-[10px] text-red-400">
                      {errors.whatsAPPaPI && errors.whatsAPPaPI}
                    </span>
                  </div>
                  <div className=" space-y-2">
                    <Lable label="Add pages to disable" className=" text-xs" />
                    {/* https://react-select.com/home */}
                    <Select
                      options={options}
                      isMulti
                      className=" bg-[#F4F6F7]"
                    />

                    <span className="text-[10px] text-red-400">
                      {errors.page && errors.page}
                    </span>
                  </div>
                  <div className=" space-y-2">
                    <Lable
                      label="Upload app logo 32 x 32 size *"
                      className=" text-xs"
                    />
                    <TextInput
                      type="file"
                      name="file"
                      value={values.file}
                      handleInputChange={handleChange}
                      className="w-full"
                    />
                    <span className="text-[10px] text-red-400">
                      {errors.file && errors.file}
                    </span>
                  </div>
                </div>
                <Button
                  text="Update settings "
                  className="w-full mt-8"
                  disableBtn={isSubmitting}
                />
              </form>
            )}
          </Formik>
        </div>
      </section>
    </main>
  );
}

export default Settings;
