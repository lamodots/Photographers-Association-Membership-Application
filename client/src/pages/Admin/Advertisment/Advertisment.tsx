import React from "react";

function Advertisment() {
  return (
    <main>
      <h1 className="text-2xl font-bold">Place Advertisment</h1>
      <div className="ads my-10 w-full max-w-[1100px] mx-auto overflow-hidden">
        <div className="ads1 w-full mb-1 border border-gray-400 rounded-md p-6">
          <input type="file" />
        </div>
        <div className="ads_bottom grid grid-cols-1 md:grid-cols-2 gap-1">
          <div className="left border border-gray-400 rounded-md p-6 ">
            <input type="file" />
          </div>
          <div className="right border border-gray-400 rounded-md p-6">
            <input type="file" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Advertisment;
