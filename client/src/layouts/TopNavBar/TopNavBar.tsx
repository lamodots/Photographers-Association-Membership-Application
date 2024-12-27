import { ArrowDown, BellRing, ChevronDown, PanelLeftClose } from "lucide-react";
import React, { useState } from "react";
import Avatar from "../../components/Avatar/Avatar";
import Popup from "../../components/Popup/Popup";
import { Link } from "react-router-dom";
import NotificationComponent from "../../components/NotificationComponent/NotificationComponent";
import { useCurrentUser } from "../../context/AdminContext";

type TopNavBarProp = {
  handleToggleSideBar: () => void;
  handlePopUp?: () => void;
  showMorePopUp?: boolean;
};
function TopNavBar({
  handleToggleSideBar,
  handlePopUp,
  showMorePopUp,
}: TopNavBarProp) {
  const { currentUser } = useCurrentUser();
  return (
    <nav className=" bg-[#F5F7FA] flex items-center justify-between px-8 h-[114px]  w-full ">
      <div className="flex items-center gap-8">
        <div>
          <PanelLeftClose
            onClick={handleToggleSideBar}
            className=" cursor-pointer"
            size={24}
          />
        </div>
        <span className="hidden md:inline-block capitalize">
          Hello {currentUser?.firstname}, Welcome !
        </span>
      </div>
      <div className="flex items-center gap-6 cursor-pointer">
        <Link to="/announcement" className="flex items-center gap-1">
          <BellRing className=" cursor-pointer" size={24} />
          <span className=" hidden md:inline-block">Announcement</span>
          {/* <NotificationComponent /> */}
        </Link>

        {/* avatraer */}
        <div className="flex items-center gap-1">
          <Avatar
            className="w-12 h-12"
            handlShowPopup={handlePopUp}
            showMorePopUp={showMorePopUp}
          />
          <ChevronDown
            size={14}
            onClick={handlePopUp}
            className=" cursor-pointer"
            color="#537BA2"
          />
        </div>
      </div>
      {/* {showMorePopUp && (
        <div className=" absolute right-10 top-24">
          <Popup />
        </div>
      )} */}
    </nav>
  );
}

export default TopNavBar;
