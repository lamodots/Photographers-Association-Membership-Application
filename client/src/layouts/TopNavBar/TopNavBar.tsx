import { BellRing, PanelLeftClose } from "lucide-react";
import React, { useState } from "react";
import Avatar from "../../components/Avatar/Avatar";
import Popup from "../../components/Popup/Popup";

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
  return (
    <nav className=" bg-[#F5F7FA] flex items-center justify-between px-8 h-32  w-full ">
      <div className="flex items-center gap-8">
        <div>
          <PanelLeftClose
            onClick={handleToggleSideBar}
            className=" cursor-pointer"
          />
        </div>
        <span>Hello Lamodot Welcome !</span>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-1">
          <BellRing className=" cursor-pointer" />
          <span>Announcement</span>
        </div>
        {/* avatraer */}
        <Avatar
          className="w-12 h-12"
          handlShowPopup={handlePopUp}
          showMorePopUp={showMorePopUp}
        />
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
