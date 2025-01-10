// import React, { useState } from "react";
// import { FAKE_APPLICANTS } from "../../../util/data";
// import Button from "../../../components/Button/Button";
// import { ChevronDown, Delete, DeleteIcon, Trash } from "lucide-react";
// import TextInput from "../../../components/Input/TextInput";
// function ApproveEvent() {
//   const [isShow, setIsShow] = useState<{ [key: string]: boolean }>({});

//   const handleShow = (email: string) => {
//     setIsShow((prevState) => ({
//       ...prevState,
//       [email]: !prevState[email],
//     }));
//   };
//   return (
//     <main className="space-y-6">
//       <div className="flex justify-end">
//         <TextInput
//           type="text"
//           placeholderText="Serach Applicant by email"
//           handleInputChange={() => console.log("")}
//           className="w-1/3"
//         />
//       </div>
//       <div className="space-y-4">
//         {FAKE_APPLICANTS.map((applicant) => {
//           return (
//             <div>
//               <div className="flex justify-between items-center bg-white border border-slate-200 rounded px-2 h-14">
//                 <strong>{applicant.full_name}</strong>
//                 <div className="flex items-center space-x-4">
//                   <Button text="Approve" className="px-2 h-10" />
//                   <button className="flex items-center border border-slate-950 rounded-lg  px-2 h-10">
//                     Delete
//                     <Trash />
//                   </button>
//                   <button
//                     className=" cursor-pointer"
//                     onClick={() => handleShow(applicant.email)}
//                   >
//                     <ChevronDown />
//                   </button>
//                 </div>
//               </div>
//               {/* show application info */}

//               {isShow[applicant.email] && (
//                 <div className="bg-white shadow rounded px-2 py-4 space-y-6">
//                   <h2>Registered details</h2>
//                   <table className="border-collapse border border-slate-400 table-auto w-full text-sm text-left text-gray-500">
//                     <thead className="bg-gray-100 text-gray-700 uppercase">
//                       <tr>
//                         <th className="border border-slate-300 px-4 py-2">
//                           Full Name
//                         </th>
//                         <th className="border border-slate-300 px-4 py-2">
//                           Email
//                         </th>
//                         <th className="border border-slate-300 px-4 py-2">
//                           Phone Number
//                         </th>
//                         <th className="border border-slate-300 px-4 py-2">
//                           WhatsApp Number
//                         </th>
//                         <th className="border border-slate-300 px-4 py-2">
//                           Number of family members attending
//                         </th>
//                         <th className="border border-slate-300 px-4 py-2">
//                           Family members
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                       <tr className="hover:bg-gray-50">
//                         <td className="border border-slate-300 px-4 py-2">
//                           John Doe
//                         </td>
//                         <td className="border border-slate-300 px-4 py-2">
//                           john@example.com
//                         </td>
//                         <td className="border border-slate-300 px-4 py-2">
//                           123-456-7890
//                         </td>
//                         <td className="border border-slate-300 px-4 py-2">
//                           123-456-7890
//                         </td>
//                         <td className="border border-slate-300 px-4 py-2">3</td>
//                         <td className="border border-slate-300 px-4 py-2">
//                           Jane, Alice, Bob
//                         </td>
//                       </tr>
//                       <tr className="hover:bg-gray-50">
//                         <td className="border border-slate-300 px-4 py-2">
//                           Alice Smith
//                         </td>
//                         <td className="border border-slate-300 px-4 py-2">
//                           alice@example.com
//                         </td>
//                         <td className="border border-slate-300 px-4 py-2">
//                           987-654-3210
//                         </td>
//                         <td className="border border-slate-300 px-4 py-2">
//                           987-654-3210
//                         </td>
//                         <td className="border border-slate-300 px-4 py-2">2</td>
//                         <td className="border border-slate-300 px-4 py-2">
//                           Tom, Jerry
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//               {/* show application info */}
//             </div>
//           );
//         })}
//       </div>
//     </main>
//   );
// }

// export default ApproveEvent;

