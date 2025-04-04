// import React, { useState } from "react";
// import { Pencil, Save, X, Upload } from "lucide-react";

// interface FamilyMember {
//   firstName: string;
//   lastName: string;
//   relationship: string;
//   whatsappId: string;
//   emailId: string;
//   image: string;
//   gender: string;
//   bloodgroup: string;
// }

// interface User {
//   _id: string;
//   image: string;
//   firstname: string;
//   lastname: string;
//   title: string;
//   Dob: string;
//   location: string;
//   address: string;
//   whatsappId: string;
//   email: string;
//   emergencyContactInIndia: string;
//   districtInIndia: string;
//   addressInIndia: string;
//   state: string;
//   familyInLagos: boolean;
//   familyMembers: FamilyMember[];
//   password?: string;
//   confirmPassword?: string;
//   memberId?: string;
//   gender: string;
//   bloodgroup: string;
// }

// const initialUser: User = {
//   _id: "67aca819753634a3c8b35b7c",
//   image:
//     "https://img.freepik.com/premium-vector/indian-woman-traditional-dress-avatar-social-network-fashion-illustration_981400-162.jpg?w=360",
//   firstname: "Wisdom",
//   lastname: "Lamodot",
//   title: "MR",
//   Dob: "2025-02-27T00:00:00.000Z",
//   location: "Ikeja/Ikorodu/Ota",
//   address: "83 Opebi Rd, Opebi, Ikeja, Lagos, Nigeria",
//   whatsappId: "+2348989898989",
//   email: "lopice5780@cybtric.com",
//   gender: "Male",
//   bloodgroup: "O+",
//   emergencyContactInIndia: "+919847543302",
//   districtInIndia: "Daman and Diu",
//   addressInIndia: "83 Opebi Rd, Opebi, Ikeja, Lagos, Nigeria",
//   state: "Adamawa",
//   familyInLagos: true,
//   familyMembers: [
//     {
//       firstName: "Mekukele",
//       lastName: "Zambia",
//       relationship: "Daughter",
//       whatsappId: "+2349090909090",
//       emailId: "lamodots@gmail.com",
//       image:
//         "https://thumbs.dreamstime.com/b/indian-boy-face-avatar-cartoon-indian-young-boy-face-profile-picture-avatar-cartoon-character-portrait-vector-illustration-graphic-150835356.jpg",
//       gender: "Male",
//       bloodgroup: "O+",
//     },
//     {
//       firstName: "Zazam",
//       lastName: "Mike",
//       relationship: "Father",
//       whatsappId: "+2348080808088",
//       emailId: "user@gmail.com",
//       image:
//         "https://previews.123rf.com/images/jemastock/jemastock1909/jemastock190926314/130721128-indian-man-face-with-moustache-and-bald-profile-picture-avatar-cartoon-character-portrait-vector.jpg",
//       gender: "Male",
//       bloodgroup: "O+",
//     },
//   ],
// };

// // Define the props interface for FamilyMemberForm
// interface FamilyMemberFormProps {
//   member: FamilyMember; // Type for a single family member
//   index: number; // Index of the family member in the array
//   onChange: (index: number, field: keyof FamilyMember, value: string) => void; // Handler for input changes
//   onImageUpload: (
//     index: number,
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => void; // Handler for image upload
//   onRemove: (index: number) => void; // Handler for removing a family member
// }

// // Reusable Family Member Form Component
// const FamilyMemberForm = ({
//   member,
//   index,
//   onChange,
//   onImageUpload,
//   onRemove,
// }: FamilyMemberFormProps) => (
//   <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
//     <div className="flex items-center mb-4">
//       <div className="relative">
//         <img
//           src={member.image || "https://via.placeholder.com/100"}
//           alt={`${member.firstName} ${member.lastName}`}
//           className="w-20 h-20 rounded-full object-cover mr-4"
//         />
//         <label
//           htmlFor={`family-member-image-upload-${index}`}
//           className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer"
//         >
//           <Upload />
//         </label>
//         <input
//           id={`family-member-image-upload-${index}`}
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={(e) => onImageUpload(index, e)}
//         />
//       </div>
//       <div>
//         {true ? (
//           <>
//             <input
//               type="text"
//               value={member.firstName}
//               onChange={(e) => onChange(index, "firstName", e.target.value)}
//               placeholder="First Name"
//               className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//             />
//             <input
//               type="text"
//               value={member.lastName}
//               onChange={(e) => onChange(index, "lastName", e.target.value)}
//               placeholder="Last Name"
//               className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//             />
//             <input
//               type="text"
//               value={member.relationship}
//               onChange={(e) => onChange(index, "relationship", e.target.value)}
//               placeholder="Relationship"
//               className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//             />
//             <input
//               type="text"
//               value={member.whatsappId}
//               onChange={(e) => onChange(index, "whatsappId", e.target.value)}
//               placeholder="WhatsApp ID"
//               className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//             />
//             <input
//               type="email"
//               value={member.emailId}
//               onChange={(e) => onChange(index, "emailId", e.target.value)}
//               placeholder="Email"
//               className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//             />
//           </>
//         ) : (
//           <div>
//             <h3 className="text-lg font-medium text-gray-800">
//               {member.firstName} {member.lastName}
//             </h3>
//             <p className="text-gray-600">Relationship: {member.relationship}</p>
//             <p className="text-gray-600">WhatsApp: {member.whatsappId}</p>
//             <p className="text-gray-600">Email: {member.emailId}</p>
//           </div>
//         )}
//       </div>
//     </div>
//     <button onClick={() => onRemove(index)} className="text-red-500 mt-2">
//       Remove Family Member
//     </button>
//   </div>
// );
// function Profile() {
//   const [user, setUser] = useState<User>(initialUser);
//   const [isEditing, setIsEditing] = useState(false);
//   const [passwordError, setPasswordError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [apiError, setApiError] = useState("");

