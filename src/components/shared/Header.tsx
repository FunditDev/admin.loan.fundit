"use client";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const navigation = [];
type MoblieNavProps = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (val: boolean) => void;
};
const MoblieNav = ({ mobileMenuOpen, setMobileMenuOpen }: MoblieNavProps) => {
  return (
    <Dialog
      as="div"
      className=""
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
    >
      <div className="fixed inset-0 z-10" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px pb-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between gap-x-6 h-16 !bg-transparent ">
          <div className="flex items-center justify-between w-full px-6">
            <Link href="/" className="px-2 py-2 inline-flex">
              <span className="sr-only">smartcash</span>
              <Image
                src="/smartcash-logo.svg"
                alt="Fundit Logo"
                width="100"
                height="100"
                className="w-24 h-24 -top-4 left-4 absolute overflow-hidden"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="mt-6 flow-root ">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6 w-full">
              <Link
                href={"/loan-records"}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-5 bg-gray-50 w-full inline-flex font-medium"
              >
                Loan Records
              </Link>
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default MoblieNav;
