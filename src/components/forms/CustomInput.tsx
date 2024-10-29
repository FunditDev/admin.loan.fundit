"use client";

import React, { ReactComponentElement } from "react";

type InputProps = {
  type: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  label?: string;
  required?: boolean;
  register?: any;
  className?: string;
  icon?: ReactComponentElement<any>;
  disabled?: boolean;
  max?: number;
  toggleWidth?: string;
  labelStyle?: string;
  errorCLassName?: string;
};
export enum LoanPlatform {
  loanPlatform = "loanPlatform",
  contact = "contact",
}
const CustomInput: React.FC<InputProps> = ({
  type,
  name,
  label,
  disabled,
  register,
  error,
  touched,
  icon,
  className,
  required,
  labelStyle,
  toggleWidth = "w-3/4",
  errorCLassName,
  ...otherProps
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="flex flex-col font-kumbh w-full relative">
      {label && (
        <label
          htmlFor={name}
          className={` text-light-dark text-sm font-medium text-yellow-300 font-medium ${labelStyle}`}
        >
          {label}
        </label>
      )}
      <div className="relative flex flex-col mt-1">
        {/* <span
          className={`absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer ${
            showPassword ? "text-black " : "text-gray-500"
          } `}
          onClick={() => setShowPassword((state) => !state)}
        >
        </span> */}

        <input
          type={type}
          {...otherProps}
          id={name}
          aria-invalid={error ? "true" : "false"}
          {...register(name, { required })}
          className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm px-2  placeholder:text-gray-400 focus:ring-2 ring-1 ring-inset sm:text-sm sm:leading-6 outline-0 duration-100 focus:ring-gray-600 ring-gray-300 ${className} ${
            error
              ? " ring-red-500 focus:ring-red-500 placeholder:text-red-600 text-red-600"
              : " "
          }`}
          disabled={disabled}
        />
        {icon && (
          <div className="z-100 cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3">
            {icon}
          </div>
        )}
      </div>

      {error && <p className="text-red-100 text-sm mt-1">{error}</p>}
    </div>
  );
};
export default CustomInput;
