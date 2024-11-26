import { CircleUser } from "lucide-react";
import React from "react";

function MemberStats() {
  return (
    <div className="flex gap-4 w-full bg-[#F5F7FA] px-8 py-8 rounded-lg">
      <CircleUser color="#7598BB" />
      <div>
        <h3 className="text-sm text-[#1A4F83] font-bold">All Members</h3>
        <span className="text-xl text-[#7598BB]">600</span>
      </div>
    </div>
  );
}

export default MemberStats;
