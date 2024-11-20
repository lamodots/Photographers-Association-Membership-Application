import { CircleUser, LogOut } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

type PopupProp = {
  className?: string;
  handlShowPopup?: () => void;
};
function Popup({ className, handlShowPopup }: PopupProp) {
  return (
    <div className="px-4 py-6 rounded-lg flex flex-col gap-6 bg-[#FFFFFF] shadow-lg">
      <div
        className="flex items-center gap-1 cursor-pointer hover:text-[#5BD3CF]"
        onClick={handlShowPopup}
      >
        <LogOut size={24} />
        <span>Logout</span>
      </div>
      <div
        className="flex items-center gap-1 cursor-pointer hover:text-[#5BD3CF] "
        onClick={handlShowPopup}
      >
        <CircleUser size={24} />
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
}

export default Popup;
