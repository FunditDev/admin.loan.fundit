import CustomInput from "@/components/forms/CustomInput";
import { LoginType } from "@/utils/types";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  email: string;
};
const ResetForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Props>();
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-sm xl:w-full xl:max-w-md 2xl:max-w-md xl:mx-auto">
        <div className="self- mb-20">
          <h2 className="text-white text-5xl font-semibold text-center">
            {" "}
            Reset Password
          </h2>
          {/* <Image className="w-sm h-auto" src={smartcash} alt="" /> */}
        </div>
        <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl "></h2>

        <div className="mt-8">
          <div className="space-y-5">
            <div>
              <CustomInput
                type="text"
                label="Email"
                required
                name="email"
                register={register}
                error={errors.email?.message}
                placeholder="Enter Email Address"
              />
            </div>
          </div>
        </div>
        <p className="text-sm mt-5 absolute bottom-3 inset-x-0 w-full text-center font-bold text-gray-300 lg:hidden">
          Powered by: FUNDiT Finance Company Limited
        </p>
      </div>
    </div>
  );
};

export default ResetForm;