//   // Handle input changes for user fields
//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setUser((prevUser) => ({ ...prevUser, [name]: value }));
//   };

//   // Handle image upload for the user
//   const handleUserImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setUser((prevUser) => ({ ...prevUser, image: imageUrl }));
//     }
//   };

//   // Handle input changes for family members
//   const handleFamilyMemberChange = (
//     index: number,
//     field: keyof FamilyMember,
//     value: string
//   ) => {
//     const updatedFamilyMembers = [...user.familyMembers];
//     updatedFamilyMembers[index][field] = value;
//     setUser((prevUser) => ({
//       ...prevUser,
//       familyMembers: updatedFamilyMembers,
//     }));
//   };

//   // Handle image upload for family members
//   const handleFamilyMemberImageUpload = (
//     index: number,
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       handleFamilyMemberChange(index, "image", imageUrl);
//     }
//   };

//   // Add a new family member
//   const addFamilyMember = () => {
//     setUser((prevUser) => ({
//       ...prevUser,
//       familyMembers: [
//         ...prevUser.familyMembers,
//         {
//           firstName: "",
//           lastName: "",
//           relationship: "",
//           whatsappId: "",
//           emailId: "",
//           image: "",
//           gender: "",
//           bloodgroup: "",
//         },
//       ],
//     }));
//   };

