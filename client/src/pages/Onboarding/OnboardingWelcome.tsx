import { useState } from "react";
import Button from "../../components/Button/Button";
import OnboardingStepOne from "./OnboardingStepOne";
import OnboardingStepTwo from "./OnboardingStepTwo";
import OnboardingStepThree from "./OnboardingStepThree";
import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { useCurrentUser } from "../../context/AdminContext";

const API_URL = process.env.REACT_APP_CLIENT_URL;

export interface StepOneValues {
  firstname: string;
  lastname: string;
  title: string;
  dateOfEntry: string;
  Dob: string;
  whatsappId: string;
  gender: string;
  bloodgroup: string;
}

export interface FamilyMember {
  firstName: string;
  lastName: string;
  title: string;
  dateOfEntry: string;
  emailId: string;
  whatsappId: string;
  relationship: string;
  dateOfBirth: string;
}

export interface StepTwoValues {
  familyInLagos: boolean | null;
  familyMembers: FamilyMember[];
}

export interface StepThreeValues {
  state: string;
  address: string;
  location: string;
  emergencyContactInIndia: string;
  districtInIndia: string;
  addressInIndia: string;
}

const initialStepOne: StepOneValues = {
  Dob: "",
  whatsappId: "",
  firstname: "",
  lastname: "",
  title: "",
  dateOfEntry: "",
  gender: "",
  bloodgroup: "",
};

const initialStepTwo: StepTwoValues = {
  familyInLagos: null,
  familyMembers: [],
};

const initialStepThree: StepThreeValues = {
  state: "",
  address: "",
  location: "",
  emergencyContactInIndia: "",
  districtInIndia: "",
  addressInIndia: "",
};

const validateStepOne = (data: StepOneValues) => {
  const errors: { [key: string]: string } = {};
  if (!data.firstname.trim()) errors.firstName = "First name is required";
  if (!data.Dob.trim()) errors.dob = "Date of birth is required";
  if (!data.whatsappId.trim())
    errors.whatsappId = "Whatsapp number is required";
  if (!data.lastname.trim()) errors.lastName = "Last name is required";
  if (!data.title) errors.title = "Title is required";
  if (!data.dateOfEntry) errors.dateOfEntry = "Date of entry is required";
  if (!data.gender) errors.gender = "Gender required";
  if (!data.bloodgroup) errors.bloodgroup = "Blood group is required";
  return errors;
};

const validateStepTwo = (data: StepTwoValues) => {
  const errors: { [key: string]: any } = {};
  if (data.familyInLagos === null) {
    errors.familyInLagos = "This field is required";
  } else if (data.familyInLagos === true) {
    if (data.familyMembers.length === 0) {
      errors.familyMembers = "At least one family member is required";
    } else {
      const memberErrors = data.familyMembers.map((member) => {
        const mErr: { [key: string]: string } = {};
        if (!member.firstName.trim()) mErr.firstName = "First name is required";
        if (!member.lastName.trim()) mErr.lastName = "Last name is required";
        if (!member.title) mErr.title = "Title is required";
        if (!member.dateOfEntry) mErr.dateOfEntry = "Date of entry is required";
        if (!member.emailId.trim()) mErr.emailId = "Email is required";
        if (member.emailId && !/^\S+@\S+\.\S+$/.test(member.emailId))
          mErr.emailId = "Invalid email";
        if (!member.whatsappId.trim())
          mErr.whatsappId = "WhatsApp number is required";
        if (!member.relationship)
          mErr.relationship = "Relationship is required";
        if (!member.dateOfBirth) mErr.dateOfBirth = "Date of birth is required";
        return mErr;
      });
      if (memberErrors.some((e) => Object.keys(e).length > 0)) {
        errors.familyMembers = memberErrors;
      }
    }
  }
  return errors;
};

const validateStepThree = (data: StepThreeValues) => {
  const errors: { [key: string]: string } = {};
  if (!data.state.trim()) errors.state = "State is required";
  if (!data.address.trim()) errors.address = "Address is required";
  if (!data.location.trim()) errors.location = "Location is required";
  if (!data.emergencyContactInIndia.trim())
    errors.emergencyContactInIndia = "Emergency contact Phone is required";
  if (!data.districtInIndia.trim())
    errors.districtInIndia = "District is required";
  if (!data.addressInIndia.trim())
    errors.addressInIndia = "Address in India is required";
  return errors;
};

