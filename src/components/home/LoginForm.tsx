"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import CustomInput from "../forms/CustomInput";
import { LoginType } from "@utils/types";
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

const schema = yup.object().shape({
  staffId: yup.string().trim().required("Staff Id is required"),
  password: yup.string().trim().required("Password is required"),
});

const LoginForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<LoginType>({
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
  const handleLoginSumbit = async (data: LoginType) => {
    // router.push("/dashboard");
    try {
      const rs = await processNoAuth("post", Endpoints.loginAdmin, data);
      if (rs?.data) {
        toast.success("Login Successful", {
          toastId: "success",
          position: "top-right",
        });
        setToken("token", rs.data.token);
        setToken("staff", JSON.stringify(rs.data.staff));

        router.push("/dashboard");
        // router.push("/dashboard");
      }
    } catch (err: any) {
      if (err.status === 401) {
        alert("Invalid Staff Id");
      } else {
        toast.error(err.message, {
          toastId: "error",
          autoClose: 4000,
          pauseOnHover: true,
          className: "bg-red-500 text-white font-bold ",
          position: "top-right",
        });
      }
    }
  };
  return (
    <section className=" bg-gradient-to-br from-[#d09192] to-[#c82471] ">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 ">
          <div className="w-full max-w-sm xl:w-full xl:max-w-md 2xl:max-w-md xl:mx-auto">
            <div className="self- mb-20">
              <Image className="w-sm h-auto" src={smartcash} alt="" />
            </div>
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl "></h2>

            <form className="mt-8" onSubmit={handleSubmit(handleLoginSumbit)}>
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

                <div>
                  <CustomButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <SpinnerTwo
                        className=" text-center !mx-auto size-5"
                      />
                    ) : (
                      " LOGIN"
                    )}
                  </CustomButton>
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
            {/* <Image
              className="w-sm mx-auto h-auto -rotate-6"
              src={image2}
              alt=""
            /> */}

            <p className="text-sm text-center font-bold text-[#1d0469]">
              <span className="text-gray-800">Powered by:</span> FUNDiT Finance
              Company Limited
            </p>
            {/* <div className="w-full max-w-md mx-auto xl:max-w-xl">
              <h3 className="text-2xl font-bold text-center text-black">
                Design your own card
              </h3>
              <p className="leading-relaxed text-center text-gray-500 mt-2.5">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis.
              </p>

              <div className="flex items-center justify-center mt-10 space-x-3">
                <div className="bg-orange-500 rounded-full w-20 h-1.5"></div>

                <div className="bg-gray-200 rounded-full w-12 h-1.5"></div>

                <div className="bg-gray-200 rounded-full w-12 h-1.5"></div>
              </div>  
                    </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
