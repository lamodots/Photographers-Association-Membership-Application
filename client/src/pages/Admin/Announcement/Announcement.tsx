import React, { useState } from "react";
import { Filter } from "lucide-react";
import TextInput from "../../../components/Input/TextInput";
import NewMemberCard from "../../../components/Admin-Components/NewMemberCard/NewMemberCard";
import { FAKE_MEMBERS, FAKE_ANNOUNCEMENTS } from "../../../util/data";
import { Link } from "react-router-dom";
import FilterPopUp from "../../../components/FilterPopUp/FilterPopUp";
import AnnouncementList from "../../../components/AnnouncementsList/AnnouncementList";

function Announcement() {
  const [userData, setUserData] = useState("");
  const [iputText, setInputText] = useState("");
  const [showPopup, setShowPopUp] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const filteredAnnouncements = FAKE_ANNOUNCEMENTS.filter(
  //   (announcement) =>
  //     announcement.title.toLowerCase().includes(iputText.toLowerCase()) ||
  //     announcement.body.toLowerCase().includes(iputText.toLowerCase())
  // );

  // Funcrionality for flter and search
  const filteredAnnouncements = FAKE_ANNOUNCEMENTS.filter((announcement) => {
    const matchText =
      announcement.title.toLowerCase().includes(iputText.toLowerCase()) ||
      announcement.body.toLowerCase().includes(iputText.toLowerCase());

    const matchDate =
      (!startDate || new Date(announcement.date) >= new Date(startDate)) &&
      (!endDate || new Date(announcement.date) <= new Date(endDate));
    return matchText && matchDate;
  });

  return (
    <main>
      <header>
        <h1 className="text-2xl text-[#212529] font-bold">Announcements</h1>
        <div className="flex  justify-between items-center gap-4 w-full max-w-[600px] mt-8">
          <div className="left w-full">
            <TextInput
              className=" w-full"
              type="text"
              placeholderText="Search Announcements"
              name="search-annoucement"
              value={iputText}
              handleInputChange={(e) => setInputText(e.target.value)}
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

            {showPopup && <FilterPopUp />}
          </div>
          {/* the popup end */}
        </div>
      </header>
      <section className="py-8">
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3">
          {filteredAnnouncements.map((announcement) => {
            return (
              <Link to="/secure/announcement/details/1" key={announcement.id}>
                <AnnouncementList
                  announcement={announcement.body}
                  title={announcement.title}
                />
              </Link>
            );
          })}
        </div>
        <div className="flex items-center space-x-4 pt-10">
          <span>1 of 10</span>
          <ul className="space-x-2">
            <li className=" inline">
              <Link
                to={""}
                className="py-2 px-3 rounded-lg text-white font-semibold bg-[#2067A9]"
              >
                1
              </Link>
            </li>
            <li className=" inline">
              <Link
                to={""}
                className="py-2 px-3 rounded-lg text-white font-semibold bg-[#2067A9]"
              >
                2
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default Announcement;
