import React from "react";
type LableProp = {
  label: string;
};

function Lable({ label }: LableProp) {
  return (
    <label className=" text-sm text-[#212529] font-medium rounded-sm">
      {label}
    </label>
  );
}

export default Lable;
