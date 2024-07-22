import Image from "next/image";
import Link from "next/link";
import React from "react";
import SmartcashNav from "@components/shared/SmartcashNav";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
type Props = {
  pathname: string;
  type: string;
};
const LargeSidebar = ({ pathname, type = "dashboard" }: Props) => {
  //   const user = useAppSelector((state) => state.user?.user!);
  return (
    <div>
      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center justify-between">
            <Link href={"/dashboard"}>
              <Image
                className="h-8 w-auto"
                src="/smartcash-logo.svg"
                alt="Your Company"
                width={32}
                height={32}
              />
            </Link>
          </div>
          <SmartcashNav />
        </div>
      </div>
    </div>
  );
};

export default LargeSidebar;
