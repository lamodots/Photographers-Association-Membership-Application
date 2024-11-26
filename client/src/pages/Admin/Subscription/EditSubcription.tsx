import React from "react";
import Lable from "../../../components/Lable/Lable";
import TextInput from "../../../components/Input/TextInput";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "../../../components/Button/Button";
import Select from "react-select";

function EditSubcription() {
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
      <section>
        <h1 className="text-2xl text-[#212529] font-bold">
          Update Subscription
        </h1>
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
                    <Lable label="Subscription Title *" className=" text-xs" />
                    <TextInput
                      type="text"
                      placeholderText="Enter subscription title"
                      name="title"
                      value={values.title}
                      handleInputChange={handleChange}
                      className="w-full"
                    />
                    <span className="text-[10px] text-red-400">
                      {errors.title && errors.title}
                    </span>
                  </div>
                  <div className=" space-y-2">
                    <Lable label="Duration Period *" className=" text-xs" />
                    <TextInput
                      type="text"
                      placeholderText="Enter period EG. 30d"
                      name="duration"
                      value={values.duration}
                      handleInputChange={handleChange}
                      className="w-full"
                    />
                    <span className="text-[10px] text-red-400">
                      {errors.duration && errors.duration}
                    </span>
                  </div>
                  <div className=" space-y-2">
                    <Lable label="Subscription Amount *" className=" text-xs" />
                    <TextInput
                      type="text"
                      placeholderText="Enter subscription  amount EG 5000"
                      name="amount"
                      value={values.amount}
                      handleInputChange={handleChange}
                      className="w-full"
                    />
                    <span className="text-[10px] text-red-400">
                      {errors.amount && errors.amount}
                    </span>
                  </div>

                  <div className=" space-y-2">
                    <Lable
                      label="Subscription Description*"
                      className=" text-xs"
                    />
                    <div>
                      <div className="w-full px-3 py-2  rounded-lg  border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA] border mb-2">
                        <textarea
                          rows={8}
                          placeholder="Subscription Description"
                          className=" w-full border-0 outline-0 bg-[#F4F6F7] "
                          name="description"
                          value={values.description}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[10px] text-red-400">
                          {errors.description && errors.description}
                        </span>
                        <small className="text-[#1A4F83]">0/400</small>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  text="Create Subscription "
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

export default EditSubcription;
