"use client";
import { ResetTemporaryPasswordType } from "@utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CustomInput from "@/components/forms/CustomInput";
import CustomButton from "@/components/forms/CustomButton";
import Spinner, { SpinnerTwo } from "@components/icons/Spinner";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { processNoAuth } from "@utils/http";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import AuthSidebar from "@/components/home/AuthSidebar";
import { Endpoints } from "@/utils/endpoint";

const ResetPasswordpage = () => {
  const router = useRouter();

  const schema = yup.object().shape({
    email: yup.string().email().required("email is required"),
    oldPassword: yup.string().required(),
    password: yup.string().required(),
    // ref password for validation
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), ""], "Passwords must match")
      .defined(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetTemporaryPasswordType>({
    resolver: yupResolver(schema),
  });

  const submit = async (data: ResetTemporaryPasswordType) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await processNoAuth(
        "post",
        Endpoints.resetTempPassword,
        {
          staffEmail: data.email,
          password: data.oldPassword,
          newPassword: data.password,
        }
      );
      if (res?.status === 200) {
        toast.success("Password Reset Successful");
        router.push("/");
      }
    } catch (err: any) {
      if (
        err.statusCode === 400 &&
        Array.isArray(err?.validationErrors)
      ) {
        toast.error(err?.validationErrors[0]);
      } else
        toast.error(
          err?.error ?? "An error occured, please try again"
        );
    }
  };
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  console.log(showOldPassword);
  return (
    <div className="">
      <section className="bg-gradient-to-br from-[#b95254] to-[#4b0d2a] ">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <div className="flex justify-center">
            <div className="max-w-[500px] w-full m-auto p-6 py-4  shadow-md  rounded-md">
              <h5 className="my-3 text-xl font-semibold text-center mb-12 text-white">
                Reset Password
              </h5>
              <form
                className="text-start"
                noValidate
                onSubmit={handleSubmit(submit)}
              >
                <div className="grid grid-cols-1 space-y-4">
                  <div className="mb-2">
                    <CustomInput
                      type="email"
                      name="email"
                      placeholder="Email"
                      label="Email : "
                      className="h-10"
                      register={register}
                      error={errors.email?.message}
                    />
                  </div>
                  <div className="flex sm:space-x-4 w-full sm:flex-row flex-col"></div>
                  <div className="mb-2">
                    <CustomInput
                      type={showOldPassword ? "text" : "password"}
                      name="oldPassword"
                      placeholder="Enter Temporary Password"
                      label="Old Password : "
                      className="h-10"
                      register={register}
                      error={errors.oldPassword?.message}
                      icon={
                        showOldPassword ? (
                          <EyeSlashIcon
                            className="h-5 w-5 text-gray-500"
                            onClick={() => setShowOldPassword(!showOldPassword)}
                          />
                        ) : (
                          <EyeIcon
                            className="h-5 w-5 text-gray-500"
                            onClick={() => setShowOldPassword(!showOldPassword)}
                          />
                        )
                      }
                    />
                  </div>
                  <div className="mb-2">
                    <CustomInput
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="New Password"
                      label="New Password : "
                      className="h-10"
                      register={register}
                      error={errors.password?.message}
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
                  </div>
                  <div className="mb-2">
                    <CustomInput
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      label="Confirm Password : "
                      className="h-10"
                      register={register}
                      error={errors.confirmPassword?.message}
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
                  </div>

                  {/* <div className="flex justify-between">
                    <p className="text-slate-400 mb-0">
                      <Link href="#" className="text-blue-600" aria-disabled>
                        Forgot password ?
                      </Link>
                    </p>

                    <div className="text-center">
                      <span className="text-slate-400 me-2">
                        Already have an account ?
                      </span>{" "}
                      <Link
                        href="/"
                        className="text-blue-600 font-bold inline-block"
                      >
                        Log In
                      </Link>
                    </div>
                  </div> */}

                  <div className="">
                    <CustomButton
                      type="submit"
                      className="!inline"
                      outerClassName="mt-8"
                    >
                      {isSubmitting ? (
                        <SpinnerTwo
                          width="20"
                          fill="white"
                          className="text-center !mx-auto size-5"
                        />
                      ) : (
                        "Reset Password"
                      )}
                    </CustomButton>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <AuthSidebar />
        </div>
      </section>
    </div>
  );
};

export default ResetPasswordpage;
