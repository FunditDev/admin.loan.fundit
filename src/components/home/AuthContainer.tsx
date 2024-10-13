"use client";
import React, { useState } from "react";
import AuthSidebar from "./AuthSidebar";
import LoginForm from "./LoginForm";
import { Endpoints } from "@/utils/endpoint";
import { processNoAuth } from "@/utils/http";
import { setToken } from "@/utils/token";
import { LoginType } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import CustomButton from "../forms/CustomButton";
import { SpinnerTwo } from "../icons/Spinner";
import { useRouter } from "next/navigation";
import ResendVerification from "./ResendVerification";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const schema = yup.object().shape({
  staffId: yup.string().trim().required("Staff Id is required"),
  password: yup.string().trim().required("Password is required"),
});
const AuthContainer = () => {
  const router = useRouter();
  const [steps, setSteps] = useState(0);
  const methods = useForm({
    resolver: yupResolver(schema),
  });

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
      if (
        err.statusCode === 400 &&
        err.error.toLowerCase() === "please verify your email"
      ) {
        setSteps(1);
        const res = await processNoAuth("post", Endpoints.resendVerification, {
          staffId: data.staffId,
        });
      } else if (err.status === 401) {
        alert("Invalid Staff Id");
      } else {
        toast.error(err.error, {
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
      {steps === 0 ? (
        <FormProvider {...methods}>
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen ">
            <form
              className=" flex items-center  flex-col w-full justify-center"
              onSubmit={methods.handleSubmit(handleLoginSumbit)}
            >
              <LoginForm />
              <div className="w-full max-w-sm xl:w-full xl:max-w-md 2xl:max-w-md mx-auto mt-8">
                <CustomButton
                  type="submit"
                  disabled={methods.formState.isSubmitting}
                >
                  {methods.formState.isSubmitting ? (
                    <SpinnerTwo className=" text-center !mx-auto size-5" />
                  ) : (
                    " LOGIN"
                  )}
                </CustomButton>
                <div className=" flex justify-between  items-center text-white mt-5 w-full">
                  <div className="flex gap-2  items-center text-white">
                    <p>Don&apos;t have an account ?</p>
                    <Link
                      href="/register"
                      className="text-sm hover:underline duration-300 transition-all text-center text-yellow-200"
                    >
                      Sign Up
                    </Link>
                  </div>
                  {/* <Link
                    href={"/forget-password"}
                    className="text-yellow-300 hover:text-yellow-500 duration-300 transition-all"
                  >
                    Forget Password ?
                  </Link> */}
                </div>
              </div>
            </form>
            <AuthSidebar />
          </div>
        </FormProvider>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <AnimatePresence>
            <motion.div
              className=" flex items-center  flex-col w-full justify-center"
              initial={{
                opacity: 0,
                x: -200,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
            >
              <ResendVerification staffId={methods.getValues('staffId')}/>
            </motion.div>
          </AnimatePresence>
          <AuthSidebar />
        </div>
      )}
    </section>
  );
};

export default AuthContainer;
