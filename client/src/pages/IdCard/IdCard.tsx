import React, { useEffect, useRef, useState } from "react";
import { Download, FileType, InfoIcon } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useCurrentUser } from "../../context/AdminContext";
import useFetchAppData from "../../hooks/useFetchAppData";
import {
  useMembershipActive,
  useWelfareActive,
} from "../../hooks/useFetchPayment";
import { Link } from "react-router-dom";
import Advertisment from "../../components/Advertisment/Advertisment";
import NewIDCard from "./NewIDCard";
import { monthdayyearFormater } from "../../util/monthdayyearFormater";

// ID Card Component
const IdCard = React.forwardRef<
  HTMLDivElement,
  {
    member: any;
    logo: string | File | null | undefined;
    membership: any;
    memberId?: any;
    familyInLagos?: boolean;
  }
>((props, ref) => {
  console.log(props);
  return (
    <div
      ref={ref}
      style={{
        padding: "10mm",
        backgroundColor: "#f5f7fa",
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}
    >
      {/* // FRONT OF ID CARD */}

      <div className="w-64 h-96 rounded-lg overflow-hidden shadow-lg relative">
        {/* Background image */}
        <div className="absolute inset-0">
          <div className="h-full w-full">
            <img
              src="/id-bg.png"
              alt="ID Card Background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col items-center p-3">
          {/* Header with logo */}
          <div className="flex justify-between items-center w-full">
            {/* <div className="flex-1"></div> */}
            <div className="flex-1 text-center font-bold text-black text-[10px] pt-8 ">
              <p className="text-center">KERALA SAMAJAM NIGERIA</p>
            </div>
            <div className=" flex justify-end">
              <img src="./id-logo.png" className="w-12 absolute top-4" />
            </div>
          </div>

          {/* Photo placeholder */}
          <div className="mt-2 w-32 h-28 bg-white border border-gray-300 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-gray-500 border-l-4 border-l-orange-500">
              <img
                src={props.member.image}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Malayalam text */}
          <div className="mt-2 text-blue-900 font-bold text-sm">
            കേരള സമാജം നൈജീരിയ
          </div>
          {/* ID information */}
          <div className="mt-1 w-full text-left text-[10px]">
            <div className="flex mb-1">
              <span className="font-semibold w-36">ID Number:</span>
              <span className="text-[9px]">
                {props.member.memberId}
                {props.familyInLagos && props.memberId}
              </span>
            </div>
            <div className="flex mb-1">
              <span className="font-semibold w-36">Name:</span>
              <span className="text-[9px]">
                {props.member.firstName || props.member.firstname}{" "}
                {props.member.lastName || props.member.lastname}
              </span>
            </div>
            <div className="flex mb-1">
              <span className="font-semibold w-36">Membership Category:</span>
              <span className="text-[9px]">
                {props.membership.membershipType}
              </span>
            </div>
            <div className="flex mb-1">
              <span className="font-semibold w-36">Validity Period:</span>
              <span className="text-[9px]">
                {monthdayyearFormater(props.membership.expiryDate)}
              </span>
            </div>
          </div>

          {/* 25 Years badge */}
          <div className="relative -left-[84px] -bottom-1 ">
            <div className="w-16 h-16">
              <img
                src="/25-yrs.png"
                alt="25 Years Badge"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* NEW ID BACK */}
      <div className="w-64 h-96 rounded-lg overflow-hidden shadow-lg relative">
        {/* Background image */}
        <div className="absolute inset-0">
          <div className="h-full w-full">
            <img
              src="/id-bg.png"
              alt="ID Card Background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col items-center p-3">
          {/* Header with logo */}
          <div className="flex justify-between items-center w-full">
            <div className="mb-3 mt-8">
              <h3 className="font-semibold mb-1">Contact Information:</h3>
              <div className="pl-2 text-xs">
                <p className="mb-1">Phone:+2348099862222</p>
                <p>Email:keralasamajamnigeria@gmail.com </p>
              </div>
            </div>
          </div>
          <div className="mt-2 w-full">
            <h3 className="font-semibold text-xs mb-1">Terms & Conditions:</h3>
            <ol className="text-xs pl-5 list-decimal">
              <li className="mb-1">
                This card remains the property of Kerala Samajam Nigeria.
              </li>
              <li className="mb-1">
                If found, please return to Kerala Samajam Nigeria.
              </li>
              <li>Card is not transferable.</li>
            </ol>
          </div>
          {/* Footer */}
          <div className="absolute -bottom-10 text-center w-full">
            <div className=" flex justify-center">
              <img src="./id-logo.png" className="w-12 absolute top-10" />
            </div>
            <p className="text-xs font-semibold">Kerala Samajam Nigeria</p>
            <p className="text-xs">www.keralasamajamnigeria.org</p>
          </div>
        </div>
      </div>
    </div>
  );
});

