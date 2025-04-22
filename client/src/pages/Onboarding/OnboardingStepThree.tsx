import Lable from "../../components/Lable/Lable";
import TextInput from "../../components/Input/TextInput";
import { StepThreeValues } from "./OnboardingWelcome";
import { DISTRICTS } from "../../util/indianDistrict";
import { NIGERIANSTATES } from "../../util/nigerianStates";
import InternationalTelephoneInput from "../../components/Input/InternatioanlTelephoneInput";
import { useState, useEffect } from "react";

// Define the type for the DISTRICTS object to help TypeScript understand the structure
type DistrictsType = {
  [state: string]: string[];
};

interface OnboardingStepThreeProps {
  data: StepThreeValues;
  setData: (data: StepThreeValues) => void;
  errors: { [key: string]: string };
}

function OnboardingStepThree({
  data,
  setData,
  errors,
}: OnboardingStepThreeProps) {
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);

  // Update districts when state changes
  useEffect(() => {
    // Type assertion to help TypeScript understand the structure
    const districtsObject = DISTRICTS as DistrictsType;

    if (data.statesInIndia && districtsObject[data.statesInIndia]) {
      setAvailableDistricts(districtsObject[data.statesInIndia]);

      // If current district is not in the new list of districts, reset it
      if (
        data.districtInIndia &&
        !districtsObject[data.statesInIndia].includes(data.districtInIndia)
      ) {
        setData({ ...data, districtInIndia: "" });
      }
    } else {
      setAvailableDistricts([]);
      // Clear district if no state is selected
      if (data.districtInIndia) {
        setData({ ...data, districtInIndia: "" });
      }
    }
  }, [data.statesInIndia]);

  const handleChange = (field: keyof StepThreeValues, value: string) => {
    setData({ ...data, [field]: value });
  };

  return (
    <section className="p-4">
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Lable label="State In Nigeria" />

          <select
            className={` px-3  h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]`}
            value={data.state}
            onChange={(e) => handleChange("state", e.target.value)}
          >
            {NIGERIANSTATES.map((state) => {
              return (
                <option value={state} key={state}>
                  {state}
                </option>
              );
            })}
          </select>
          {errors.state && <p className="text-red-500">{errors.state}</p>}
        </div>
        <div className="flex flex-col space-y-2">
          <Lable label="Your industry / Profession" />
          <TextInput
            className="w-full"
            type="text"
            placeholderText="Enter Your industry / Profession"
            value={data.profession}
            handleInputChange={(e) =>
              handleChange("profession", e.target.value)
            }
          />
          {errors.profession && (
            <p className="text-red-500">{errors.profession}</p>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <Lable label="Address In Nigeria" />
          <TextInput
            type="text"
            placeholderText="Address In Nigeria"
            value={data.address}
            handleInputChange={(e) => handleChange("address", e.target.value)}
          />
          {errors.address && <p className="text-red-500">{errors.address}</p>}
        </div>
        <div className="flex flex-col space-y-2">
          <Lable label="Area/Location In Nigeria" />
          <select
            value={data.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className={` px-3  h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]`}
          >
            <option>Select your Area</option>
            <option>Ikeja/Ikorodu/Ota</option>
            <option>VI/Ikoyi</option>
            <option>Ilupeju</option>
            <option>Surulere/Apapa</option>
          </select>
          {errors.location && <p className="text-red-500">{errors.location}</p>}
        </div>

        <div className="flex flex-col space-y-2">
          <hr className="my-6" />
          <Lable label="Emergency Contact phone number in India" />
          <InternationalTelephoneInput
            country="in"
            value={data.emergencyContactInIndia}
            handleInputChange={(value) =>
              handleChange("emergencyContactInIndia", value)
            }
          />
          {errors.emergencyContactInIndia && (
            <p className="text-red-500">{errors.emergencyContactInIndia}</p>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <Lable label="Select your state in India" />

          <select
            className={`px-3 h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]`}
            value={data.statesInIndia}
            onChange={(e) => handleChange("statesInIndia", e.target.value)}
          >
            <option value="">Select State</option>
            {Object.keys(DISTRICTS as DistrictsType).map((state) => (
              <option value={state} key={state}>
                {state}
              </option>
            ))}
          </select>

          {errors.statesInIndia && (
            <p className="text-red-500">{errors.statesInIndia}</p>
          )}
        </div>
        {/* districts */}
        <div className="flex flex-col space-y-2">
          <Lable label="Select your district in India" />
          <select
            className={`px-3 h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]`}
            value={data.districtInIndia}
            onChange={(e) => handleChange("districtInIndia", e.target.value)}
            disabled={availableDistricts.length === 0} // Disable dropdown if no districts are available
          >
            <option value="">Select District</option>
            {availableDistricts.map((district) => (
              <option value={district} key={district}>
                {district}
              </option>
            ))}
          </select>
          {errors.districtInIndia && (
            <p className="text-red-500">{errors.districtInIndia}</p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <Lable label="Address in India" />
          <TextInput
            type="text"
            placeholderText="Enter address"
            value={data.addressInIndia}
            handleInputChange={(e) =>
              handleChange("addressInIndia", e.target.value)
            }
          />
          {errors.addressInIndia && (
            <p className="text-red-500">{errors.addressInIndia}</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default OnboardingStepThree;