function OnboardingWelcome() {
  const { currentUser } = useCurrentUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [stepOneData, setStepOneData] = useState<StepOneValues>(initialStepOne);
  const [stepTwoData, setStepTwoData] = useState<StepTwoValues>(initialStepTwo);
  const [stepThreeData, setStepThreeData] =
    useState<StepThreeValues>(initialStepThree);
  const [errors, setErrors] = useState<{ [key: string]: any }>({});
  const navigate = useNavigate();
  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep === 1) {
      const errs = validateStepOne(stepOneData);
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }
      setErrors({});
      setCurrentStep(2);
    } else if (currentStep === 2) {
      const errs = validateStepTwo(stepTwoData);
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }
      setErrors({});
      setCurrentStep(3);
    } else if (currentStep === 3) {
      const errs = validateStepThree(stepThreeData);
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }
      setErrors({});
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    // Append Step 1 data
    Object.entries(stepOneData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    // Append Step 2 data
    formData.append(
      "familyInLagos",
      stepTwoData.familyInLagos ? "true" : "false"
    );
    // Append familyMembers as a JSON string (empty array if familyInLagos is false)
    formData.append(
      "familyMembers",
      JSON.stringify(stepTwoData.familyInLagos ? stepTwoData.familyMembers : [])
    );
    // Append Step 3 data
    Object.entries(stepThreeData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    // Debug: log FormData entries

    // for (const [key, value] of Array.from(formData.entries())) {
    //   console.log(key, value);
    // }
    try {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      const response = await fetch(
        `${API_URL}/api/v1/users/auth/onboarding/${currentUser?.user.email}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Onboarding completed !");
        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        toast.error("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-[#F5F7FA] grid md:grid-cols-[4fr_8fr] relative">
      <aside className="bg-slate-800 h-screen p-6 md:px-16 md:py-16">
        <h1 className="text-2xl text-left text-[#212529]">
          <span className="text-4xl text-white font-bold">Welcome to</span>
          <br />
          <span className="text-lg text-zinc-100">KERALA SAMAJAM NIGERIA</span>
        </h1>
        <p className="mt-6 text-white text-sm">
          Tell us a little about yourself to set up your profile
        </p>
      </aside>
      <div className="md:pt-16 pb-16 h-screen overflow-y-auto">
        <div className="mx-auto max-w-[680px] w-full bg-slate-50">
          <div className="bg-cyan-100 rounded-lg w-full p-6 border border-slate-300">
            <div className="flex space-x-4">
              <Info />
              <p className="text-lg text-[#515F69]">
                Please answer these questions to complete your membership
                registration
              </p>
            </div>
          </div>
          <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden mt-6">
            <div
              className="absolute top-0 left-0 h-full bg-green-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          <p className="text-green-700">
            Step {currentStep} of {totalSteps}
          </p>

          {currentStep === 1 && (
            <OnboardingStepOne
              data={stepOneData}
              setData={setStepOneData}
              errors={errors}
            />
          )}
          {currentStep === 2 && (
            <OnboardingStepTwo
              data={stepTwoData}
              setData={setStepTwoData}
              errors={errors}
            />
          )}
          {currentStep === 3 && (
            <OnboardingStepThree
              data={stepThreeData}
              setData={setStepThreeData}
              errors={errors}
            />
          )}

          <div className="flex justify-between mt-14">
            {currentStep > 1 && (
              <Button
                type="button"
                text="Previous"
                handleClick={handlePrevious}
                className="w-1/3"
              />
            )}
            <Button
              type="button"
              text={currentStep === totalSteps ? "Submit" : "Next"}
              handleClick={handleNext}
              className={`w-1/3 ${currentStep === 1 ? "ml-auto" : ""}`}
            />
          </div>
        </div>
      </div>
      {isSubmitting && (
        <div className="bg-slate-400/40 w-screen h-screen absolute top-0 ">
          <div className="w-full h-full flex items-start justify-center">
            {isSubmitting && <Oval width={24} height={24} />}
          </div>
        </div>
      )}
    </main>
  );
}

export default OnboardingWelcome;
