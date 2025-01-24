import React, { lazy, Suspense } from "react";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { FAKE_MEMBERS } from "../../util/data";
import FallbackLoadingComponent from "../../components/FallbackLoadingComponent/FallbackLoadingComponent";
import { Calendar, Clock, Handshake } from "lucide-react";
import MembershipTypeCard from "../../components/MembershipTypeCard/MembershipTypeCard";
const NewMemberCard = lazy(
  () => import("../../components/Admin-Components/NewMemberCard/NewMemberCard")
);

function OverViewPage() {
  return (
    <main>
      <header>
        <div className=" grid grid-cols-1 sm:grid-cols-2  gap-2 mt-8 md:grid-cols-3 md:gap-6 ">
          <MembershipTypeCard
            cardTitle="MEMBERSHIP TYPE"
            subScriptionInfo="Life Time"
          />
          <MembershipTypeCard
            cardTitle="DATE JOINNED"
            subScriptionInfo="20-10-2024"
          >
            <Calendar />
          </MembershipTypeCard>
          <MembershipTypeCard cardTitle="Expires" subScriptionInfo="20-10-2024">
            <Clock />
          </MembershipTypeCard>
        </div>
      </header>

      <section className="pt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-lg text-[#1A4F83] font-bold capitalize ">
            Latest Announcements
          </h2>
          <Link
            to="/announcement"
            className="border border-[#A5BCD4] text-[#1A4F83] font-bold px-2 py-1 rounded-lg"
          >
            View All
          </Link>
        </div>

        <div className="w-full mt-6 bg-white p-6 rounded-lg space-y-2">
          <p>
            I’ve written a few thousand words on why traditional “semantic class
            names” are the reason CSS is hard to maintain, but the truth is
            you’re never going to believe me until you
          </p>
          <div className="flex justify-end">
            <Link
              to="/annoucement/details/1"
              className="text-[#FFAE80] font-bold"
            >
              Read more
            </Link>
          </div>
        </div>
      </section>
      <section className="pt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-lg text-[#1A4F83] font-bold capitalize ">
            New members
          </h2>
          <Link
            to="/members"
            className="border border-[#A5BCD4] text-[#1A4F83] font-bold px-2 py-1 rounded-lg"
          >
            View All
          </Link>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mt-6">
          {FAKE_MEMBERS.map((user) => {
            return (
              <Suspense fallback={<FallbackLoadingComponent />} key={user.id}>
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
