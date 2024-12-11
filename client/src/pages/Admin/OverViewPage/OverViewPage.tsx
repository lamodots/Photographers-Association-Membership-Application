import React, { lazy } from "react";
import TextInput from "../../../components/Input/TextInput";
import TopStats from "../../../components/Admin-Components/TopStats/TopStats";
import { CircleDollarSign, Pen, RefreshCw, RotateCcw } from "lucide-react";
import MemberStats from "../../../components/Admin-Components/MemberStats/MemberStats";
import Chart from "../../../components/Admin-Components/MemberStats/Chart";
import { Suspense } from "react";
import FallbackLoadingComponent from "../../../components/FallbackLoadingComponent/FallbackLoadingComponent";
import Button from "../../../components/Button/Button";
import { Link } from "react-router-dom";
import { FAKE_MEMBERS } from "../../../util/data";
// import NewMemberCard from "../../../components/Admin-Components/NewMemberCard/NewMemberCard";
const NewMemberCard = lazy(
  () =>
    import("../../../components/Admin-Components/NewMemberCard/NewMemberCard")
);

function getCookie(name: string): string | null {
  console.log("Document Cookie:", document.cookie); // Log the document.cookie value for debugging
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    console.log("Cookie Parts:", parts); // Log parts for debugging
    const result = parts.pop()?.split(";").shift() || null;
    console.log("Retrieved Cookie Value:", result); // Log the retrieved cookie value
    return result;
  }
  return null;
}

console.log("The token is", getCookie("token"));

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
        <div className="bg-white rounded-lg mt-8 w-full">
          <div className="border-b border-[#A6B4BA] p-6">
            <h3 className="text-[#3E454C] text-lg">Member statistics</h3>
          </div>

          <Suspense fallback={<FallbackLoadingComponent />}>
            <div className="member-type-stats p-6 grid grid-cols-1 md:grid-cols-[9fr,3fr] gap-7">
              <div className="left grid grid-cols-2 w-full gap-6">
                <MemberStats />
                <MemberStats />
                <MemberStats />
                <MemberStats />
              </div>
              <div className="right bg-[#F5F7FA] px-4 py-8 rounded-lg w-full">
                <Chart />
              </div>
            </div>
          </Suspense>
        </div>
      </section>
      <section className="pt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-lg text-[#1A4F83] font-bold capitalize ">
            New members
          </h2>
          <Link
            to="/secure/members"
            className="border border-[#A5BCD4] text-[#1A4F83] font-bold px-2 py-1 rounded-lg"
          >
            View All
          </Link>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mt-6">
          {FAKE_MEMBERS.map((user) => {
            return (
              <Suspense fallback={<FallbackLoadingComponent />}>
                <NewMemberCard
                  image={user.photo}
                  name={user.name}
                  date={user.date}
                />
              </Suspense>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default OverViewPage;