//   // Remove a family member
//   const removeFamilyMember = (index: number) => {
//     const updatedFamilyMembers = user.familyMembers.filter(
//       (_, i) => i !== index
//     );
//     setUser((prevUser) => ({
//       ...prevUser,
//       familyMembers: updatedFamilyMembers,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     if (
//       user.password &&
//       user.confirmPassword &&
//       user.password !== user.confirmPassword
//     ) {
//       setPasswordError("Passwords do not match.");
//       return;
//     }
//     setPasswordError("");
//     setIsLoading(true);
//     try {
//       const formData = new FormData();
//       Object.entries(user).forEach(([key, value]) => {
//         if (key === "familyMembers") {
//           formData.append(key, JSON.stringify(value));
//         } else if (key === "image" && typeof value !== "string") {
//           formData.append(key, value);
//         } else {
//           formData.append(key, value as string);
//         }
//       });
//       const response = await fetch("/api/profile", {
//         method: "PUT",
//         body: formData,
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to save changes.");
//       }
//       alert("Profile updated successfully!");
//     } catch (error: any) {
//       setApiError(error.message || "An error occurred while saving changes.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
//       <strong>MEMBERSHIP ID:{user?.memberId}</strong>
//       <div className="mt-6 flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
//         <button
//           onClick={() => setIsEditing(!isEditing)}
//           className={`px-4 py-2 rounded ${
//             isEditing ? "bg-red-500 text-white" : "bg-blue-500 text-white"
//           } flex items-center`}
//         >
//           {isEditing ? <X className="mr-2" /> : <Pencil className="mr-2" />}
//           {isEditing ? "Cancel" : "Edit"}
//         </button>
//       </div>
//       <div className="flex flex-col md:flex-row items-center mb-6">
//         <div className="relative">
//           <img
//             src={user.image}
//             alt={`${user.firstname} ${user.lastname}`}
//             className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
//           />
//           {isEditing && (
//             <label
//               htmlFor="user-image-upload"
//               className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer"
//             >
//               <Upload />
//             </label>
//           )}
//           <input
//             id="user-image-upload"
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={handleUserImageUpload}
//           />
//         </div>
//         <div>
//           {isEditing ? (
//             <>
//               <input
//                 type="text"
//                 name="firstname"
//                 value={user.firstname}
//                 onChange={handleInputChange}
//                 placeholder="First Name"
//                 className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//               />
//               <input
//                 type="text"
//                 name="lastname"
//                 value={user.lastname}
//                 onChange={handleInputChange}
//                 placeholder="Last Name"
//                 className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//               />
//               <input
//                 type="date"
//                 name="Dob"
//                 value={new Date(user.Dob).toISOString().split("T")[0]}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//               />
//               <input
//                 type="text"
//                 name="location"
//                 value={user.location}
//                 onChange={handleInputChange}
//                 placeholder="Location"
//                 className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//               />
//               <textarea
//                 name="address"
//                 value={user.address}
//                 onChange={handleInputChange}
//                 placeholder="Address"
//                 className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//               />
//               <input
//                 type="text"
//                 name="whatsappId"
//                 value={user.whatsappId}
//                 onChange={handleInputChange}
//                 placeholder="WhatsApp ID"
//                 className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//               />
//               <input
//                 type="email"
//                 name="email"
//                 value={user.email}
//                 onChange={handleInputChange}
//                 placeholder="Email"
//                 className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//               />
//               <input
//                 type="text"
//                 name="emergencyContactInIndia"
//                 value={user.emergencyContactInIndia}
//                 onChange={handleInputChange}
//                 placeholder="Emergency Contact in India"
//                 className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//               />
//               <input
//                 type="text"
//                 name="addressInIndia"
//                 value={user.addressInIndia}
//                 onChange={handleInputChange}
//                 placeholder="Address in India"
//                 className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//               />
//               <input
//                 type="text"
//                 name="state"
//                 value={user.state}
//                 onChange={handleInputChange}
//                 placeholder="State"
//                 className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//               />
//               <input
//                 type="password"
//                 name="password"
//                 value={user.password || ""}
//                 onChange={handleInputChange}
//                 placeholder="New Password"
//                 className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//               />
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={user.confirmPassword || ""}
//                 onChange={handleInputChange}
//                 placeholder="Confirm Password"
//                 className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//               />
//               {passwordError && <p className="text-red-500">{passwordError}</p>}
//             </>
//           ) : (
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">
//                 {user.title} {user.firstname} {user.lastname}
//               </h1>
//               <p className="text-gray-600">
//                 Date of Birth: {new Date(user.Dob).toLocaleDateString()}
//               </p>
//               <p className="text-gray-600">Location: {user.location}</p>
//               <p className="text-gray-600">Address: {user.address}</p>
//               <p className="text-gray-600">WhatsApp: {user.whatsappId}</p>
//               <p className="text-gray-600">Email: {user.email}</p>
//               <p className="text-gray-600">
//                 Emergency Contact in India: {user.emergencyContactInIndia}
//               </p>
//               <p className="text-gray-600">
//                 Address in India: {user.addressInIndia}
//               </p>
//               <p className="text-gray-600">State: {user.state}</p>
//             </div>
//           )}
//         </div>
//       </div>
//       <div>
//         <h2 className="text-xl font-semibold text-gray-800 mb-2">
//           Family Members
//         </h2>
//         {user.familyMembers.map((member, index) => (
//           <FamilyMemberForm
//             key={index}
//             member={member}
//             index={index}
//             onChange={handleFamilyMemberChange}
//             onImageUpload={handleFamilyMemberImageUpload}
//             onRemove={removeFamilyMember}
//           />
//         ))}
//         {isEditing && (
//           <button
//             onClick={addFamilyMember}
//             className="bg-green-500 text-white px-4 py-2 rounded mt-4"
//           >
//             Add Family Member
//           </button>
//         )}
//       </div>
//       {isEditing && (
//         <button
//           onClick={handleSubmit}
//           disabled={isLoading}
//           className={`bg-green-500 text-white px-4 py-2 rounded mt-4 flex items-center justify-center ${
//             isLoading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           {isLoading ? (
//             <span className="flex items-center">
//               <svg
//                 className="animate-spin mr-2 h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//               Saving...
//             </span>
//           ) : (
//             <span className="flex items-center">
//               <Save className="mr-2" />
//               Save Changes
//             </span>
//           )}
//         </button>
//       )}
//       {apiError && <p className="text-red-500 mt-4">{apiError}</p>}
//     </div>
//   );
// }

// export default Profile;

// NO 2 WORKING
// import React, { useEffect, useState } from "react";
// import { Pencil, Save, X, Upload } from "lucide-react";
// import { useCurrentUser } from "../../context/AdminContext";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// // Define interfaces for FamilyMember and User
// interface FamilyMember {
//   firstName: string;
//   lastName: string;
//   relationship: string;
//   whatsappId: string;
//   emailId: string;
//   image: string;
//   gender: string;
//   bloodgroup: string;
// }

// interface User {
//   _id: string;
//   image: string;
//   firstname: string;
//   lastname: string;
//   title: string;
//   Dob: string;
//   location: string;
//   address: string;
//   whatsappId: string;
//   email: string;
//   emergencyContactInIndia: string;
//   districtInIndia: string;
//   addressInIndia: string;
//   state: string;
//   familyInLagos: boolean;
//   familyMembers: FamilyMember[];
//   password?: string;
//   confirmPassword?: string;
//   memberId?: string;
//   gender: string;
//   bloodgroup: string;
// }

// // Props for FamilyMemberForm
// interface FamilyMemberFormProps {
//   member: FamilyMember;
//   index: number;
//   onChange: (index: number, field: keyof FamilyMember, value: string) => void;
//   onImageUpload: (
//     index: number,
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => void;
//   onRemove: (index: number) => void;
// }

