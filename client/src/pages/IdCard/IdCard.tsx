import React, { useRef } from "react";

import { Download, FileType } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const initialUser = {
  _id: "67aca819753634a3c8b35b7c",
  image:
    "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/east-indian-young-man-matthew-bamberg.jpg",
  firstname: "Wisdom",
  lastname: "Lamodot",
  title: "MR",
  Dob: "2025-02-27T00:00:00.000Z",
  location: "Ikeja/Ikorodu/Ota",
  address: "83 Opebi Rd, Opebi, Ikeja, Lagos, Nigeria",
  whatsappId: "+2348989898989",
  email: "lopice5780@cybtric.com",
  emergencyContactInIndia: "+919847543302",
  districtInIndia: "Daman and Diu",
  addressInIndia: "83 Opebi Rd, Opebi, Ikeja, Lagos, Nigeria",
  state: "Adamawa",
  familyInLagos: true,
  familyMembers: [
    {
      firstName: "Mekukele",
      lastName: "Zambia",
      relationship: "Daughter",
      whatsappId: "+2349090909090",
      emailId: "lamodots@gmail.com",
      image:
        "https://thumbs.dreamstime.com/b/indian-boy-face-avatar-cartoon-indian-young-boy-face-profile-picture-avatar-cartoon-character-portrait-vector-illustration-graphic-150835356.jpg",
    },
    {
      firstName: "Zazam",
      lastName: "Mike",
      relationship: "Father",
      whatsappId: "+2348080808088",
      emailId: "user@gmail.com",
      image:
        "https://thumbs.dreamstime.com/b/indian-boy-face-avatar-cartoon-indian-young-boy-face-profile-picture-avatar-cartoon-character-portrait-vector-illustration-graphic-150835356.jpg",
    },
  ],
  password: "",
  confirmPassword: "",
};

const organizationLogo = "https://path/to/organization/logo.png";

const IdCard = React.forwardRef<
  HTMLDivElement,
  { member: (typeof initialUser.familyMembers)[0] | typeof initialUser }
>((props, ref) => (
  <div ref={ref} style={{ padding: "10mm", backgroundColor: "white" }}>
    {/* FRONT */}
    <div className="w-[86mm] h-[54mm] border rounded-lg shadow-lg overflow-hidden m-auto">
      <div className="bg-blue-900 text-white py-2 flex justify-between space-x-4 items-center px-4">
        <div className="w-12 h-8 bg-gray-400">
          <img
            src={organizationLogo}
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
        <div className="text-left mb-2 text-center">
          <p className="text-[18px] text-gray-700 leading-none">
            {"firstName" in props.member
              ? props.member.firstName
              : props.member.firstname}{" "}
            {"lastName" in props.member
              ? props.member.lastName
              : props.member.lastname}
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
        <p className="mb-6"> If found kindly contact:</p>
        <div className="text-left mb-2 space-y-2">
          <p className="text-xs text-gray-700 leading-none">
            <span className="font-bold">Phone:</span> {props.member.whatsappId}
          </p>
          <p className="text-xs text-gray-700 leading-none">
            <span className="font-bold">Email:</span>{" "}
            {"emailId" in props.member
              ? props.member.emailId
              : props.member.email}
          </p>
          <p className="text-xs text-gray-700 leading-none">
            <span className="font-bold">Address:</span> {initialUser.address}
          </p>
        </div>
      </div>
    </div>
  </div>
));

function PrintableIdCards() {
  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="mb-4">
        <IdCardComponent member={initialUser} />
      </div>
      {initialUser.familyMembers.map((member, index) => (
        <div key={index} className="mb-4">
          <IdCardComponent member={member} />
        </div>
      ))}
    </div>
  );
}

const IdCardComponent: React.FC<{
  member: (typeof initialUser.familyMembers)[0] | typeof initialUser;
}> = ({ member }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = React.useState(false);

  // Print functionality
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

  // Download as PDF functionality
  const handleDownloadPDF = async () => {
    if (componentRef.current === null) return;

    setIsDownloading(true);
    try {
      const name = "firstName" in member ? member.firstName : member.firstname;

      // Create a canvas from the component
      const canvas = await html2canvas(componentRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Allow cross-origin images
        allowTaint: true,
        backgroundColor: "white",
        logging: false,
        windowWidth: componentRef.current.scrollWidth,
        windowHeight: componentRef.current.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      // Create PDF (A4 size)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Calculate dimensions to fit properly on A4
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

  // Download as PNG functionality (alternative method)
  const handleDownloadPNG = async () => {
    if (componentRef.current === null) return;

    setIsDownloading(true);
    try {
      const name = "firstName" in member ? member.firstName : member.firstname;

      // Create a canvas from the component
      const canvas = await html2canvas(componentRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Allow cross-origin images
        allowTaint: true,
        backgroundColor: "white",
        logging: false,
      });

      // Convert canvas to PNG
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
    <div>
      <IdCard ref={componentRef} member={member} />
      <div className="flex mt-4 space-x-4">
        {/* <button
          onClick={handlePrint}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isDownloading}
        >
          <Printer className="mr-2" size={18} />
          Print
        </button> */}
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
          className="flex items-center bg-purple-500 text-white px-4 py-2 rounded"
          disabled={isDownloading}
        >
          <Download className="mr-2" size={18} />
          Download PNG
        </button>
      </div>
    </div>
  );
};

export default PrintableIdCards;
