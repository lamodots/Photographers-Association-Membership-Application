import { Filter } from "lucide-react";
import React, { useState } from "react";
import TextInput from "../../../components/Input/TextInput";
import NewMemberCard from "../../../components/Admin-Components/NewMemberCard/NewMemberCard";
import { FAKE_MEMBERS } from "../../../util/data";
import { Link } from "react-router-dom";

function Members() {
  const [userData, setUserData] = useState(FAKE_MEMBERS);
  const [text, setText] = useState("");
  const [showPopup, setShowPopUp] = useState(false);

  return (
    <main>
      <header>
        <h1 className="text-2xl text-[#212529] font-bold">
          LASPPAN Memebers List
        </h1>
        <div className="flex  justify-between items-center gap-4 w-full max-w-[600px] mt-8">
          <div className="left w-full">
            <TextInput
              className=" w-full"
              type="text"
              placeholderText="Search member"
              name=""
              value={""}
              handleInputChange={(e) => setText(e.target.value)}
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
      </header>
      <section className="py-8">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {userData.map((user) => {
            return (
              <Link to="/secure/members/details/1" key={user.id}>
                <NewMemberCard
                  name={user.name}
                  image={user.photo}
                  email={user.email}
                />
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Members;
