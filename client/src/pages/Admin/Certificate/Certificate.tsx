import React from "react";
import Button from "../../../components/Button/Button";
import certbg from "../../../assets/certbg.png";
import certDesign from "../../../assets/certdesign.png";
console.log(certbg);
function Certificate() {
  return (
    <div>
      <header>
        <Button text="Download Certificate" className="px-3" />
      </header>
      <main className="pt-6 relative">
        {/* <div className=" absolute bg-[#f8f4ef] h-[794px] w-[1122.52px] style={{ backgroundImage: `url(${certbg})` }} "></div> */}
        <div className=" absolute bg-[#f8f4ef] h-[794px] w-[1122.52px] style={{ backgroundImage: `url(${certbg})` }} ">
          <img src={certDesign} alt="" />
        </div>
      </main>
    </div>
  );
}

export default Certificate;
