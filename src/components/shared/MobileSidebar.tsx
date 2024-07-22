// import { useAppSelector } from "@/redux/types";
import { Transition, Dialog, TransitionChild, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import SmartcashNav from "@components/shared/SmartcashNav";


type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  //   navigation: {
  //     dashboard: { path: string; name: string; icon: any; roles: string[] }[];
  //     profile: { name: string; href: string; icon: any; current: boolean }[];
  //     staff: {
  //       name: string;
  //       href: string;
  //       icon: any;
  //     }[];
  //     smartcash: { name: string; href: string; icon: any }[];
  //   };
  pathname: string;
  type: string;
};
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const MobileSidebar = ({
  sidebarOpen,
  setSidebarOpen,
  pathname,
  type = "dashboard",
}: Props) => {
//   const user = useAppSelector((state) => state.user?.user!);
  return (
    <Transition show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 lg:hidden"
        onClose={setSidebarOpen}
      >
        <TransitionChild
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div className="fixed inset-0 flex">
          <TransitionChild
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
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
               <SmartcashNav/>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MobileSidebar;
