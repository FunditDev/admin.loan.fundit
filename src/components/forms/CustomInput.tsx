import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { UseFormRegister, UseFormTrigger } from "react-hook-form";

type CustomInputProps = {
  label: string;
  type: string;
  name: string;
  register: UseFormRegister<any>;
  errors?: string;
  required?: boolean;
  placeholder?: string;
  outerClassName?: string;
  trigger?: UseFormTrigger<any>;
  clearErrors?: any;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
  rest?: any;
  disabled?: boolean;
};

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};
export default function CustomInput({
  label,
  type = "text",
  name,
  register,
  required = false,
  errors,
  placeholder = "Enter value",
  outerClassName = "",
  trigger,
  labelClassName,
  clearErrors,
  className,
  errorClassName,
  disabled,
  ...rest
}: CustomInputProps) {
  return (
    <div className={outerClassName}>
      <label
        htmlFor={name}
        className={`block text-sm font-medium leading-6 text-yellow-500 w-fit ${labelClassName}`}
      >
        {label}
      </label>
      <div className="mt-2 relative">
        <input
          type={type}
          id={name}
          {...register(name, { required })}
          className={classNames(
            `block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm px-2  placeholder:text-gray-400 focus:ring-2 ring-1 ring-inset sm:text-sm sm:leading-6 outline-0 duration-100 focus:ring-gray-600 ring-gray-300 ${className} ${
              errors
                ? " ring-red-500 focus:ring-red-500 placeholder:text-red-600 text-red-600"
                : " "
            }`
          )}
          disabled={disabled}
          onBlur={() => trigger && trigger(name)}
          onClick={() => clearErrors && clearErrors(name)}
          placeholder={placeholder}
        />
        {/* {errors && errors.length > 0 && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )} */}
      </div>
      {errors && errors.length > 0 && (
        <p
          className={`mt-1 text-[13px] ${
            errorClassName && errorClassName
          }  text-red-100 ${className && "text-red-600"}`}
          id={`${name}-error`}
        >
          {errors}
        </p>
      )}
    </div>
  );
}
