import React, { InputHTMLAttributes } from "react";
type InputProp = React.InputHTMLAttributes<HTMLInputElement> & {
  type: string;
  placeholderText?: string;
  name: string;
  value: string;
  className?: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
function TextInput({
  type,
  placeholderText,
  name,
  value,
  handleInputChange,
  className,
}: InputProp) {
  return (
    <input
      type={type}
      placeholder={placeholderText}
      name={name}
      value={value}
      onChange={handleInputChange}
      className={`w-full h-14 px-3 py-2  rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]  ${className}`}
    />
  );
}

export default TextInput;
