import React from "react";
type ButtonProp = {
  text: string;
  className?: string;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
function Button({ text, handleClick, className }: ButtonProp) {
  return (
    <button
      className={`rounded-lg h-14 bg-[#1A4F83] text-center text-sm font-bold text-[#F4F6F7] ${className}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export default Button;
