import { ChevronLeft, Filter } from "lucide-react";
import React, { useEffect, useState } from "react";
import TextInput from "../../components/Input/TextInput";
import NewMemberCard from "../../components/Admin-Components/NewMemberCard/NewMemberCard";
import { FAKE_MEMBERS } from "../../util/data";
import { Link, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const API_URL = process.env.REACT_APP_CLIENT_URL;

type SocialLink = {
  facebook?: string;
  linkedIn?: string;
};
type Interest = string[];
interface UserProps {
  _id: string;
  image: string;
  firstname: string;
  lastname: string;
  email: string;
  Dob: string;
  phone: string;
  location: string;
  address: string;
  aboutuser: string;
  social: SocialLink[];
  interest: Interest;
}
function Members() {
  // const [userData, setUserData] = useState(FAKE_MEMBERS);
  const [userData, setUserData] = useState<UserProps[]>([]);
  const [text, setText] = useState("");
  const [showPopup, setShowPopUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 3;
  console.log("user data", userData);
  // Filter user base on search query
  const filterUser = userData.filter(
    (user: any) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.firstname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // pagination
  const totalItems = filterUser.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filterUser.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/secure/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Error fetching data");
      }

      const { users } = await res.json();

      setUserData(users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <main>
      <header>
        <h1 className="text-2xl text-[#212529] font-bold">Memebers List</h1>
        <div className="flex justify-end items-center mt-10">
          <div className="flex  justify-between items-center gap-4 w-full max-w-[600px] mt-8">
            <div className="left w-full">
              <TextInput
                className=" w-full"
                type="text"
                placeholderText="Search member"
                handleInputChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* the popup */}
            <div>
              <div
                className="right py-3 px-2 bg-white rounded-lg shadow-lg flex items-center justify-center cursor-pointer"
                onClick={() => setShowPopUp(!showPopup)}
              >
                <Filter />
                <small>Filter</small>
              </div>

              {showPopup && (
                <div className=" relative z-50">
                  <ul className="absolute right-1 rounded-lg bg-white p-6 w-[162px] mt-1 flex flex-col gap-6">
                    <li
                      className="text-sm cursor-pointer"
                      onClick={() => setShowPopUp(!showPopup)}
                    >
                      Normal Memeber{" "}
                    </li>
                    <li
                      className="text-sm cursor-pointer"
                      onClick={() => setShowPopUp(!showPopup)}
                    >
                      Life time Member
                    </li>
                    <li
                      className="text-sm cursor-pointer"
                      onClick={() => setShowPopUp(!showPopup)}
                    >
                      Honary members
                    </li>
                  </ul>
                </div>
              )}
            </div>
            {/* the popup end */}
          </div>
        </div>
      </header>
      <section className="py-8 space-y-24">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {paginatedUsers.map((user) => {
            console.log("hey", user);
            return (
              <Link
                to={`/members/details/${user._id}`}
                key={user._id}
                state={user}
              >
                <NewMemberCard
                  name={user.firstname}
                  image={user.image}
                  email={user.email}
                />
              </Link>
            );
          })}
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
      </section>
    </main>
  );
}

export default Members;
