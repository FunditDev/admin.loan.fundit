import React from "react";
import image1 from "@public/login/approved-loan-png.jpeg";
import Image from "next/image";

const AuthSidebar = () => {
  return (
    <div className="hidden lg:flex items-center flex-col justify-center px-4 py-10 sm:py-16 lg:py-24 bg-white sm:px-6 lg:px-8">
      <div className="">
        <Image className="w-sm mx-auto h-auto rotate-" src={image1} alt="" />
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
  );
};

export default AuthSidebar;
