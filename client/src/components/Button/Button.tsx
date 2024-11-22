import React from "react";
type ButtonProp = {
  text: string;
  disableBtn?: boolean;
  className?: string;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
function Button({ text, handleClick, className, disableBtn }: ButtonProp) {
  return (
    <button
      className={` cursor-pointer rounded-lg h-14 bg-[#1A4F83] text-center text-sm font-bold text-[#F4F6F7] ${className}`}
      disabled={disableBtn}
      onSubmit={handleClick}
    >
      {text}
    </button>
  );
}

export default Button;
