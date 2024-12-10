import React, { PropsWithChildren } from "react";
type ButtonProp = {
  text: string;
  disableBtn?: boolean;
  className?: string;
  type?: "submit" | "reset" | "button";
  isSubmitting?: boolean;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

/*** isSubmitting will enable you set the loading spinner when form is submitting */
function Button({
  text,
  handleClick,
  className,
  disableBtn,
  type,
  children,
  isSubmitting,
}: PropsWithChildren<ButtonProp>) {
  return (
    <button
      type={type}
      className={` cursor-pointer rounded-lg h-14 flex justify-center items-center bg-[#1A4F83] text-center text-sm font-bold text-[#F4F6F7] ${className}`}
      disabled={disableBtn}
      onSubmit={handleClick}
    >
      {isSubmitting ? children : text}
    </button>
  );
}

export default Button;
