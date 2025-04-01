import Lable from "../../components/Lable/Lable";
import TextInput from "../../components/Input/TextInput";
import InternationalTelephoneInput from "../../components/Input/InternatioanlTelephoneInput";

interface FamilyMembersInfoProps {
  index: number;
  member: {
    firstName: string;
    lastName: string;
    title: string;
    dateOfEntry: string;
    emailId: string;
    whatsappId: string;
    relationship: string;
    dateOfBirth: string;
    gender: string;
    bloodgroup: string;
  };
  onChange: (field: string, value: string) => void;
  onRemove: () => void;
  errors: { [key: string]: string };
}

function FamilyMembersInfo({
  index,
  member,
  onChange,
  onRemove,
  errors,
}: FamilyMembersInfoProps) {
  console.log("ERRORS IN FAMILY MEMEBER", errors);
  console.log(
    "ERRORS IN FAMILY MEMEBER",
    errors[`familyMembers[${index}].firstName`]
  );
  return (
    <section className="border border-slate-300 bg-white rounded-lg p-4">
      <div className="flex justify-end">
        <button
          onClick={onRemove}
          className="bg-slate-50 w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-100 rounded-full p-3"
        >
          X
        </button>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="flex flex-col space-y-2">
            <Lable label="First name" />
            <TextInput
              type="text"
              placeholderText="Enter firstname"
              value={member.firstName}
              handleInputChange={(e) => onChange("firstName", e.target.value)}
            />
            {Array.isArray(errors.familyMembers) &&
              errors.familyMembers[index]?.firstName && (
                <span className="text-red-500">
                  {errors.familyMembers[index].firstName}
                </span>
              )}
          </div>
          <div className="flex flex-col space-y-2">
            <Lable label="Last name" />
            <TextInput
              type="text"
              placeholderText="Enter last name"
              value={member.lastName}
              handleInputChange={(e) => onChange("lastName", e.target.value)}
            />

            {Array.isArray(errors.familyMembers) &&
              errors.familyMembers[index]?.lastName && (
                <span className="text-red-500">
                  {errors.familyMembers[index].lastName}
                </span>
              )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="flex flex-col space-y-2">
            <Lable label="Select title" />
            <select
              className={` px-3  h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]`}
              value={member.title}
              onChange={(e) => onChange("title", e.target.value)}
            >
              <option value="">Select title</option>
              <option value="MR">MR</option>
              <option value="MRS">MRS</option>
              <option value="MS">MS</option>
              <option value="MASTER">MASTER</option>
              <option value="DR">DR</option>
              <option value="CHIEF">CHIEF</option>
              <option value="OTHER">OTHER</option>
            </select>
            {Array.isArray(errors.familyMembers) &&
              errors.familyMembers[index]?.title && (
                <span className="text-red-500">
                  {errors.familyMembers[index].title}
                </span>
              )}
          </div>
          <div className="flex flex-col space-y-2">
            <Lable label="Date of first entry to Nigeria" />
            <TextInput
              type="date"
              value={member.dateOfEntry}
              handleInputChange={(e) => onChange("dateOfEntry", e.target.value)}
            />
            {Array.isArray(errors.familyMembers) &&
              errors.familyMembers[index]?.dateOfEntry && (
                <span className="text-red-500">
                  {errors.familyMembers[index].dateOfEntry}
                </span>
              )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="flex flex-col space-y-2">
            <Lable label="Email ID" />
            <TextInput
              type="text"
              placeholderText="Enter email address"
              value={member.emailId}
              handleInputChange={(e) => onChange("emailId", e.target.value)}
            />
            <span className="text-red-500">
              {errors[`familyMembers[${index}].emailId`]}
            </span>
            {Array.isArray(errors.familyMembers) &&
              errors.familyMembers[index]?.emailId && (
                <span className="text-red-500">
                  {errors.familyMembers[index].emailId}
                </span>
              )}
          </div>
          <div className="flex flex-col space-y-2">
            <Lable label="Whatsapp Number" />
            {/* <TextInput
              type="text"
              placeholderText="Enter whatsapp number"
              value={member.whatsappId}
              handleInputChange={(e) => onChange("whatsappId", e.target.value)}
            /> */}

            <InternationalTelephoneInput
              value={member.whatsappId}
              handleInputChange={(value) => onChange("whatsappId", value)}
            />
            {Array.isArray(errors.familyMembers) &&
              errors.familyMembers[index]?.whatsappId && (
                <span className="text-red-500">
                  {errors.familyMembers[index].whatsappId}
                </span>
              )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="flex flex-col space-y-2">
            <Lable label="Relationship with family member" />
            <select
              className={` px-3  h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]`}
              value={member.relationship}
              onChange={(e) => onChange("relationship", e.target.value)}
            >
              <option value="">Select the relationship</option>
              <option value="Husband">Husband</option>
              <option value="Wife">Wife</option>
              <option value="Son">Son</option>
              <option value="Daughter">Daughter</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
            </select>

            {Array.isArray(errors.familyMembers) &&
              errors.familyMembers[index]?.relationship && (
                <span className="text-red-500">
                  {errors.familyMembers[index].relationship}
                </span>
              )}
          </div>
          <div className="flex flex-col space-y-2">
            <Lable label="Date of Birth" />
            <TextInput
              type="date"
              placeholderText="Enter Date of Birth"
              value={member.dateOfBirth}
              handleInputChange={(e) => onChange("dateOfBirth", e.target.value)}
            />

            {Array.isArray(errors.familyMembers) &&
              errors.familyMembers[index]?.dateOfBirth && (
                <span className="text-red-500">
                  {errors.familyMembers[index].dateOfBirth}
                </span>
              )}
          </div>
        </div>
        {/* Additional feature */}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="flex flex-col space-y-2">
            <Lable label="Gender" />
            <select
              value={member.gender}
              onChange={(e) => onChange("gender", e.target.value)}
              className={` px-3  h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]`}
            >
              <option>--Select Gender--</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            {/* {errors.gender && <p className="text-red-500">{errors.gender}</p>} */}
            {Array.isArray(errors.familyMembers) &&
              errors.familyMembers[index]?.gender && (
                <span className="text-red-500">
                  {errors.familyMembers[index].gender}
                </span>
              )}
          </div>
          <div className="flex flex-col space-y-2">
            <Lable label="Select Blood group" />
            <select
              name="bloodgroup"
              id="bloodGroup"
              value={member.bloodgroup}
              onChange={(e) => onChange("bloodgroup", e.target.value)}
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

            {Array.isArray(errors.familyMembers) &&
              errors.familyMembers[index]?.bloodgroup && (
                <span className="text-red-500">
                  {errors.familyMembers[index].bloodgroup}
                </span>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FamilyMembersInfo;
