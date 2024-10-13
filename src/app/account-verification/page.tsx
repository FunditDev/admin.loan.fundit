"use client";
import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { processNoAuth } from "@/utils/http";
import { Endpoints } from "@/utils/endpoint";
import { SpinnerTwo } from "@/components/icons/Spinner";
import { toast } from "react-toastify";

const page = () => {
  const params = useSearchParams();
  const router = useRouter();
  console.log("params -->", params.get("token"));
  const token = params.get("token");
  const handleEmailVerification = async () => {
    try {
      const res = await processNoAuth("post", Endpoints.verifyEmail, {
        token,
      });
      if (res?.data && res.status === 200) {
        router.push("/");
      }
    } catch (e: any) {
      if (e.error && e.error.toLowerCase() === "invalid token") {
        toast.error("Invalid Link, Sign In to get a new Link", {
          position: "top-right",
        });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        toast.error(e.error);
      }
    }
  };
  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    } else {
      (async () => {
        await handleEmailVerification();
      })();
    }
  }, []);
  return (
    <div className=" h-screen">
      <div className="h-full w-full flex flex-col gap-4 items-center justify-center">
        <div className="">
          <p className="">
            Verifying your email address, please wait while we verify your email
            address
          </p>
        </div>
        <SpinnerTwo className="h-10 w-10 block" />
      </div>
    </div>
  );
};

export default page;
