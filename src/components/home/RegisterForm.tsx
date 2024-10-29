"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import CustomInput from "../forms/CustomInput";
import { LoginType, Registertype } from "@utils/types";
import { useForm } from "react-hook-form";
import Image from "next/image";
// import { useAppDispatch, useAppSelector } from "@/redux/reduxType";
// import { loginUser } from "@/redux/slices/auth.slice";
import Spinner, { SpinnerTwo } from "../icons/Spinner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
// import { getToken, setToken } from "@/utils/token";
import CustomButton from "../forms/CustomButton";
import image1 from "@public/login/approved-loan-png.jpeg";
import smartcash from "@public/smartcash-logo.svg";
import { processNoAuth } from "@/utils/http";
import { Endpoints } from "@/utils/endpoint";
import { toast } from "react-toastify";
import { setToken } from "@/utils/token";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";

const schema = yup.object().shape({
  staffId: yup.string().trim().required("Staff Id is required"),
  password: yup.string().trim().required("Password is required"),
  staffEmail: yup
    .string()
    .trim()
    .required("Email is required")
    .test(
      "have airtel email",
      "Email must be airtel email or smartcash",
      (value) => {
        return (
          value?.includes("@ng.airtel.com") || value.includes("smartcashpsb.ng")
        );
      }
    ),
  firstName: yup.string().trim().required("First Name is required"),
  lastName: yup.string().trim().required("Last Name is required"),
});

const RegisterForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<Registertype>({
    resolver: yupResolver(schema),
    defaultValues: {
      staffId: "",
    },
  });
  // const dispatch = useAppDispatch();
  // const { isLoggedIn } = useAppSelector((state) => state.auth);
  const router = useRouter();
  //   useEffect(() => {
  //     const getStaff = localStorage.getItem("staff");
  //     const loan = localStorage.getItem("loan");
  //     const token = localStorage.getItem("token");
  //     if (getStaff || loan || token) {
  //       localStorage.removeItem("staff");
  //       localStorage.removeItem("loan");
  //       localStorage.removeItem("token");
  //     }
  //   }, []);
  const handleRegister = async (data: Registertype) => {
    // router.push("/dashboard");
    try {
      const rs = await processNoAuth("post", Endpoints.registerAdmin, data);
      if (rs?.data) {
        toast.success("Success", {
          toastId: "success",
          position: "top-right",
        });
        // setToken("token", rs.data.token);
        // setToken("staff", JSON.stringify(rs.data.staff));

        router.push("/");
      }
    } catch (err: any) {
      toast.error(err.error, {
        toastId: "error",
        autoClose: 4000,
        pauseOnHover: true,
        className: "bg-red-500 text-white font-bold ",
        position: "top-right",
      });
    }
  };
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <section className=" bg-gradient-to-br from-[#d09192] to-[#c82471] ">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 ">
          <div className="w-full max-w-sm xl:w-full xl:max-w-md 2xl:max-w-md xl:mx-auto">
            <div className="self- mb-20">
              <Image className="w-sm h-auto" src={smartcash} alt="" />
            </div>
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl "></h2>

            <form className="mt-8" onSubmit={handleSubmit(handleRegister)}>
              <div className="space-y-3 flex flex-col">
                <div>
                  <CustomInput
                    type="text"
                    label="FirstName"
                    required
                    name="firstName"
                    register={register}
                    error={errors.firstName?.message}
                    placeholder="Enter your First Name"
                  />
                </div>
                <div>
                  <CustomInput
                    type="text"
                    label="LastName"
                    required
                    name="lastName"
                    register={register}
                    error={errors.lastName?.message}
                    placeholder="Enter your Last Name"
                  />
                </div>
                <div>
                  <CustomInput
                    type="text"
                    label="Email"
                    required
                    name="staffEmail"
                    register={register}
                    error={errors.staffEmail?.message}
                    placeholder="Enter your Staff Email"
                  />
                </div>
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

                <div className="pt-5">
                  <CustomButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <SpinnerTwo className=" text-center !mx-auto size-5" />
                    ) : (
                      " Register"
                    )}
                  </CustomButton>
                </div>
                <div className=" flex gap-2  items-center text-white">
                  <p>Already have an account ?</p>
                  <Link
                    href="/"
                    className="text-sm hover:underline duration-300 transition-all text-center text-yellow-200"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </form>
            <p className="text-sm mt-5 absolute bottom-3 inset-x-0 w-full text-center font-bold text-gray-300 lg:hidden">
              Powered by: FUNDiT Finance Company Limited
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center flex-col justify-center px-4 py-10 sm:py-16 lg:py-24 bg-white sm:px-6 lg:px-8">
          <div className="h-full w-full">
            <Image
              className="w-sm mx-auto h-auto rotate-"
              src={image1}
              alt=""
            />

            <p className="text-sm text-center font-bold text-[#1d0469]">
              <span className="text-gray-800">Powered by:</span> FUNDiT Finance
              Company Limited
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
