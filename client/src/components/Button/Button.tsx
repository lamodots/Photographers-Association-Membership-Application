import React from "react";
type ButtonProp = {
  text: string;
};
function Button({ text }: ButtonProp) {
  return (
    <button className=" rounded-lg h-14 bg-[#1A4F83] text-center text-sm font-bold text-[#F4F6F7]">
      {text}
    </button>
  );
}

export default Button;
