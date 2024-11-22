import { CircleUser } from "lucide-react";
import React from "react";

function MemberStats() {
  return (
    <div className="flex gap-4 w-full bg-[#F5F7FA] px-8 py-8 rounded-lg">
      <CircleUser />
      <div>
        <h3>All Members</h3>
        <span>600</span>
      </div>
    </div>
  );
}

export default MemberStats;
