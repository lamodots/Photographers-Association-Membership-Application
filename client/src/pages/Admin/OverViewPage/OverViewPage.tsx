import React from "react";
import TextInput from "../../../components/Input/TextInput";
import TopStats from "../../../components/Admin-Components/TopStats/TopStats";
import { CircleDollarSign, Pen, RefreshCw, RotateCcw } from "lucide-react";
import MemberStats from "../../../components/Admin-Components/MemberStats/MemberStats";
import Chart from "../../../components/Admin-Components/MemberStats/Chart";

function OverViewPage() {
  return (
    <main>
      <header>
        <div className="flex justify-end">
          <div className="flex gap-4 items-center">
            <small className="text-[#537BA2]">View stats</small>
            <div className=" cursor-pointer border border-[#A6B4BA] bg-[#F4F6F7] px-3 py-2 rounded-lg">
              <select className=" w-full cursor-pointer  border-0 outline-0 bg-[#F4F6F7]">
                <option>This Year</option>
                <option>2023</option>
              </select>
            </div>
          </div>
        </div>

        <div className=" grid grid-cols-2  gap-y-6 mt-8 md:grid-cols-4 md:gap-2 ">
          <TopStats
            title="REVENUE"
            stats={"125,500"}
            icon={<CircleDollarSign color="#A5BCD4" />}
          />
          <TopStats
            title="REGISTRATIONS"
            stats={"600"}
            icon={<Pen color="#A5BCD4" />}
          />
          <TopStats
            title="RENEWALS"
            stats={"400"}
            icon={<RotateCcw color="#A5BCD4" />}
          />
          <TopStats
            title="NON RENEWALS"
            stats={"200"}
            icon={<RefreshCw color="#A5BCD4" />}
          />
        </div>
      </header>
      <section>
        <div className="bg-white rounded-lg mt-8">
          <div className="border-b border-[#A6B4BA] p-6">
            <h3 className="text-[#3E454C] text-lg">Member statistics</h3>
          </div>
          <div className="member-type-stats p-6 grid grid-cols-2 gap-20">
            <div className="left grid grid-cols-2 gap-6">
              <MemberStats />
              <MemberStats />
              <MemberStats />
              <MemberStats />
            </div>
            <div className="right">
              <Chart />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default OverViewPage;