import React, { useState } from "react";
import { FAKE_APPLICANTS } from "../../../util/data";
import Button from "../../../components/Button/Button";
import { ChevronDown, Trash } from "lucide-react";
import TextInput from "../../../components/Input/TextInput";

function ApproveEvent() {
  const [isShow, setIsShow] = useState<{ [key: string]: boolean }>({});
  const [searchQuery, setSearchQuery] = useState(""); // For search
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const itemsPerPage = 5; // Number of applicants per page

  const handleShow = (email: string) => {
    setIsShow((prevState) => ({
      ...prevState,
      [email]: !prevState[email],
    }));
  };

  // Filter applicants based on search query
  const filteredApplicants = FAKE_APPLICANTS.filter((applicant) =>
    applicant.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalItems = filteredApplicants.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApplicants = filteredApplicants.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <main className="space-y-6">
      {/* Search Input */}
      <div className="flex justify-end">
        <TextInput
          type="text"
          placeholderText="Search Applicant by email"
          handleInputChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/3"
        />
      </div>

      {/* Applicants List */}
      <div className="space-y-4">
        {paginatedApplicants.map((applicant) => (
          <div key={applicant.email}>
            <div className="flex justify-between items-center bg-white border border-slate-200 rounded px-2 h-14">
              <strong>{applicant.full_name}</strong>
              <div className="flex items-center space-x-4">
                <Button text="Approve" className="px-2 h-10" />
                <button className="flex items-center border border-slate-950 rounded-lg px-2 h-10">
                  Delete
                  <Trash />
                </button>
                <button
                  className="cursor-pointer"
                  onClick={() => handleShow(applicant.email)}
                >
                  <ChevronDown />
                </button>
              </div>
            </div>

            {/* Show Application Info */}
            {isShow[applicant.email] && (
              <div className="bg-white shadow rounded px-2 py-4 space-y-6">
                <h2>Registered Details</h2>
                <table className="border-collapse border border-slate-400 table-auto w-full text-sm text-left text-gray-500">
                  <thead className="bg-gray-100 text-gray-700 uppercase">
                    <tr>
                      <th className="border border-slate-300 px-4 py-2">
                        Full Name
                      </th>
                      <th className="border border-slate-300 px-4 py-2">
                        Email
                      </th>
                      <th className="border border-slate-300 px-4 py-2">
                        Phone Number
                      </th>
                      <th className="border border-slate-300 px-4 py-2">
                        WhatsApp Number
                      </th>
                      <th className="border border-slate-300 px-4 py-2">
                        Number of family members attending
                      </th>
                      <th className="border border-slate-300 px-4 py-2">
                        Family members
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="border border-slate-300 px-4 py-2">
                        John Doe
                      </td>
                      <td className="border border-slate-300 px-4 py-2">
                        john@example.com
                      </td>
                      <td className="border border-slate-300 px-4 py-2">
                        123-456-7890
                      </td>
                      <td className="border border-slate-300 px-4 py-2">
                        123-456-7890
                      </td>
                      <td className="border border-slate-300 px-4 py-2">3</td>
                      <td className="border border-slate-300 px-4 py-2">
                        Jane, Alice, Bob
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-slate-300 px-4 py-2">
                        Alice Smith
                      </td>
                      <td className="border border-slate-300 px-4 py-2">
                        alice@example.com
                      </td>
                      <td className="border border-slate-300 px-4 py-2">
                        987-654-3210
                      </td>
                      <td className="border border-slate-300 px-4 py-2">
                        987-654-3210
                      </td>
                      <td className="border border-slate-300 px-4 py-2">2</td>
                      <td className="border border-slate-300 px-4 py-2">
                        Tom, Jerry
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`px-3 py-1 border rounded ${
            currentPage === 1
              ? "cursor-not-allowed text-gray-400"
              : "hover:bg-gray-200"
          }`}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`px-3 py-1 border rounded ${
            currentPage === totalPages
              ? "cursor-not-allowed text-gray-400"
              : "hover:bg-gray-200"
          }`}
        >
          Next
        </button>
      </div>
    </main>
  );
}

export default ApproveEvent;
