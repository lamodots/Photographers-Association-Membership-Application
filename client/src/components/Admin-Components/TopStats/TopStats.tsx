import { CircleDollarSign } from "lucide-react";
import { ComponentProps, PropsWithChildren, ReactNode } from "react";
import React from "react";
interface TopStatsProps {
  title: string;
  stats: string;
  icon: ReactNode;
}
function TopStats({ title, stats, icon }: TopStatsProps) {
  return (
    <div className="w-full flex gap-2">
      {icon}
      <div>
        <h3 className="text-[#1A4F83] text-sm">{title}</h3>
        <span className="text-[#$125,500] text-2xl text-[#7598BB]">
          ${stats}
        </span>
      </div>
    </div>
  );
}

export default TopStats;
