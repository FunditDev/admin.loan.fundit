"use client";
import LargeSidebar from "@components/shared/LargeSidebar";
import MobileSidebar from "@components/shared/MobileSidebar";
import Header from "@/components/shared/Header";
import DesktopSidebar from "@components/shared/SmartcashNav";
// import { useAppSelector } from "@/redux/types";
import { smartcash } from "@utils/routes";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getToken, isTokenExpired, removeTokenIfExpired } from "@/utils/token";

const SmartcashLayout = ({ children }: { children: React.ReactNode }) => {
  //   const { user } = useAppSelector((state) => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  //   useEffect(() => {
  //     if (
  //       user &&
  //       !user.role.includes("superadmin") &&
  //       !user.role.includes("admin")
  //     ) {
  //       router.push("/dashboard");
  //     }
  //   }, []);
  const isTokenExpire = isTokenExpired("token");
  const token = getToken("token");
  const staff = getToken("staff");
  useEffect(() => {
    if (isTokenExpire || !token) {
      removeTokenIfExpired("token");
      router.push("/");
    }
  }, [isTokenExpire, router, token]);
  return (
    <div>
      <LargeSidebar type="smartcash" pathname={pathname} />
      <MobileSidebar
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        pathname={pathname}
        type="smartcash"
      />
      <div className="lg:pl-72">
        {/* <Header /> */}
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="pb-10">
          <div className="px-4 sm:px-6:lg:px-8">{children}</div>
        </main>
      </div>
      {/* <DesktopSidebar /> */}
    </div>
  );
};

export default SmartcashLayout;
