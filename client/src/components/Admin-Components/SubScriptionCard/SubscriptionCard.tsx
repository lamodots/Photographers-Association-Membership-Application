import React from "react";
import { CircleUser } from "lucide-react";
function SubscriptionCard({
  subType,
  amount,
  numUsers,
}: {
  subType?: string;
  amount?: number;
  numUsers?: number;
}) {
  return (
    <div className="compoenet w-full bg-white rounded-lg p-6 shadow-sm ">
      <h3 className="text-sm font-bold text-[#1A4F83]">{subType}</h3>
      <div className="flex justify-between items-center mt-8">
        <small className="text-xl text-[#7598BB]">
          {subType && "₦"}
          {amount}
        </small>
        <span className=" flex justify-between items-center space-x-2">
          {subType && <CircleUser color="#A5BCD4" />}
          <small className="text-xl text-[#7598BB]">{numUsers}</small>
        </span>
      </div>
    </div>
  );
}

export default SubscriptionCard;
