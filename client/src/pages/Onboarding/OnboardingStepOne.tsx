import Lable from "../../components/Lable/Lable";
import TextInput from "../../components/Input/TextInput";
import { StepOneValues } from "./OnboardingWelcome";
import InternationalTelephoneInput from "../../components/Input/InternatioanlTelephoneInput";

interface OnboardingStepOneProps {
  data: StepOneValues;
  setData: (data: StepOneValues) => void;
  errors: { [key: string]: string };
}

function OnboardingStepOne({ data, setData, errors }: OnboardingStepOneProps) {
  const handleChange = (field: keyof StepOneValues, value: string) => {
    setData({ ...data, [field]: value });
  };

  return (
    <section className="p-4">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="flex flex-col space-y-2">
            <Lable label="First name" />
            <TextInput
              type="text"
              placeholderText="Enter firstname"
              value={data.firstname}
              handleInputChange={(e) =>
                handleChange("firstname", e.target.value)
              }
            />
            {errors.firstname && (
              <p className="text-red-500">{errors.firstname}</p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <Lable label="Last name" />
            <TextInput
              type="text"
              placeholderText="Enter last name"
              value={data.lastname}
              handleInputChange={(e) =>
                handleChange("lastname", e.target.value)
              }
            />
            {errors.lastname && (
              <p className="text-red-500">{errors.lastname}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="flex flex-col space-y-2">
            <Lable label="Select title" />
            <select
              value={data.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className={` px-3  h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]`}
            >
              <option value="">--Select title--</option>
              <option value="MR">MR</option>
              <option value="MRS">MRS</option>
              <option value="MS">MS</option>
              <option value="MASTER">MASTER</option>
              <option value="DR">DR</option>
              <option value="CHIEF">CHIEF</option>
              <option value="OTHER">OTHER</option>
            </select>
            {errors.title && <p className="text-red-500">{errors.title}</p>}
          </div>
          <div className="flex flex-col space-y-2">
            <Lable label="Date of first entry to Nigeria" />
            <TextInput
              type="date"
              value={data.dateOfEntry}
              handleInputChange={(e) =>
                handleChange("dateOfEntry", e.target.value)
              }
              className="w-full"
            />
            {errors.dateOfEntry && (
              <p className="text-red-500">{errors.dateOfEntry}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="flex flex-col space-y-2">
            <Lable label="Date of Birth" />
            <TextInput
              type="date"
              placeholderText="Enter Date of Birth"
              value={data.Dob}
              handleInputChange={(e) => handleChange("Dob", e.target.value)}
              className="w-full"
            />
            {errors.Dob && <p className="text-red-500">{errors.Dob}</p>}
          </div>
          <div className="flex flex-col space-y-2">
            <Lable label="Whatsapp Number, Eg:+234 706 096 052 9" />
            <InternationalTelephoneInput
              value={data.whatsappId}
              handleInputChange={(value) => handleChange("whatsappId", value)}
            />
            {errors.whatsappId && (
              <p className="text-red-500">{errors.whatsappId}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="flex flex-col space-y-2">
            <Lable label="Gender" />
            <select
              value={data.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className={` px-3  h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]`}
            >
              <option>--Select Gender--</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            {errors.gender && <p className="text-red-500">{errors.gender}</p>}
          </div>
          <div className="flex flex-col space-y-2">
            <Lable label="Select Blood group" />
            <select
              name="bloodGroup"
              id="bloodGroup"
              value={data.bloodgroup}
              onChange={(e) => handleChange("bloodgroup", e.target.value)}
              className={` px-3  h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]`}
            >
              <option>--Select blood group--</option>
              <option value="A+">A RhD positive (A+)</option>
              <option value="A-">A RhD negative (A-)</option>
              <option value="B+">B RhD positive (B+)</option>
              <option value="B-">B RhD negative (B-)</option>
              <option value="O+">O RhD positive (O+)</option>
              <option value="O-">O RhD negative (O-)</option>
              <option value="AB+">AB RhD positive (AB+)</option>
              <option value="AB-">AB RhD negative (AB-)</option>
            </select>

            {errors.bloodgroup && (
              <p className="text-red-500">{errors.bloodgroup}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OnboardingStepOne;
