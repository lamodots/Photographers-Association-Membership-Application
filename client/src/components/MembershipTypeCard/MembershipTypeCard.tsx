import { Handshake } from "lucide-react";
import React from "react";

interface MembershipTypeCardProps {
  cardTitle: string;
  subScriptionInfo: string;
  children?: React.ReactNode;
}
function MembershipTypeCard({
  children,
  cardTitle,
  subScriptionInfo,
}: MembershipTypeCardProps) {
  return (
    <div className="flex space-x-3 p-8 bg-white rounded-lg border border-[#C4DCF3] w-full">
      <div className="rounded-full bg-[#F4F6F7] h-10 w-10 flex items-center justify-center">
        {children ? (
          <span className=" text-[#A5BCD4]">{children}</span>
        ) : (
          <Handshake size={24} color="#A5BCD4" />
        )}
      </div>
      <div>
        <h2 className="text-[#1A4F83] text-sm font-bold">{cardTitle}</h2>
        <small className="text-[#7598BB] text-xl">{subScriptionInfo}</small>
      </div>
    </div>
  );
}

export default MembershipTypeCard;
