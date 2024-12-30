"use client";
import React, { useEffect, useState } from "react";
import AuthSidebar from "@components/home/AuthSidebar";
import ResetForm from "./ResetForm";
import { Endpoints } from "@/utils/endpoint";
import { processNoAuth } from "@/utils/http";
import { LoginType, ResetType } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

import { toast } from "react-toastify";
import * as yup from "yup";
import CustomButton from "../../forms/CustomButton";
import { SpinnerTwo } from "../../icons/Spinner";
import { useRouter, useSearchParams } from "next/navigation";
// import ResendVerification from "./ResendVerification";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import ConfirmResetPassword from "./ConfirmResetPassword";

const schema = yup.object().shape({
  email: yup.string().trim().required("Password is required"),
});

const ResetContainer = () => {
  const [steps, setSteps] = useState(0);
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  useEffect(() => {
    if (token) {
      console.log(token);
      setSteps(1);
    }
  }, [token]);

  const handleResettoken = async (data: ResetType) => {
    // router.push("/dashboard");
    try {
      const rs = await processNoAuth("post", Endpoints.sendResetToken, data);
      if (rs?.data) {
        toast.success(rs.data.message, {
          toastId: "success",
          position: "top-right",
        });
      }
    } catch (err: any) {
      if (err.status === 401) {
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
    <section className=" bg-gradient-to-br from-[#d09192] to-[#c82471]  ">
      {steps === 0 ? (
        <FormProvider {...methods}>
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen ">
            <div className="flex items-center flex-col justify-center max-w-sm w-full mx-auto">
              <form
                className=" flex items-center  flex-col w-full justify-center"
                onSubmit={methods.handleSubmit(handleResettoken)}
              >
                <ResetForm />
                <div className="w-full  mt-8">
                  <CustomButton
                    type="submit"
                    disabled={methods.formState.isSubmitting}
                  >
                    {methods.formState.isSubmitting ? (
                      <SpinnerTwo className=" text-center !mx-auto size-5" />
                    ) : (
                      " Send Email Reset Link"
                    )}
                  </CustomButton>
                </div>
              </form>
              <div className="flex justify-between items-center w-full mt-3 text-yellow-200">
                <p className="">Remember your password? </p>
                <Link
                  href={"/"}
                  className=" text-yellow-100 hover:text-yellow-300 duration-300 transition-all"
                >
                  Login
                </Link>
              </div>
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
              <ConfirmResetPassword token={token!} />
            </motion.div>
          </AnimatePresence>
          <AuthSidebar />
        </div>
      )}
    </section>
  );
};

export default ResetContainer;
