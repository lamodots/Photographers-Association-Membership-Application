import React, { Suspense, useEffect, useState } from "react";
import { ChevronLeft, Delete, Trash, Pencil } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FallbackLoadingComponent from "../../../components/FallbackLoadingComponent/FallbackLoadingComponent";
import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";

const API_URL = process.env.REACT_APP_CLIENT_URL;
interface AnnouncementProps {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}
function AnnouncementDetails() {
  const [annoucementData, setAnnouncementData] = useState<AnnouncementProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteting, setIsDeleteting] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  async function getAnnoucement() {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/api/v1/secure/announcement/${id}`);
      if (!res.ok) {
        throw new Error(`Error fetching announcement`);
      }
      const { announcement } = await res.json();
      setAnnouncementData(announcement);
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

  async function handleDelete(id: string | undefined) {
    console.log(id);
    setIsDeleteting(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/secure/announcement/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Error Deleting announcement`);
      }

      // navigate(-1);

      navigate("/secure/announcement");
    } catch (error) {
    } finally {
      setTimeout(() => {
        setIsDeleteting(false);
      }, 500);

      toast.success("Announcement Deleted");
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
            <div className="top md:flex md:justify-between mt-8 ">
              <div className="left">
                <h1 className="text-2xl text-[#212529] font-bold">
                  {annoucementData?.title}
                </h1>
              </div>
              <div className="right flex gap-10 mt-6 md:mt-0 ">
                <Link
                  to={`/secure/announcement/details/${annoucementData?._id}/edit`}
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
              <p className="mt-8 text-sm">{annoucementData?.description}</p>
            </Suspense>
          </section>
        )}
      </main>
    </div>
  );
}

export default AnnouncementDetails;
