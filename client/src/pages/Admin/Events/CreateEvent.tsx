import React from "react";
import Lable from "../../../components/Lable/Lable";
import TextInput from "../../../components/Input/TextInput";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Button from "../../../components/Button/Button";
import useWordCount from "../../../hooks/useWordCount";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

const API_URL = process.env.REACT_APP_CLIENT_URL;
interface EventProps {
  title: string;
  startDate: string;
  endDate: string;
  photoImage: string;
  description: string;
}

function CreateEvent() {
  const { wordCount, handleWordCount } = useWordCount();
  const eventSchema = Yup.object().shape({
    title: Yup.string()
      .trim()
      .max(120, "Event name must be a string with a maximum of 120 characters")
      .required("Event  title is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date().required("Start date is required"),
    photoImage: Yup.string(),

    description: Yup.string()
      .trim()

      .max(400)
      .required("Event  description is required"),
  });

  const initialValues = {
    title: "",
    startDate: "",
    endDate: "",
    photoImage: "",
    description: "",
  };

  async function handleEventSubmit(
    values: EventProps,
    { setSubmitting, resetForm }: FormikHelpers<EventProps>
  ) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const res = await fetch(`${API_URL}/api/v1/secure/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });

      if (res.ok) {
        const { message } = await res.json();
        toast.success(message);
        resetForm();
      } else {
        const errorData = await res.json();

        toast.error(errorData.msg || "An error occurred. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <section>
        <h1 className="text-2xl text-[#212529] font-bold">Create Event</h1>
        <div className="form mt-8 w-full max-w-[600px]">
          <Formik
            initialValues={initialValues}
            validationSchema={eventSchema}
            onSubmit={handleEventSubmit}
          >
            {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className=" space-y-2">
                    <Lable label="Event title *" className=" text-xs" />
                    <TextInput
                      type="text"
                      placeholderText="Enter Event title"
                      name="title"
                      value={values.title}
                      handleInputChange={handleChange}
                      className="w-full"
                    />
                    <span className="text-[10px] text-red-400">
                      {errors.title && errors.title}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className=" space-y-2">
                      <Lable label="Event start date *" className=" text-xs" />
                      <TextInput
                        type="date"
                        name="startDate"
                        value={values.startDate}
                        handleInputChange={handleChange}
                        className="w-full"
                      />
                      <span className="text-[10px] text-red-400">
                        {errors.startDate && errors.startDate}
                      </span>
                    </div>
                    <div className=" space-y-2">
                      <Lable label="Event end date*" className=" text-xs" />
                      <TextInput
                        type="date"
                        placeholderText="Enter Event title"
                        name="endDate"
                        value={values.endDate}
                        handleInputChange={handleChange}
                        className="w-full"
                      />
                      <span className="text-[10px] text-red-400">
                        {errors.endDate && errors.endDate}
                      </span>
                    </div>
                  </div>
                  <div className=" space-y-2">
                    <Lable
                      label="Upload app logo 600 x 600 size *"
                      className=" text-xs"
                    />
                    <TextInput
                      type="file"
                      name="file"
                      value={values.photoImage}
                      handleInputChange={handleChange}
                      className="w-full"
                    />
                    <span className="text-[10px] text-red-400">
                      {errors.photoImage && errors.photoImage}
                    </span>
                  </div>
                  <div className=" space-y-2">
                    <Lable label="Event Description*" className=" text-xs" />
                    <div>
                      <div className="w-full px-3 py-2  rounded-lg  border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA] border mb-2">
                        <textarea
                          rows={8}
                          placeholder="Event  Description"
                          className=" w-full border-0 outline-0 bg-[#F4F6F7] "
                          name="description"
                          value={values.description}
                          onChange={(e) => {
                            handleWordCount(e.target.value);
                            handleChange(e);
                          }}
                        />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[10px] text-red-400">
                          {errors.description && errors.description}
                        </span>
                        <small className="text-[#1A4F83]">
                          {wordCount}/400
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  text="Create Event"
                  isSubmitting={isSubmitting}
                  disableBtn={isSubmitting}
                  className="w-full"
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

export default CreateEvent;