// // Reusable Family Member Form Component
// const FamilyMemberForm = ({
//   member,
//   index,
//   onChange,
//   onImageUpload,
//   onRemove,
// }: FamilyMemberFormProps) => (
//   <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
//     <div className="flex items-center mb-4">
//       <div className="relative">
//         <img
//           src={member.image || "https://via.placeholder.com/100"}
//           alt={`${member.firstName} ${member.lastName}`}
//           className="w-20 h-20 rounded-full object-cover mr-4"
//         />
//         <label
//           htmlFor={`family-member-image-upload-${index}`}
//           className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer"
//         >
//           <Upload />
//         </label>
//         <input
//           id={`family-member-image-upload-${index}`}
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={(e) => onImageUpload(index, e)}
//         />
//       </div>
//       <div>
//         <>
//           <input
//             type="text"
//             value={member.firstName}
//             onChange={(e) => onChange(index, "firstName", e.target.value)}
//             placeholder="First Name"
//             className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//           />
//           <input
//             type="text"
//             value={member.lastName}
//             onChange={(e) => onChange(index, "lastName", e.target.value)}
//             placeholder="Last Name"
//             className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//           />
//           <input
//             type="text"
//             value={member.relationship}
//             onChange={(e) => onChange(index, "relationship", e.target.value)}
//             placeholder="Relationship"
//             className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//           />
//           <input
//             type="text"
//             value={member.whatsappId}
//             onChange={(e) => onChange(index, "whatsappId", e.target.value)}
//             placeholder="WhatsApp ID"
//             className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//           />
//           <input
//             type="email"
//             value={member.emailId}
//             onChange={(e) => onChange(index, "emailId", e.target.value)}
//             placeholder="Email"
//             className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//           />
//         </>
//       </div>
//     </div>
//     {/* <button onClick={() => onRemove(index)} className="text-red-500 mt-2">
//       Remove Family Member
//     </button> */}
//   </div>
// );

// const API_URL = process.env.REACT_APP_CLIENT_URL;

