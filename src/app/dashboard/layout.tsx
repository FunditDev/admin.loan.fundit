"use client";
import MoblieNav from "@/components/shared/Header";
import {
  getToken,
  isTokenExpired,
  removeToken,
  removeTokenIfExpired,
} from "@/utils/token";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const router = useRouter();
//   const isTokenExpire = isTokenExpired("token");
//   const token = getToken("token");
//   useEffect(() => {
//     if (isTokenExpire || !token) {
//       removeTokenIfExpired("token")
//       router.push("/");
//     }
//   }, [router]);
  return (
    <div>
      <header className="absolute top-0 h-16 left w-full bg-gradient-to-r from-[#ede6e6] to-[#c82471] overflow-hidden">
        <div className="flex justify-between items-center pr-3 py-3">
          <Link href="/" className="px-2 py-2">
            <Image
              src="/smartcash-logo.svg"
              alt="Fundit Logo"
              width="100"
              height="100"
              className="w-24 h-24 -top-4 left-4 absolute overflow-hidden"
            />
          </Link>
          <button className="" onClick={() => setMobileMenuOpen(true)} disabled>
            <Bars3Icon className="h-8 w-8 text-white inline-block " />
          </button>
          <MoblieNav
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        </div>
      </header>
      <div className="bg-gray-100">
        <div className="container ">
          <div className="flex flex-col items-center justify-center min-h-screen py-20 relative">
            <button
              onClick={() => router.back()}
              className="absolute left-10 top-20 z-20  md:top-24 md:left-10 text-black underline rounded-md"
            >
              Go Back
            </button>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
