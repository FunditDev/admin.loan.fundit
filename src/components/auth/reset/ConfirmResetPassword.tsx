"use client";
import React, { useState } from "react";
import CustomButton from "@components/forms/CustomButton";
import { SpinnerTwo } from "@components/icons/Spinner";
import { Endpoints } from "@/utils/endpoint";
import { processNoAuth } from "@/utils/http";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import * as yup from "yup";
import CustomInput from "@/components/forms/CustomInput";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";

type Props = {
  token: string;
};
type ResetProps = {
  password: string;
  confirmPassword: string;
};
const schema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
});
const ConfirmResetPassword = ({ token }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetProps>({
    resolver: yupResolver(schema),
  });
  const handleConfirmResetPassword = async (data: ResetProps) => {
    try {
      const res = await processNoAuth("post", Endpoints.confirmResetPassword, {
        newPassword: data.confirmPassword,
        token: token,
      });
      console.log(res, "response");
      if (res?.data) {
        toast.success(res.data.message);
        setTimeout(() => {
          router.push("/");
        }, 2000);
        // window.location.href ='/'
        console.log(res);
      }
    } catch (error: any) {
      if (error.error) {
        toast.error(error.error);
      }
    }

    // setTimeout(() => {
    //   setLoading(false);
    // }, 3000);
  };

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 w-full">
        <div className="w-full max-w-sm xl:w-full xl:max-w-md 2xl:max-w-md xl:mx-auto">
          <div className="self- mb-20">
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl text-center">
              Confirm Password Reset
            </h2>
            <form
              className="mt-8 space-y-5"
              onSubmit={handleSubmit(handleConfirmResetPassword)}
            >
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
              <CustomInput
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                required
                name="confirmPassword"
                register={register}
                error={errors.confirmPassword?.message}
                placeholder="Confirm Password"
                icon={
                  showConfirmPassword ? (
                    <EyeSlashIcon
                      className="h-5 w-5 text-gray-500"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  ) : (
                    <EyeIcon
                      className="h-5 w-5 text-gray-500"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  )
                }
              />
              <div className="space-y-5 flex flex-col">
                <div>
                  <CustomButton
                    type="submit"
                    className="w-full px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    {isSubmitting ? (
                      <SpinnerTwo className=" text-center !mx-auto size-5" />
                    ) : (
                      "Confirm Password Reset"
                    )}
                  </CustomButton>
                </div>
                <button
                  onClick={() => (window.location.href = "/")}
                  className="self-center inline-block text-sm hover:underline duration-300 transition-all text-center text-yellow-200 mx-auto mt-4"
                >
                  Go Home
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmResetPassword;
