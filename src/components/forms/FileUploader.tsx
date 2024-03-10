import React, { forwardRef } from "react";
import { UseFormRegister } from "react-hook-form";
import { toBase64 } from "@utils/fileFormatter";
type FileUploaderProps = {
  label: string;
  errors: string;
  accept?: string;
  multiple: boolean;
  otherProps?: any;
};
const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};
const FileUploader = forwardRef<
  HTMLInputElement,
  FileUploaderProps & ReturnType<UseFormRegister<any>>
>(function FileUploader(
  { multiple = false, label, name, onBlur, onChange, errors, ...otherProps },
  ref
) {
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const handleUpload = async () => {
      if (!files) return;
      let img64 = [];
      for (let i = 0; i < files?.length; i++) {
        const file = files[i];
        const base64 = await toBase64(file);
        img64.push(base64);
      }
      return img64;
    };
    const image64 = await handleUpload();
    return await onChange(event);
  };
  return (
    <div className="bg-white w-1/2">
      <div className="max-w-md w-full">
        <div className="flex flex-col">
          <label
            htmlFor={name}
            className="block text-sm font-medium leading-6 mb-2 text-gray-900"
          >
            {label}
          </label>
          <div className="relative mt-2 sm:mt-0 sm:flex-1 w-full">
            <input
              ref={ref}
              onBlur={onBlur}
              type="file"
              onChange={handleChange}
              id={name}
              name={name}
              //   accept="image/*"
              multiple={multiple}
              className={classNames(
                `block w-full px-4 py-4 placeholder-gray-500 ring-gray-300 ring-1 border-0 rounded-lg focus:ring-2 focus:ring-blue-600 ring-inset outline-0 sm:text-sm caret-blue-600 ${
                  errors
                    ? " !ring-red-500 !focus:ring-red-500 !placeholder:text-red-500"
                    : " "
                }`
              )}
            />
          </div>
        </div>
        {errors && (
          <p className="mt-1 text-sm text-red-600" id={`${name}-error`}>
            {errors}
          </p>
        )}
      </div>
    </div>
  );
});

export default FileUploader;
