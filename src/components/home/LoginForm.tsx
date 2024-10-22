"use client";
import React, { useEffect } from "react";
import CustomInput from "../forms/CustomInput";
import { LoginType } from "@utils/types";
import Image from "next/image";

import CustomButton from "../forms/CustomButton";
import smartcash from "@public/smartcash-logo.svg";
import { useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {};


const LoginForm = ({}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<LoginType>();
  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 w-full">
      <div className="w-full max-w-sm xl:w-full xl:max-w-md 2xl:max-w-md xl:mx-auto">
        <div className="self- mb-20">
          <h2 className="text-white text-5xl font-semibold text-center"> Login</h2>
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
                errors={errors.staffId?.message}
                placeholder="Enter your Staff Id"
              />
            </div>
            <CustomInput
              type="text"
              label="Password"
              required
              name="password"
              register={register}
              errors={errors.password?.message}
              placeholder="Enter your Password"
            />

            {/* <div>
                  <CustomInput
                    type="password"
                    name="password"
                    register={register}
                    label="Password"
                    errors={errors.password?.message}
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