// Printable ID Cards Component
function PrintableIdCards() {
  const { currentUser } = useCurrentUser();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const API_URL = process.env.REACT_APP_CLIENT_URL;

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/users/profile/${currentUser?.user._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile data.");
        }
        const { data } = await response.json();
        setUser(data);
      } catch (error: any) {
        setApiError(error.message || "An error occurred while fetching data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Render error state
  if (apiError) {
    return <div className="text-red-500">{apiError}</div>;
  }

  // Render ID cards
  return (
    <div>
      <div className="p-4 w-full ">
        {user && (
          <>
            <div className="mb-4 flex  items-center flex-col">
              <h1 className="text-center text-2xl">
                Download Membership ID Card
              </h1>
              <IdCardComponent member={user} />
            </div>
            {user.familyMembers.map((member: any, index: number) => (
              <div key={index} className="mb-4 flex  items-center flex-col">
                <IdCardComponent
                  member={member}
                  memberId={user.memberId}
                  familyInLagos={user.familyInLagos}
                />
              </div>
            ))}
          </>
        )}
      </div>

      <Advertisment />
    </div>
  );
}

// ID Card Component Wrapper
const IdCardComponent: React.FC<{
  member: any;
  memberId?: any;
  familyInLagos?: boolean;
}> = ({ member, memberId, familyInLagos }) => {
  const { currentUser } = useCurrentUser();
  const componentRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const { appData } = useFetchAppData();
  const [membershipItem] = useMembershipActive();
  const [welfareItem] = useWelfareActive();

  const showAlert = !(
    (membershipItem?.status === "active" ||
      currentUser?.user.isHonouraryMember) &&
    welfareItem?.status === "active"
  );
  // Download as PDF functionality
  const handleDownloadPDF = async () => {
    if (componentRef.current === null) return;

    setIsDownloading(true);
    try {
      const name = member.firstName || member.firstname;

      // Create a canvas from the component
      const canvas = await html2canvas(componentRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Allow cross-origin images
        allowTaint: true,
        backgroundColor: "white",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      // Create PDF (A4 size)
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add the image to the PDF
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);

      // Save the PDF
      pdf.save(`${name}-ID-Card.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Could not generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Download as PNG functionality
  const handleDownloadPNG = async () => {
    if (componentRef.current === null) return;

    setIsDownloading(true);
    try {
      const name = member.firstName || member.firstname;

      // Create a canvas from the component
      const canvas = await html2canvas(componentRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Allow cross-origin images
        allowTaint: true,
        backgroundColor: "white",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");

      // Create download link
      const link = document.createElement("a");
      link.download = `${name}-ID-Card.png`;
      link.href = imgData;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Could not generate image. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main>
      {showAlert ? (
        <div className="mt-10">
          <Alert />
        </div>
      ) : (
        <div>
          <IdCard
            ref={componentRef}
            member={member}
            logo={appData?.applogo}
            membership={membershipItem}
            memberId={memberId}
            familyInLagos={familyInLagos}
          />
          <div className="flex  justify-center mt-4 space-x-4">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded"
              disabled={isDownloading}
            >
              <FileType className="mr-2" size={18} />
              Download PDF
            </button>
            <button
              onClick={handleDownloadPNG}
              className="hidden items-center bg-purple-500 text-white px-4 py-2 rounded"
              disabled={isDownloading}
            >
              <Download className="mr-2" size={18} />
              Download PNG
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default PrintableIdCards;

function Alert() {
  return (
    <div className="flex items-center gap-2 bg-cyan-200 px-3 py-4 rounded border-l-4 border-l-cyan-700">
      <div>
        <InfoIcon height={22} width={22} />
      </div>
      <p className="text-sm">
        You are yet to pay for <strong>Membership </strong>and{" "}
        <strong>Welfare</strong> dues. Subscribe to get ID card. {""}
        <Link to="/subscription" className="text-cyan-900 underline font-bold">
          Get started
        </Link>
      </p>
    </div>
  );
}
