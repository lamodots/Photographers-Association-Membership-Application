import React, { useState } from "react";

function FilterPopUp() {
  const [showPopup, setShowPopUp] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  return (
    <div className=" relative z-50">
      <div className="absolute right-1 rounded-lg bg-white p-6 w-[162px] mt-1 flex flex-col gap-6">
        <label>Start Date:</label>{" "}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />{" "}
        <label>End Date:</label>{" "}
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />{" "}
        <button onClick={() => setShowPopUp(false)}>Apply</button>
      </div>
    </div>
  );
}

export default FilterPopUp;
