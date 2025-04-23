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

// ID Card Component
const IdCard = React.forwardRef<
  HTMLDivElement,
  { member: any; logo: string | File | null | undefined }
>((props, ref) => (
  <div ref={ref} style={{ padding: "10mm", backgroundColor: "#f5f7fa" }}>
    {/* FRONT */}
    <div className="w-[86mm] h-[54mm] border rounded-lg shadow-lg overflow-hidden m-auto">
      <div className="bg-blue-900 text-white py-2 flex justify-between space-x-4 items-center px-4">
        <div className="w-12 h-8 bg-gray-400">
          <img
            src={props.logo?.toString()}
            alt="Organization Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-sm font-bold leading-none">
            Kerala Samajam Nigeria
          </h1>
        </div>
      </div>
      <div className="p-2">
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 rounded-md bg-gray-300">
            <img
              src={props.member.image}
              alt="User"
              className="w-full rounded-md h-full object-cover"
            />
          </div>
        </div>
        <div className="text-center mb-2 ">
          <p className="text-[18px] text-gray-700 leading-none">
            {props.member.firstName || props.member.firstname}{" "}
            {props.member.lastName || props.member.lastname}
          </p>
        </div>
      </div>
      <div className="bg-blue-900 text-white text-center py-1">
        <h2 className="text-xs leading-none">
          Please present this ID card upon request.
        </h2>
      </div>
    </div>

    {/* BACK */}
    <div className="w-[86mm] h-[54mm] border rounded-lg shadow-lg overflow-hidden m-auto mt-4">
      <div className="bg-blue-900 text-white text-center py-2">
        <h1 className="text-sm font-bold leading-none">CONTACT INFORMATION</h1>
      </div>
      <div className="p-3">
        <p className="mb-6">If found kindly contact:</p>
        <div className="text-left mb-2 space-y-2">
          <p className="text-xs text-gray-700 leading-none">
            <span className="font-bold">Phone:</span> {props.member.whatsappId}
          </p>
          <p className="text-xs text-gray-700 leading-none">
            <span className="font-bold">Email:</span>{" "}
            {props.member.emailId || props.member.email}
          </p>
          <p className="text-xs text-gray-700 leading-none">
            <span className="font-bold">Address:</span> {props.member.address}
          </p>
        </div>
      </div>
    </div>
  </div>
));

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
      <div className="p-4 max-w-lg mx-auto">
        {user && (
          <>
            <div className="mb-4">
              <IdCardComponent member={user} />
            </div>
            {user.familyMembers.map((member: any, index: number) => (
              <div key={index} className="mb-4">
                <IdCardComponent member={member} />
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
const IdCardComponent: React.FC<{ member: any }> = ({ member }) => {
  const { currentUser } = useCurrentUser();
  const componentRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const { appData } = useFetchAppData();
  const [membershipItem] = useMembershipActive();
  const [welfareItem] = useWelfareActive();
  const showAlert =
    (membershipItem?.status !== "active" ||
      currentUser?.user.isHonouraryMember) &&
    welfareItem?.status !== "active";

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
        orientation: "portrait",
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
      <h1 className="text-center text-2xl">Download Membership ID Card</h1>
      {showAlert ? (
        <div className="mt-10">
          <Alert />
        </div>
      ) : (
        <div>
          <IdCard ref={componentRef} member={member} logo={appData?.applogo} />
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
