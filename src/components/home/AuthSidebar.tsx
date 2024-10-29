import React from "react";
import image1 from "@public/login/approved-loan-png.jpeg";
import Image from "next/image";

const AuthSidebar = () => {
  return (
    <div className="hidden lg:flex items-center flex-col justify-center px-4 py-10 sm:py-16 lg:py-24 bg-white sm:px-6 lg:px-8">
      <div className="">
        <Image className="w-sm mx-auto h-auto rotate-" src={image1} alt="" />

        <p className="text-sm text-center font-bold text-[#1d0469]">
          <span className="text-gray-800">Powered by:</span> FUNDiT Finance
          Company Limited
        </p>
      </div>
    </div>
  );
};

export default AuthSidebar;
