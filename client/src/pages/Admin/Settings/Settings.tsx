import React from "react";
import Lable from "../../../components/Lable/Lable";
import TextInput from "../../../components/Input/TextInput";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Button from "../../../components/Button/Button";
import Select from "react-select";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const options = [
  { value: "content", label: "Content" },
  { value: "certificate", label: "Certificate" },
  { value: "id-card", label: "Id-Card" },
];

interface ValuesProps {
  appname: string;
  paymentapi: string;
  whatsappapi: string;
  pagelink: string[];
  applogo: string;
}
function Settings() {
  const navigate = useNavigate();
  const settingsSchema = Yup.object().shape({
    appname: Yup.string()
      .max(
        8,
        "Application name must be a string with a maximum of 8 characters"
      )
      .required("Application name is required"),
    paymentapi: Yup.string().required("API key is required."),
    whatsappapi: Yup.string().required("WhatsApp API key is required."),
    pagelink: Yup.array().of(Yup.string()),
    applogo: Yup.string(),
  });

  const initialValues: ValuesProps = {
    appname: "",
    paymentapi: "",
    whatsappapi: "",
    pagelink: [],
    applogo: "",
  };

  async function handleSubmitSettings(
    values: ValuesProps,
    { setSubmitting }: FormikHelpers<ValuesProps>
  ) {
    console.log(values);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const res = await fetch("/api/v1/secure/settings", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
      if (res.ok) {
        const { message } = await res.json();
        toast.success(message);
        navigate("/secure/settings");
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
  return (
    <main>
      <section>
        <h1 className="text-2xl text-[#212529] font-bold">General settings</h1>
        <div className="form mt-8 w-full max-w-[600px]">
          <Formik
            initialValues={initialValues}
            validationSchema={settingsSchema}
            onSubmit={handleSubmitSettings}
          >
            {({
              values,
              errors,
              handleChange,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            }) => (
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
                      name="appname"
                      value={values.appname}
                      handleInputChange={handleChange}
                      className="w-full"
                    />
                    <span className="text-[10px] text-red-400">
                      {errors.appname && errors.appname}
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
                      name="paymentapi"
                      value={values.paymentapi}
                      handleInputChange={handleChange}
                      className="w-full"
                    />
                    <span className="text-[10px] text-red-400">
                      {errors.paymentapi && errors.paymentapi}
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
                      name="whatsappapi"
                      value={values.whatsappapi}
                      handleInputChange={handleChange}
                      className="w-full"
                    />
                    <span className="text-[10px] text-red-400">
                      {errors.whatsappapi && errors.whatsappapi}
                    </span>
                  </div>
                  <div className=" space-y-2">
                    <Lable label="Add pages to disable" className=" text-xs" />
                    {/* https://react-select.com/home */}
                    <Select
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
                    />

                    <span className="text-[10px] text-red-400">
                      {errors.pagelink && errors.pagelink}
                    </span>
                  </div>
                  <div className=" space-y-2">
                    <Lable
                      label="Upload app logo 32 x 32 size *"
                      className=" text-xs"
                    />
                    <TextInput
                      type="file"
                      name="applogo"
                      value={values.applogo}
                      handleInputChange={handleChange}
                      className="w-full"
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
