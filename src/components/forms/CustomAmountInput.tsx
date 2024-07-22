import React, { forwardRef } from "react";
import { UseFormRegister } from "react-hook-form";

type CustomAmountInputProps = {
  label: string;
  name: string;
  className?: string;
  placeholder: string;
  errors?: string;
  outerClassName?:string
  disabled?: boolean;
};

const CustomAmountInput = forwardRef<
  HTMLInputElement,
  CustomAmountInputProps & ReturnType<UseFormRegister<any>>
>(({ onChange, onBlur, name, label, placeholder, errors, className,outerClassName,disabled }, ref) => {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newval = value.replace(/[^0-9.]/g, "");
    if (!isNaN(parseInt(newval))) {
      e.target.value = new Intl.NumberFormat("en-US", {
        currency: "NGN",
      }).format(parseInt(newval));
    }
    if (onChange) {
      return await onChange(e);
    }
  };
  return (
    <div className={outerClassName}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-yellow-400"
      >
        {label}
      </label>
      <div className="mt-2 relative">
        <input
          type="text"
          id={name}
          ref={ref}
          className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm px-2  placeholder:text-gray-400 focus:ring-2 ring-1 ring-inset sm:text-sm sm:leading-6 outline-0 duration-100 focus:ring-gray-600 ring-gray-300 ${className}`}
          placeholder={placeholder}
          onBlur={onBlur}
          onChange={handleChange}
          name={name}
          disabled={disabled}
        />
      </div>
      {errors && (
        <p className="mt-2 text-[13px] text-red-600" id={name}>
          {errors}
        </p>
      )}
    </div>
  );
});

CustomAmountInput.displayName = "CustomAmountInput";
export default CustomAmountInput;
