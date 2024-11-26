import { ChevronLeft, Delete, Trash, Pencil } from "lucide-react";
import React, { Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import FallbackLoadingComponent from "../../../components/FallbackLoadingComponent/FallbackLoadingComponent";

function SubscriptionDetails() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div>
      <header>
        <button className="flex space-x-2" onClick={handleBackClick}>
          {" "}
          <ChevronLeft />
          Back
        </button>
      </header>
      <main>
        <section>
          <div className="top flex justify-between mt-8 ">
            <div className="left">
              <h1 className="text-2xl text-[#212529] font-bold">
                Normal Membership
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-[#2067A9]">Subscription fee: </p>
                <span className="bg-[#5BD3CF] rounded-lg px-2 py-1">
                  NGN 5000
                </span>
              </div>
            </div>
            <div className="right flex gap-10  ">
              <span className="flex items-center cursor-pointer font-bold">
                <Pencil /> Edit
              </span>
              <span className="flex items-center cursor-pointer text-red-300 px-2 py-1 rounded-lg font-medium">
                <Trash className="text-red-300" />
                Delete
              </span>
            </div>
          </div>
          <Suspense fallback={<FallbackLoadingComponent />}>
            <p className="mt-8 text-sm">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel,
              voluptatum? Eveniet perspiciatis quod inventore repellendus
              officiis id officia? Dolore, fugiat itaque! Facere veritatis
              voluptatibus maiores atque sed omnis, est optio rerum
              exercitationem modi temporibus impedit ipsum asperiores voluptatum
              ut accusamus?
            </p>
          </Suspense>
        </section>
      </main>
    </div>
  );
}

export default SubscriptionDetails;
