import React from "react";
import { Trash, MonitorPause } from "lucide-react";

import Badge from "../../../components/Badge/Badge";
import Avatar from "../../../components/Avatar/Avatar";

const API_URL = process.env.REACT_APP_CLIENT_URL;
function AdminMembersDetails() {
  return (
    <div>
      <header>
        <div className="flex items-center space-x-10">
          <div className="flex gap-2 items-center">
            <Avatar />
            <div>
              <h3 className="font-semibold">Andy Wilkinson</h3>
              <small className="text-sm text-[#A6B4BA]">andy@gmail.com</small>
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
              <td className="border border-slate-300">06-07-1984</td>
            </tr>
            <tr>
              <th className="border border-slate-300 py-2   px-3 bg-[#eaf1f4]">
                <td>Area:</td>
              </th>
              <td className="border border-slate-300">Ikeja</td>
            </tr>
            <tr>
              <th className="border border-slate-300 py-2  px-3 bg-[#eaf1f4]">
                <td>Address:</td>
              </th>
              <td className="border border-slate-300">
                54 Alawusa Avenue , Ikeja, Lagos
              </td>
            </tr>
            <tr>
              <th className="border border-slate-300 py-2  px-3 bg-[#eaf1f4]">
                <td>Subscription Type:</td>
              </th>
              <td className="border border-slate-300">Normal memebers</td>
            </tr>
          </table>
          <div className="flex items-center justify-end space-x-10 mt-6">
            <button className="flex items-center gap-2 text-[#FFAE80]">
              <MonitorPause /> <span>Suspend</span>
            </button>
            <button className="flex items-center gap-2 text-red-600">
              <Trash />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminMembersDetails;
