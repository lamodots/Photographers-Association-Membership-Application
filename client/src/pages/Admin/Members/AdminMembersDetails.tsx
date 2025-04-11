import { useState } from "react";
import { Trash, MonitorPause, Wallet, Award } from "lucide-react";
import Badge from "../../../components/Badge/Badge";
import Avatar from "../../../components/Avatar/Avatar";
import { useLocation } from "react-router-dom";
import { dateFormater } from "../../../util/DateFormater";

import Modal from "../../../components/modal/Modal";

import OfflinePaymentProcessing from "../../../components/OfflinePaymentProcessing/OfflinePaymentProcessing";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";

type SocialLink = {
  facebook?: string;
  linkedIn?: string;
};
type Interest = string[];
interface UserProps {
  _id: string;
  image: string;
  firstname: string;
  lastname: string;
  email: string;
  Dob: string;
  phone: string;
  location: string;
  address: string;
  aboutuser: string;
  social: SocialLink[];
  interest: Interest;
}

function AdminMembersDetails() {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const location = useLocation();
  const user: UserProps = location?.state;
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  console.log(user);

  const handleGrandHonouraryMember = async () => {
    setShowConfirmationModal(true);
  };

  const handleConfirm = async () => {
    setShowConfirmationModal(false);
    // setIsSubmitting(true);
  };
  return (
    <div>
      <header>
        <div className="flex items-center space-x-10">
          <div className="flex gap-2 items-center">
            <Avatar className="w-32 h-32 rounded" image={user?.image} />
            <div>
              <h3 className="font-semibold capitalize">
                {user.firstname + " " + user.lastname}
              </h3>
              <small className="text-sm text-[#A6B4BA]">{user.email}</small>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge />
            <span className="font-bold">Member</span>
          </div>
        </div>
      </header>
      <main className="pt-8">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <table className="table-auto w-full border border-slate-400  border-collapse ">
            <tr>
              <th className="border border-slate-300 py-2 bg-[#eaf1f4] px-3">
                <td>Date of Birth:</td>
              </th>
              <td className="border pl-4 border-slate-300">
                {dateFormater(user.Dob)}
              </td>
            </tr>
            <tr>
              <th className="border border-slate-300 py-2   px-3 bg-[#eaf1f4]">
                <td>Area:</td>
              </th>
              <td className="border pl-4 border-slate-300">{user.location}</td>
            </tr>
            <tr>
              <th className="border border-slate-300 py-2  px-3 bg-[#eaf1f4]">
                <td>Address:</td>
              </th>
              <td className="border pl-4 border-slate-300">{user.address}</td>
            </tr>
            <tr>
              <th className="border border-slate-300 py-2  px-3 bg-[#eaf1f4]">
                <td>Subscription Type:</td>
              </th>
              <td className="border pl-4 border-slate-300">Normal memebers</td>
            </tr>
            {/* <tr>
              <th className="border border-slate-300 py-2  px-3 bg-[#eaf1f4]">
                <td>Interests:</td>
              </th>
              <td className="border border-slate-300">
                {user.interest.map((userInterests) => userInterests).join(", ")}
              </td>
            </tr> */}
          </table>
          {/* <div className="pt-6">
            <h2 className="font-bold">About member</h2>
            <p className="mt-3 leading-6">{user.aboutuser}</p>
          </div> */}
          <div className="flex items-center justify-between mt-10">
            <div>
              <button
                onClick={() => setShowPaymentModal(true)}
                className=" bg-[#295474] px-2 py-1 rounded flex items-center gap-1 text-sm text-white"
              >
                <Wallet />
                <span>Process Payment</span>
              </button>
            </div>
            {/* <div className=" flex items-center space-x-10 mt-6">
              <button
                className="flex items-center gap-2 text-[#FFAE80]"
                onClick={() => console.log(user._id)}
              >
                <MonitorPause /> <span>Suspend</span>
              </button>
              <button
                className="flex items-center gap-2 text-red-600"
                onClick={() => console.log(user?.email, user._id)}
              >
                <Trash />
                <span>Delete</span>
              </button>
            </div> */}
            <button
              onClick={handleGrandHonouraryMember}
              className=" bg-[#295474] px-2 py-1 rounded flex items-center text-sm gap-1 text-white"
            >
              <Award /> <span>Grant Honourary member</span>
            </button>
          </div>
        </div>
      </main>
      {showPaymentModal && (
        <Modal
          title="Process Payment Offline"
          onClose={() => setShowPaymentModal(false)}
        >
          <OfflinePaymentProcessing
            onCloseModal={setShowPaymentModal}
            userId={user?._id}
            userEmail={user?.email}
            first_name={user.firstname}
            last_name={user.lastname}
          />
        </Modal>
      )}

      {showConfirmationModal && (
        <ConfirmationModal
          action="Grant Honourary member"
          onCancel={() => setShowConfirmationModal(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}

export default AdminMembersDetails;
