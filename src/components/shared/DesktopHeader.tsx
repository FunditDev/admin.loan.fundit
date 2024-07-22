"use client";
import {
  getToken,
  removeToken,
} from "@/utils/token";
import {
  
  ArrowRightEndOnRectangleIcon,
  ChevronDownIcon,
  Square2StackIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import MoblieNav from "./Header";
import Image from "next/image";
import { Bars3Icon, HomeIcon, UsersIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

const DesktopHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const router = useRouter();
  const staff = getToken("staff");

  const signOut = () => {
    removeToken("token");
    removeToken("staff");
    router.push("/");
  };
  const parsedStaff = staff ? JSON.parse(staff!) : null;
  return (
    <header className="w-full bg-gradient-to-r from-[#ede6e6] to-[#c82471] overflow-hidden">
      <div className="flex justify-between items-center pr-3 py-4">
        <Link href="/" className="px-2 py-2">
          <Image
            src="/smartcash-logo.svg"
            alt="Fundit Logo"
            width="100"
            height="100"
            className="w-24 h-24 -top-4 left-4 absolute overflow-hidden"
          />
        </Link>
        <div className="flex gap-3 text-white text-sm font-semibold items-center">
          <p>
            {parsedStaff &&
              `${parsedStaff?.firstName} ${parsedStaff?.lastName}`}
          </p>

          <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-md  py-1.5 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white">
              Menu
              <ChevronDownIcon className="size-4 fill-white/60" />
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="w-40 origin-top-right z-50 rounded-xl border border-white/5 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              {routes.map((route) => (
                <MenuItem key={route.name}>
                  <Link
                    href={route.href}
                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 "
                  >
                    <route.icon className="size-4 fill-black" />
                    {route.name}
                    <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                      ⌘E
                    </kbd>
                  </Link>
                </MenuItem>
              ))}

              <MenuItem>
                <button
                  className=" group flex w-full items-center gap-2 rounded-lg py-1.5 px-3"
                  onClick={signOut}
                >
                  <ArrowRightEndOnRectangleIcon className="size-4 fill-black" />
                  Logout
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
        <MoblieNav
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </div>
    </header>
  );
};

export default DesktopHeader;

const routes = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Loans",
    href: "/dashboard/loans",
    icon: Square2StackIcon,
  },
  {
    name: "staff",
    href: "/dashboard/staff",
    icon: UsersIcon,
  },
];
