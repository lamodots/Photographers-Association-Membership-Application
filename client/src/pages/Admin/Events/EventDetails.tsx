import React, { Suspense } from "react";
import { ChevronLeft, Delete, Trash, Pencil } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import FallbackLoadingComponent from "../../../components/FallbackLoadingComponent/FallbackLoadingComponent";

function EventDetails() {
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
          <div className="top  md:flex md:justify-between mt-8 space-y-4 ">
            <div className="left">
              <h1 className="text-2xl text-[#212529] font-bold">
                LASPPAN End of the year party
              </h1>
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
            <div className="mt-6 rounded-lg">
              <img
                className=" rounded-lg aspect-auto"
                src="https://cdn.thecollector.com/wp-content/uploads/2023/05/tips-to-become-a-great-photographer.jpg?width=1200&quality=70"
                alt=""
              />
            </div>
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

export default EventDetails;
