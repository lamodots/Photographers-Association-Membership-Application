import Lable from "../../../components/Lable/Lable";
import TextInput from "../../../components/Input/TextInput";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Button from "../../../components/Button/Button";
import Select from "react-select";
import { Oval } from "react-loader-spinner";
import useWordCount from "../../../hooks/useWordCount";
import toast from "react-hot-toast";
const API_URL = process.env.REACT_APP_CLIENT_URL;

interface ValuesProps {
  title: string;
  interval: string;
  amount: string;
  description: string;
}
function CreateSubScriptions() {
  const { wordCount, handleWordCount } = useWordCount();
  const options = [
    { value: "daily", label: "Daily" },
    { value: "quarterly", label: "Quarterly" },
    { value: "monthly", label: "Monthly" },
    { value: "annually", label: "Annually" },
  ];

  const settingsSchema = Yup.object().shape({
    title: Yup.string()
      .max(
        65,
        "Subscription name must be a string with a maximum of 65 characters"
      )
      .required("Subscription name is required"),
    interval: Yup.string().required("Subscription duration is required."),
    amount: Yup.number().required("Subscription amount is required."),
    description: Yup.string()
      .required("Annoucement  description is required")
      .test("max-words", "Description cannot exceed 400 words", (value) => {
        if (value) {
          const wordCount = value.trim().split(/\s+/).length;
          return wordCount <= 400;
        }
        return true;
      }),
  });

  const initialValues: ValuesProps = {
    title: "",
    interval: "",
    amount: "",
    description: "",
  };

  const handleCreateSubscriptionPlan = async (
    values: ValuesProps,
    { setSubmitting, resetForm }: FormikHelpers<ValuesProps>
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const res = await fetch(`${API_URL}/api/v1/secure/subscriptions`, {
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
        toast.error(errorData.msg || "An error occured , try again!");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <main>
      <section>
        <h1 className="text-2xl text-[#212529] font-bold">
          Create Subscription
        </h1>
        <div className="form mt-8 w-full max-w-[600px]">
          <Formik
            initialValues={initialValues}
            validationSchema={settingsSchema}
            onSubmit={handleCreateSubscriptionPlan}
          >
            {({
              values,
              errors,
              handleChange,
              setFieldValue,
              handleSubmit,
              isSubmitting,
            }) => (
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

                    <Select
                      options={options}
                      name="interval"
                      value={options.find(
                        (option) => option.value === values.interval
                      )}
                      onChange={(option) =>
                        setFieldValue("interval", option ? option.value : "")
                      }
                      className=" bg-[#F4F6F7]"
                    />
                    <span className="text-[10px] text-red-400">
                      {errors.interval && errors.interval}
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
                          onChange={(e) => {
                            handleChange(e);
                            handleWordCount(e.target.value);
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
                  text="Create Subscription"
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

export default CreateSubScriptions;
