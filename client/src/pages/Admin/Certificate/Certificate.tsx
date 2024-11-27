import React from "react";
import Button from "../../../components/Button/Button";
import certificatebg from "../../../assets/certificatebg.png";
console.log(certificatebg);
function Certificate() {
  return (
    <div>
      <header>
        <Button text="Download Certificate" className="px-3" />
      </header>
      <main className="pt-6 relative">
        <div className=" absolute bg-[#f8f4ef] h-[794px] w-[1122.52px] "></div>
      </main>
    </div>
  );
}

export default Certificate;