// function Profile() {
//   const { currentUser } = useCurrentUser();
//   // Initialize user state with a default structure to avoid undefined errors
//   const [user, setUser] = useState<User>({
//     _id: "",
//     image: "",
//     firstname: "",
//     lastname: "",
//     title: "",
//     Dob: "",
//     location: "",
//     address: "",
//     whatsappId: "",
//     email: "",
//     emergencyContactInIndia: "",
//     districtInIndia: "",
//     addressInIndia: "",
//     state: "",
//     familyInLagos: false,
//     familyMembers: [],
//     password: "",
//     confirmPassword: "",
//     memberId: "",
//     gender: "",
//     bloodgroup: "",
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [passwordError, setPasswordError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [apiError, setApiError] = useState("");
//   const [isFetching, setIsFetching] = useState(true);

//   console.log("inity", user);
//   // Fetch user profile data on component mount
//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   // Fetch user profile data from the API
//   const fetchUserProfile = async () => {
//     setIsFetching(true);
//     try {
//       const response = await fetch(
//         `${API_URL}/api/v1/users/profile/${currentUser?.user._id}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch profile data.");
//       }
//       const { data } = await response.json();

//       setUser(data);
//     } catch (error: any) {
//       setApiError(error.message || "An error occurred while fetching data.");
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   // Handle input changes for user fields
//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setUser((prevUser) => ({ ...prevUser, [name]: value }));
//   };

//   // Handle image upload for the user
//   const handleUserImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     console.log("MU FILE", file);
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       console.log("my bloob", imageUrl);
//       setUser((prevUser) => ({ ...prevUser, image: imageUrl }));
//     }
//   };

//   // Handle input changes for family members
//   const handleFamilyMemberChange = (
//     index: number,
//     field: keyof FamilyMember,
//     value: string
//   ) => {
//     const updatedFamilyMembers = [...user.familyMembers];
//     updatedFamilyMembers[index][field] = value;
//     setUser((prevUser) => ({
//       ...prevUser,
//       familyMembers: updatedFamilyMembers,
//     }));
//   };

//   // Handle image upload for family members
//   const handleFamilyMemberImageUpload = (
//     index: number,
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       handleFamilyMemberChange(index, "image", imageUrl);
//     }
//   };

//   // Remove a family member
//   const removeFamilyMember = (index: number) => {
//     const updatedFamilyMembers = user.familyMembers.filter(
//       (_, i) => i !== index
//     );
//     setUser((prevUser) => ({
//       ...prevUser,
//       familyMembers: updatedFamilyMembers,
//     }));
//   };

//   // // Handle form submission
//   const handleSubmit = async () => {
//     if (
//       user.password &&
//       user.confirmPassword &&
//       user.password !== user.confirmPassword
//     ) {
//       setPasswordError("Passwords do not match.");
//       return;
//     }
//     setPasswordError("");
//     setIsLoading(true);
//     try {
//       const formData = new FormData();
//       Object.entries(user).forEach(([key, value]) => {
//         if (key === "familyMembers") {
//           formData.append(key, JSON.stringify(value));
//         } else if (key === "image" && typeof value !== "string") {
//           formData.append(key, value);
//         } else {
//           formData.append(key, value as string);
//         }
//       });

//       const response = await fetch(
//         `${API_URL}/api/v1/users/profile/${currentUser?.user._id}`,
//         {
//           method: "PUT",
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to save changes.");
//       }

//       toast.success("Profile updated successfully!");
//       setIsEditing(false);
//     } catch (error: any) {
//       setApiError(error.message || "An error occurred while saving changes.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Render loading state while fetching data
//   if (isFetching) {
//     return <div className="text-center">Loading...</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto bg-white border rounded-lg p-6">
//       <strong>MEMBERSHIP ID: {user.memberId}</strong>
//       <div className="mt-6 flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
//         <button
//           onClick={() => setIsEditing(!isEditing)}
//           className={`px-4 py-2 rounded ${
//             isEditing ? "bg-red-500 text-white" : "bg-blue-500 text-white"
//           } flex items-center`}
//         >
//           {isEditing ? <X className="mr-2" /> : <Pencil className="mr-2" />}
//           {isEditing ? "Cancel" : "Edit"}
//         </button>
//       </div>
//       <div className="flex flex-col md:flex-row items-center mb-6">
//         <div className="relative">
//           <img
//             src={user.image || "https://via.placeholder.com/100"}
//             alt={`${user.firstname} ${user.lastname}`}
//             className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
//           />
//           {isEditing && (
//             <label
//               htmlFor="user-image-upload"
//               className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer"
//             >
//               <Upload />
//             </label>
//           )}
//           <input
//             id="user-image-upload"
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={handleUserImageUpload}
//           />
//         </div>
//         <div>
//           {isEditing ? (
//             <>
//               <input
//                 type="text"
//                 name="firstname"
//                 value={user.firstname}
//                 onChange={handleInputChange}
//                 placeholder="First Name"
//                 className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//               />
//               <input
//                 type="text"
//                 name="lastname"
//                 value={user.lastname}
//                 onChange={handleInputChange}
//                 placeholder="Last Name"
//                 className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//               />
//               <input
//                 type="date"
//                 name="Dob"
//                 value={new Date(user.Dob).toISOString().split("T")[0]}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//               />
//               <input
//                 type="text"
//                 name="location"
//                 value={user.location}
//                 onChange={handleInputChange}
//                 placeholder="Location"
//                 className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//               />
//               <textarea
//                 name="address"
//                 value={user.address}
//                 onChange={handleInputChange}
//                 placeholder="Address"
//                 className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//               />
//               <input
//                 type="text"
//                 name="whatsappId"
//                 value={user.whatsappId}
//                 onChange={handleInputChange}
//                 placeholder="WhatsApp ID"
//                 className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//               />
//               <input
//                 type="email"
//                 name="email"
//                 value={user.email}
//                 onChange={handleInputChange}
//                 placeholder="Email"
//                 className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//               />
//               <input
//                 type="text"
//                 name="emergencyContactInIndia"
//                 value={user.emergencyContactInIndia}
//                 onChange={handleInputChange}
//                 placeholder="Emergency Contact in India"
//                 className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//               />
//               <input
//                 type="text"
//                 name="addressInIndia"
//                 value={user.addressInIndia}
//                 onChange={handleInputChange}
//                 placeholder="Address in India"
//                 className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//               />
//               <input
//                 type="text"
//                 name="state"
//                 value={user.state}
//                 onChange={handleInputChange}
//                 placeholder="State"
//                 className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//               />
//               <input
//                 type="password"
//                 name="password"
//                 value={user.password || ""}
//                 onChange={handleInputChange}
//                 placeholder="New Password"
//                 className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//               />
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={user.confirmPassword || ""}
//                 onChange={handleInputChange}
//                 placeholder="Confirm Password"
//                 className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
//               />
//               {passwordError && <p className="text-red-500">{passwordError}</p>}
//             </>
//           ) : (
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">
//                 {user.title} {user.firstname} {user.lastname}
//               </h1>
//               <p className="text-gray-600">
//                 Date of Birth: {new Date(user.Dob).toLocaleDateString()}
//               </p>
//               <p className="text-gray-600">Location: {user.location}</p>
//               <p className="text-gray-600">Address: {user.address}</p>
//               <p className="text-gray-600">WhatsApp: {user.whatsappId}</p>
//               <p className="text-gray-600">Email: {user.email}</p>
//               <p className="text-gray-600">
//                 Emergency Contact in India: {user.emergencyContactInIndia}
//               </p>
//               <p className="text-gray-600">
//                 Address in India: {user.addressInIndia}
//               </p>
//               <p className="text-gray-600">State: {user.state}</p>
//             </div>
//           )}
//         </div>
//       </div>
//       <div>
//         <h2 className="text-xl font-semibold text-gray-800 mb-2">
//           Family Members
//         </h2>
//         {user.familyMembers.map((member, index) => (
//           <FamilyMemberForm
//             key={index}
//             member={member}
//             index={index}
//             onChange={handleFamilyMemberChange}
//             onImageUpload={handleFamilyMemberImageUpload}
//             onRemove={removeFamilyMember}
//           />
//         ))}
//       </div>
//       {isEditing && (
//         <button
//           onClick={handleSubmit}
//           disabled={isLoading}
//           className={`bg-green-500 text-white px-4 py-2 rounded mt-4 flex items-center justify-center ${
//             isLoading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           {isLoading ? (
//             <span className="flex items-center">
//               <svg
//                 className="animate-spin mr-2 h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//               Saving...
//             </span>
//           ) : (
//             <span className="flex items-center">
//               <Save className="mr-2" />
//               Save Changes
//             </span>
//           )}
//         </button>
//       )}
//       {apiError && <p className="text-red-500 mt-4">{apiError}</p>}
//     </div>
//   );
// }

// export default Profile;
import React, { useEffect, useState } from "react";
import { Pencil, Save, X, Upload } from "lucide-react";
import { useCurrentUser } from "../../context/AdminContext";
import toast from "react-hot-toast";

// Define interfaces for FamilyMember and User
interface FamilyMember {
  firstName: string;
  lastName: string;
  relationship: string;
  whatsappId: string;
  emailId: string;
  image?: string;
  gender: string;
  bloodgroup: string;
}

interface User {
  _id: string;
  image: string;
  firstname: string;
  lastname: string;
  title: string;
  Dob: string;
  location: string;
  address: string;
  whatsappId: string;
  email: string;
  emergencyContactInIndia: string;
  districtInIndia: string;
  addressInIndia: string;
  state: string;
  familyInLagos: boolean;
  familyMembers: FamilyMember[];
  password?: string;
  confirmPassword?: string;
  memberId?: string;
  gender: string;
  bloodgroup: string;
}

// Props for FamilyMemberForm
interface FamilyMemberFormProps {
  member: FamilyMember;
  index: number;
  isEditing: boolean;
  onChange: (index: number, field: keyof FamilyMember, value: string) => void;
  onImageUpload: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onRemove: (index: number) => void;
  previewImages: { [key: number]: string };
}

// Reusable Family Member Form Component
const FamilyMemberForm = ({
  member,
  index,
  isEditing,
  onChange,
  onImageUpload,
  onRemove,
  previewImages,
}: FamilyMemberFormProps) => (
  <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
    <div className="flex items-center mb-4">
      <div className="relative">
        <img
          src={
            previewImages[index] ||
            member.image ||
            "https://via.placeholder.com/100"
          }
          alt={`${member.firstName} ${member.lastName}`}
          className="w-20 h-20 rounded-full object-cover mr-4"
        />
        {isEditing && (
          <>
            <label
              htmlFor={`family-member-image-upload-${index}`}
              className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer"
            >
              <Upload />
            </label>
            <input
              id={`family-member-image-upload-${index}`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onImageUpload(index, e)}
            />
          </>
        )}
      </div>
      <div>
        {isEditing ? (
          <>
            <input
              type="text"
              value={member.firstName}
              onChange={(e) => onChange(index, "firstName", e.target.value)}
              placeholder="First Name"
              className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
            />
            <input
              type="text"
              value={member.lastName}
              onChange={(e) => onChange(index, "lastName", e.target.value)}
              placeholder="Last Name"
              className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
            />
            <input
              type="text"
              value={member.relationship}
              onChange={(e) => onChange(index, "relationship", e.target.value)}
              placeholder="Relationship"
              className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
            />
            <input
              type="text"
              value={member.whatsappId}
              onChange={(e) => onChange(index, "whatsappId", e.target.value)}
              placeholder="WhatsApp ID"
              className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
            />
            <input
              type="email"
              value={member.emailId}
              onChange={(e) => onChange(index, "emailId", e.target.value)}
              placeholder="Email"
              className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
            />
          </>
        ) : (
          <div>
            <h3 className="text-lg font-medium text-gray-800">
              {member.firstName} {member.lastName}
            </h3>
            <p className="text-gray-600">Relationship: {member.relationship}</p>
            <p className="text-gray-600">WhatsApp: {member.whatsappId}</p>
            <p className="text-gray-600">Email: {member.emailId}</p>
          </div>
        )}
      </div>
    </div>
    {isEditing && (
      <button onClick={() => onRemove(index)} className="text-red-500 mt-2">
        Remove Family Member
      </button>
    )}
  </div>
);

const API_URL = process.env.REACT_APP_CLIENT_URL;

function Profile() {
  const { currentUser } = useCurrentUser();
  // Initialize user state with a default structure to avoid undefined errors
  const [user, setUser] = useState<User>({
    _id: "",
    image: "",
    firstname: "",
    lastname: "",
    title: "",
    Dob: "",
    location: "",
    address: "",
    whatsappId: "",
    email: "",
    emergencyContactInIndia: "",
    districtInIndia: "",
    addressInIndia: "",
    state: "",
    familyInLagos: false,
    familyMembers: [],
    password: "",
    confirmPassword: "",
    memberId: "",
    gender: "",
    bloodgroup: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  // Add states for file uploads and preview images
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string>("");
  const [familyMemberImageFiles, setFamilyMemberImageFiles] = useState<{
    [key: number]: File;
  }>({});
  const [familyMemberPreviews, setFamilyMemberPreviews] = useState<{
    [key: number]: string;
  }>({});

  // Fetch user profile data on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Clean up preview URLs when component unmounts
  useEffect(() => {
    return () => {
      // Revoke object URLs to avoid memory leaks
      if (profilePreview && profilePreview.startsWith("blob:")) {
        URL.revokeObjectURL(profilePreview);
      }

      Object.values(familyMemberPreviews).forEach((url) => {
        if (url && url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [profilePreview, familyMemberPreviews]);

  // Fetch user profile data from the API
  const fetchUserProfile = async () => {
    setIsFetching(true);
    try {
      const response = await fetch(
        `${API_URL}/api/v1/users/profile/${currentUser?.user._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch profile data.");
      }
      const { data } = await response.json();

      setUser(data);
    } catch (error: any) {
      setApiError(error.message || "An error occurred while fetching data.");
    } finally {
      setIsFetching(false);
    }
  };

  // Handle input changes for user fields
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Handle image upload for the user with preview
  const handleUserImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setProfilePreview(previewUrl);
      setProfileImageFile(file);
    }
  };

  // Handle input changes for family members
  const handleFamilyMemberChange = (
    index: number,
    field: keyof FamilyMember,
    value: string
  ) => {
    const updatedFamilyMembers = [...user.familyMembers];
    updatedFamilyMembers[index][field] = value;
    setUser((prevUser) => ({
      ...prevUser,
      familyMembers: updatedFamilyMembers,
    }));
  };

  // Handle image upload for family members with preview
  const handleFamilyMemberImageUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);

      // Store preview URL
      setFamilyMemberPreviews((prev) => ({
        ...prev,
        [index]: previewUrl,
      }));

      // Store file for upload
      setFamilyMemberImageFiles((prev) => ({
        ...prev,
        [index]: file,
      }));
    }
  };

  // Add a new family member
  // const addFamilyMember = () => {
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     familyMembers: [
  //       ...prevUser.familyMembers,
  //       {
  //         firstName: "",
  //         lastName: "",
  //         relationship: "",
  //         whatsappId: "",
  //         emailId: "",
  //         image: "",
  //         gender: "",
  //         bloodgroup: "",
  //       },
  //     ],
  //   }));
  // };

  // Remove a family member
  const removeFamilyMember = (index: number) => {
    const updatedFamilyMembers = user.familyMembers.filter(
      (_, i) => i !== index
    );
    setUser((prevUser) => ({
      ...prevUser,
      familyMembers: updatedFamilyMembers,
    }));

    // Clean up any preview and file for this index
    if (familyMemberPreviews[index]) {
      URL.revokeObjectURL(familyMemberPreviews[index]);
      setFamilyMemberPreviews((prev) => {
        const updated = { ...prev };
        delete updated[index];
        return updated;
      });
    }

    setFamilyMemberImageFiles((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  // Reset edit state and form
  const cancelEditing = () => {
    setIsEditing(false);

    // Reset all previews
    if (profilePreview) {
      URL.revokeObjectURL(profilePreview);
      setProfilePreview("");
    }

    Object.values(familyMemberPreviews).forEach((url) => {
      if (url) URL.revokeObjectURL(url);
    });

    setFamilyMemberPreviews({});
    setFamilyMemberImageFiles({});
    setProfileImageFile(null);

    // Refetch to restore original data
    fetchUserProfile();
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (
      user.password &&
      user.confirmPassword &&
      user.password !== user.confirmPassword
    ) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordError("");
    setIsLoading(true);
    try {
      const formData = new FormData();

      // Add user data to FormData
      Object.entries(user).forEach(([key, value]) => {
        if (key === "familyMembers") {
          // We'll handle this separately
        } else if (key !== "image" || (!profileImageFile && key === "image")) {
          // Only add the image field if we're not uploading a new file
          formData.append(key, value as string);
        }
      });

      // Add profile image if selected
      if (profileImageFile) {
        formData.append("image", profileImageFile);
      }

      // Process family members
      const processedFamilyMembers = user.familyMembers.map((member, index) => {
        // Clone the member to avoid modifying the original
        const processedMember = { ...member };

        // Don't include the image field if we have a file to upload for this member
        // The backend will receive the file separately
        if (familyMemberImageFiles[index]) {
          delete processedMember.image;
        }

        return processedMember;
      });

      formData.append("familyMembers", JSON.stringify(processedFamilyMembers));

      // Add family member images if any
      Object.entries(familyMemberImageFiles).forEach(([index, file]) => {
        formData.append(`familyMemberImage_${index}`, file);
      });

      // Send the request
      const response = await fetch(
        `${API_URL}/api/v1/users/profile/${currentUser?.user._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save changes.");
      }

      toast.success("Profile updated successfully!");
      setIsEditing(false);

      // Clean up preview URLs
      if (profilePreview) {
        URL.revokeObjectURL(profilePreview);
      }

      Object.values(familyMemberPreviews).forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });

      // Reset files and previews
      setProfilePreview("");
      setFamilyMemberPreviews({});
      setFamilyMemberImageFiles({});
      setProfileImageFile(null);

      // Refetch to get updated data from server
      fetchUserProfile();
    } catch (error: any) {
      setApiError(error.message || "An error occurred while saving changes.");
    } finally {
      setIsLoading(false);
    }
  };

  // Render loading state while fetching data
  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white border rounded-lg p-6">
      <strong>MEMBERSHIP ID: {user.memberId}</strong>
      <div className="mt-6 flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
        <button
          onClick={() => (isEditing ? cancelEditing() : setIsEditing(true))}
          className={`px-4 py-2 rounded ${
            isEditing ? "bg-red-500 text-white" : "bg-blue-500 text-white"
          } flex items-center`}
        >
          {isEditing ? <X className="mr-2" /> : <Pencil className="mr-2" />}
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>
      <div className="flex flex-col md:flex-row items-center mb-6">
        <div className="relative">
          <img
            src={
              profilePreview || user.image || "https://via.placeholder.com/100"
            }
            alt={`${user.firstname} ${user.lastname}`}
            className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
          />
          {isEditing && (
            <>
              <label
                htmlFor="user-image-upload"
                className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer"
              >
                <Upload />
              </label>
              <input
                id="user-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUserImageUpload}
              />
            </>
          )}
        </div>
        <div>
          {isEditing ? (
            <>
              <input
                type="text"
                name="firstname"
                value={user.firstname}
                onChange={handleInputChange}
                placeholder="First Name"
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              />
              <input
                type="text"
                name="lastname"
                value={user.lastname}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              />
              <input
                type="date"
                name="Dob"
                value={new Date(user.Dob).toISOString().split("T")[0]}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              />
              <input
                type="text"
                name="location"
                value={user.location}
                onChange={handleInputChange}
                placeholder="Location"
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              />
              <textarea
                name="address"
                value={user.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              />
              <input
                type="text"
                name="whatsappId"
                value={user.whatsappId}
                onChange={handleInputChange}
                placeholder="WhatsApp ID"
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              />
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              />
              <input
                type="text"
                name="emergencyContactInIndia"
                value={user.emergencyContactInIndia}
                onChange={handleInputChange}
                placeholder="Emergency Contact in India"
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              />
              <input
                type="text"
                name="addressInIndia"
                value={user.addressInIndia}
                onChange={handleInputChange}
                placeholder="Address in India"
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              />
              <input
                type="text"
                name="state"
                value={user.state}
                onChange={handleInputChange}
                placeholder="State"
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              />
              <input
                type="password"
                name="password"
                value={user.password || ""}
                onChange={handleInputChange}
                placeholder="New Password"
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              />
              <input
                type="password"
                name="confirmPassword"
                value={user.confirmPassword || ""}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              />
              {passwordError && <p className="text-red-500">{passwordError}</p>}
            </>
          ) : (
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {user.title} {user.firstname} {user.lastname}
              </h1>
              <p className="text-gray-600">
                Date of Birth: {new Date(user.Dob).toLocaleDateString()}
              </p>
              <p className="text-gray-600">Location: {user.location}</p>
              <p className="text-gray-600">Address: {user.address}</p>
              <p className="text-gray-600">WhatsApp: {user.whatsappId}</p>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">
                Emergency Contact in India: {user.emergencyContactInIndia}
              </p>
              <p className="text-gray-600">
                Address in India: {user.addressInIndia}
              </p>
              <p className="text-gray-600">State: {user.state}</p>
            </div>
          )}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Family Members
        </h2>
        {user.familyMembers.map((member, index) => (
          <FamilyMemberForm
            key={index}
            member={member}
            index={index}
            isEditing={isEditing}
            onChange={handleFamilyMemberChange}
            onImageUpload={handleFamilyMemberImageUpload}
            onRemove={removeFamilyMember}
            previewImages={familyMemberPreviews}
          />
        ))}
        {/* {isEditing && (
          <button
            onClick={addFamilyMember}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Add Family Member
          </button>
        )} */}
      </div>
      {isEditing && (
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`bg-green-500 text-white px-4 py-2 rounded mt-4 flex items-center justify-center ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </span>
          ) : (
            <span className="flex items-center">
              <Save className="mr-2" />
              Save Changes
            </span>
          )}
        </button>
      )}
      {apiError && <p className="text-red-500 mt-4">{apiError}</p>}
    </div>
  );
}

export default Profile;
