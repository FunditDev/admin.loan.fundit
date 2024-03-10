import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  className?: string;
  outerClassName?: string;
  disabled?: boolean;
  handleClick?: () => void;
};
const CustomButton = ({
  type,
  className,
  outerClassName = "mt-1",
  disabled,
  children,
  handleClick,
}: ButtonProps) => {
  return (
    <div className={outerClassName}>
      <button
        onClick={handleClick}
        disabled={disabled}
        type={type}
        className={`rounded-md bg-gradient-to-r from-red-300 via-yellow-500 to-red-200 px-3.5 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 w-full focus-visible:outline-offset-2 focus-visible:outline-black ${className}`}
      >
        {children}
      </button>
    </div>
  );
};

export default CustomButton;
