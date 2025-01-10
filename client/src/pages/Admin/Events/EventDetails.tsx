// import React, { Suspense } from "react";
// import { ChevronLeft, Delete, Trash, Pencil } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import FallbackLoadingComponent from "../../../components/FallbackLoadingComponent/FallbackLoadingComponent";
// import Button from "../../../components/Button/Button";

// function EventDetails() {
//   const navigate = useNavigate();

//   const handleBackClick = () => {
//     navigate(-1);
//   };
//   return (
//     <div>
//       <header>
//         <button className="flex space-x-2" onClick={handleBackClick}>
//           {" "}
//           <ChevronLeft />
//           Back
//         </button>
//       </header>
//       <main>
//         <section>
//           <div className="top  md:flex md:justify-between mt-8 space-y-4 ">
//             <div className="left">
//               <h1 className="text-2xl text-[#212529] font-bold">
//                 LASPPAN End of the year party
//               </h1>
//             </div>
//             <div className="right flex gap-10  ">
//               <span className="flex items-center cursor-pointer font-bold">
//                 <Pencil /> Edit
//               </span>
//               <span className="flex items-center cursor-pointer text-red-300 px-2 py-1 rounded-lg font-medium">
//                 <Trash className="text-red-300" />
//                 Delete
//               </span>
//             </div>
//           </div>
//           <Suspense fallback={<FallbackLoadingComponent />}>
//             <div className="mt-6 rounded-lg">
//               <img
//                 className=" rounded-lg aspect-auto"
//                 src="https://cdn.thecollector.com/wp-content/uploads/2023/05/tips-to-become-a-great-photographer.jpg?width=1200&quality=70"
//                 alt=""
//               />
//             </div>
//             <p className="mt-8 text-sm">
//               Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel,
//               voluptatum? Eveniet perspiciatis quod inventore repellendus
//               officiis id officia? Dolore, fugiat itaque! Facere veritatis
//               voluptatibus maiores atque sed omnis, est optio rerum
//               exercitationem modi temporibus impedit ipsum asperiores voluptatum
//               ut accusamus?
//             </p>
//           </Suspense>
//           <Button text="Register" className="px-6 mt-6" />
//         </section>
//       </main>
//     </div>
//   );
// }

// export default EventDetails;

import React, { Suspense, useEffect, useState } from "react";
import { ChevronLeft, Delete, Trash, Pencil } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FallbackLoadingComponent from "../../../components/FallbackLoadingComponent/FallbackLoadingComponent";
import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";
import Button from "../../../components/Button/Button";

const API_URL = process.env.REACT_APP_CLIENT_URL;
interface AnnouncementProps {
  _id: string;
  title: string;
  photoImage: string;
  description: string;
  startDate: string;
  endDate: string;
}
function EventDetails() {
  const [annoucementData, setAnnouncementData] = useState<AnnouncementProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteting, setIsDeleteting] = useState(false);
  const { id } = useParams();

  console.log(annoucementData?.photoImage);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  async function getAnnoucement() {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/api/v1/secure/events/${id}`);
      if (!res.ok) {
        throw new Error(`Error fetching announcement`);
      }
      const { event } = await res.json();
      setAnnouncementData(event);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }

  useEffect(() => {
    getAnnoucement();
  }, []);

  // async function handleDelete(id: string | undefined) {
  //   window.confirm();
  //   console.log(id);
  //   setIsDeleteting(true);

  //   try {
  //     const res = await fetch(`${API_URL}/api/v1/secure/announcement/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });

  //     if (!res.ok) {
  //       throw new Error(`Error Deleting announcement`);
  //     }

  //     // navigate(-1);

  //     navigate("/secure/announcement");
  //   } catch (error) {
  //   } finally {
  //     setTimeout(() => {
  //       setIsDeleteting(false);
  //     }, 500);

  //     toast.success("Announcement Deleted");
  //   }
  // }
  async function handleDelete(id: string | undefined) {
    console.log(id);
    setIsDeleteting(true);

    try {
      if (window.confirm("Are you sure you want to delete this event?")) {
        const res = await fetch(`${API_URL}/api/v1/secure/events/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(`Error Deleting event`);
        }

        navigate("/secure/events");
        toast.success("Event Deleted");
      } else {
        // User clicked "Cancel"
        console.log("Deletion cancelled by user.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsDeleteting(false);
      }, 500);
    }
  }

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
        {isLoading ? (
          <div className=" flex justify-center items-center w-full py-8">
            <Oval height="48" width="48" />
          </div>
        ) : (
          <section>
            <div className="top md:flex md:justify-between md:items-center mt-8 ">
              <div className="left">
                <h1 className="text-2xl text-[#212529] font-bold">
                  {annoucementData?.title}
                </h1>
              </div>
              <div className="right flex gap-10 mt-6 md:mt-0 ">
                <Link
                  to={`/secure/events/details/${annoucementData?._id}/edit`}
                >
                  <span className="flex items-center cursor-pointer font-bold">
                    <Pencil /> Edit
                  </span>
                </Link>
                <button
                  className="flex items-center cursor-pointer text-red-300 px-2 py-1 rounded-lg font-medium"
                  onClick={() => handleDelete(annoucementData?._id)}
                >
                  <Trash className="text-red-300" />
                  Delete
                </button>
              </div>
            </div>

            <Suspense fallback={<FallbackLoadingComponent />}>
              <div className="mt-6 rounded-lg w-full">
                <img
                  className=" rounded-lg aspect-auto w-full"
                  src={`../../../uploads/${annoucementData?.photoImage}`}
                  alt=""
                />
              </div>
              <p className="mt-8 text-sm">{annoucementData?.description}</p>
            </Suspense>
            <Link
              to={`/secure/events/${annoucementData?._id}/register`}
              className="px-6 mt-6 cursor-pointer rounded-lg h-14 flex justify-center items-center bg-[#1A4F83] text-center text-sm font-bold text-[#F4F6F7] "
            >
              Register
            </Link>
          </section>
        )}
      </main>
    </div>
  );
}

export default EventDetails;
