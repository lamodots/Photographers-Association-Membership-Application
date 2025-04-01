import Button from "../../components/Button/Button";
import FamilyMembersInfo from "./FamilyMembersInfo";
import { StepTwoValues, FamilyMember } from "./OnboardingWelcome";

interface OnboardingStepTwoProps {
  data: StepTwoValues;
  setData: (data: StepTwoValues) => void;
  errors: { [key: string]: any };
}

function OnboardingStepTwo({ data, setData, errors }: OnboardingStepTwoProps) {
  const handleFamilyInLagosChange = (value: boolean) => {
    // When "No" is selected, clear the familyMembers array.
    setData({
      ...data,
      familyInLagos: value,
      familyMembers: value ? data.familyMembers : [],
    });
  };

  const handleAddFamilyMember = () => {
    const newMember: FamilyMember = {
      firstName: "",
      lastName: "",
      title: "",
      dateOfEntry: "",
      emailId: "",
      whatsappId: "",
      relationship: "",
      dateOfBirth: "",
      gender: "",
      bloodgroup: "",
    };
    const updated = [...data.familyMembers, newMember];
    setData({ ...data, familyMembers: updated });
  };

  const handleRemoveFamilyMember = (index: number) => {
    const updated = data.familyMembers.filter((_, i) => i !== index);
    setData({ ...data, familyMembers: updated });
  };

  const handleFamilyMemberChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = data.familyMembers.map((member, i) =>
      i === index ? { ...member, [field]: value } : member
    );
    setData({ ...data, familyMembers: updated });
  };

  return (
    <section className="p-4">
      <div className="space-y-4">
        <p>Is your Family here in Lagos?</p>
        <div className="flex gap-4 my-8">
          <label className=" border border-slate-500 px-10 py-6 rounded-lg cursor-pointer flex items-center gap-2">
            <input
              type="radio"
              name="familyInLagos"
              checked={data.familyInLagos === true}
              onChange={() => handleFamilyInLagosChange(true)}
              className=" custom-radio w-6 h-6"
            />
            Yes
          </label>
          <label className=" border border-slate-500 px-10 py-6 rounded-lg cursor-pointer flex items-center gap-2">
            <input
              type="radio"
              name="familyInLagos"
              checked={data.familyInLagos === false}
              onChange={() => handleFamilyInLagosChange(false)}
              className=" custom-radio w-6 h-6"
            />
            No
          </label>
        </div>
        {errors.familyInLagos && (
          <p className="text-red-500">{errors.familyInLagos}</p>
        )}

        {data.familyInLagos && (
          <>
            <Button
              text="Add family member info"
              handleClick={handleAddFamilyMember}
              className="px-8 bg-green-600"
            />
            {data.familyMembers.length === 0 &&
              errors.familyMembers &&
              typeof errors.familyMembers === "string" && (
                <p className="text-red-500">{errors.familyMembers}</p>
              )}
            {data.familyMembers.map((member, index) => (
              <FamilyMembersInfo
                key={index}
                index={index}
                member={member}
                onChange={(field, value) =>
                  handleFamilyMemberChange(index, field, value)
                }
                onRemove={() => handleRemoveFamilyMember(index)}
                errors={errors}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default OnboardingStepTwo;
