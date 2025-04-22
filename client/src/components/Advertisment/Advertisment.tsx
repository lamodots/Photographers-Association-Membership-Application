import React from "react";
interface AdvertismentProps {
  topImage?: string;
  bottomLeftImage?: string;
  bottomRightImage?: string;
  link?: string;
}
function Advertisment({
  topImage,
  bottomLeftImage,
  bottomRightImage,
  link,
}: AdvertismentProps) {
  return (
    <div className="ads my-10 w-full max-w-[1100px] mx-auto overflow-hidden">
      <div className="ads1 w-full mb-1">
        <a href="#" className="block">
          <img
            src="./adstop.jpg"
            className="w-full h-auto object-contain md:object-cover max-h-[150px]"
            alt="Advertisement"
          />
        </a>
      </div>
      <div className="ads_bottom grid grid-cols-1 md:grid-cols-2 gap-1">
        <div className="left">
          <a href="#" className="block">
            <img
              src="./adsbottom.jpg"
              className="w-full h-auto object-contain md:object-cover md:h-[150px]"
              alt="Advertisement"
            />
          </a>
        </div>
        <div className="right">
          <a href="#" className="block">
            <img
              src="./adsbottom.jpg"
              className="w-full h-auto object-contain md:object-cover md:h-[150px]"
              alt="Advertisement"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Advertisment;
