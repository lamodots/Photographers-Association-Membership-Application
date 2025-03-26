import { CircleUser } from "lucide-react";

function MemberStats({ title, stats }: { title?: string; stats?: string }) {
  return (
    <div className=" flex-col md:flex-row flex gap-4 w-full bg-[#F5F7FA] px-8 py-8 rounded-lg">
      <CircleUser color="#7598BB" />
      <div>
        <h3 className="text-sm text-[#1A4F83] font-bold">{title}</h3>
        <span className="text-xl text-[#7598BB]">{stats}</span>
      </div>
    </div>
  );
}

export default MemberStats;
