"use client";
import React, { useEffect } from "react";
import CustomInput from "../forms/CustomInput";
import { LoginType } from "@utils/types";
import { useFormContext } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

type Props = {};

const LoginForm = ({}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<LoginType>();
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-sm xl:w-full xl:max-w-md 2xl:max-w-md xl:mx-auto">
        <div className="self- mb-20">
          <h2 className="text-white text-5xl font-semibold text-center">
            {" "}
            Login
          </h2>
          {/* <Image className="w-sm h-auto" src={smartcash} alt="" /> */}
        </div>
        <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl "></h2>

        <div className="mt-8">
          <div className="space-y-5">
            <div>
              <CustomInput
                type="text"
                label="Staff Id"
                required
                name="staffId"
                register={register}
                error={errors.staffId?.message}
                placeholder="Enter your Staff Id"
              />
            </div>
            <CustomInput
              type={showPassword ? "text" : "password"}
              label="Password"
              required
              name="password"
              register={register}
              error={errors.password?.message}
              placeholder="Enter your Password"
              icon={
                showPassword ? (
                  <EyeSlashIcon
                    className="h-5 w-5 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <EyeIcon
                    className="h-5 w-5 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )
              }
            />

            {/* <div>
                  <CustomInput
                    type="password"
                    name="password"
                    register={register}
                    label="Password"
                    error={errors.password?.message}
                    placeholder="Enter your password"
                    required
                  />
                  <div className="flex items-center justify-between mt-2.5">
                    <Link
                      href="#"
                      title=""
                      className="text-sm font-medium text-blue-600 hover:underline hover:text-blue-700 focus:text-blue-700"
                    >
                      {" "}
                      Forgot password?{" "}
                    </Link>
                  </div>
                </div> */}
          </div>
        </div>
        <p className="text-sm mt-5 absolute bottom-3 inset-x-0 w-full text-center font-bold text-gray-300 lg:hidden">
          Powered by: FUNDiT Finance Company Limited
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
