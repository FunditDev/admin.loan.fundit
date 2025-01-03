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
        await processNoAuth("post", Endpoints.resendVerification, {
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
            <div className="flex items-center flex-col justify-center max-w-sm w-full mx-auto">
              <form
                className=" flex items-center  flex-col w-full justify-center"
                onSubmit={methods.handleSubmit(handleLoginSumbit)}
              >
                <LoginForm />
                <div className="w-full  mt-8">
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
                </div>
              </form>
              <Link
                href={"/auth/reset-password"}
                className="self-end mt-3 text-blue-100 hover:text-blue-200 duration-300 transition-all"
              >
                Forgot Password
              </Link>
            </div>

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
              <ResendVerification staffId={methods.getValues("staffId")} />
            </motion.div>
          </AnimatePresence>
          <AuthSidebar />
        </div>
      )}
    </section>
  );
};

export default AuthContainer;
