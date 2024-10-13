"use client";
import React, { useState } from "react";
import CustomButton from "../forms/CustomButton";
import { SpinnerTwo } from "../icons/Spinner";
import { Endpoints } from "@/utils/endpoint";
import { processNoAuth } from "@/utils/http";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  staffId: string;
};
const ResendVerification = ({ staffId }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleResendLink = async () => {
    setLoading(true);
    try {
      const res = await processNoAuth("post", Endpoints.resendVerification, {
        staffId: staffId,
      });
      console.log(res, "response");
      if (res?.data.message.toLowerCase() === "verification link sent") {
        setLoading(false);
        toast.success("Check your email for a new Link.");
        // window.location.href ='/'
        console.log(res);
      }
    } catch (error: any) {
      setLoading(false);

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
              Verify It&apos;s You
            </h2>
            <div className="mt-8">
              <p className="text-white mb-6">
                A Verification link has been sent to your email address. Please
                click on the link to verify your account.
              </p>
              <p className="text-sm text-white mb-3">
                If you did not receive the email, please click on the button
                below to get a new one.
              </p>
              <div className="space-y-5 flex flex-col">
                <div>
                  <CustomButton
                    type="button"
                    handleClick={handleResendLink}
                    className="w-full px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    {loading ? (
                      <SpinnerTwo className=" text-center !mx-auto size-5" />
                    ) : (
                      " RESEND LINK"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResendVerification;
