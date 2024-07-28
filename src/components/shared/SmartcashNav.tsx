"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { usePendingUpdate } from "@hooks/usePendingUpdate";
import { smartcash } from "@utils/routes";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const SmartcashNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data, isLoading, error } = usePendingUpdate();
  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-3">
        {smartcash.map((item) => {
          if (item.href === "/dashboard/staff/staff-updates") {
            return (
              <li key={item.name}>
                <Link
                  href={`${item.href}`}
                  className={`${classNames(
                    item.href === pathname
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  )} ${
                    data && data.length > 0
                      ? "!bg-red-500 text-white animate-pulse"
                      : "text-gray-400"
                  } `}
                >
                  <div className="flex space-x-4 items-center">
                    <item.icon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item.name}</span>
                  </div>
                  {data && data.length > 0 && (
                    <span className="rounded-full bg-white text-red-500 px-2">
                      {data && data.length > 0 && data.length}
                    </span>
                  )}
                </Link>
              </li>
            );
          } else {
            return (
              <li key={item.name}>
                <Link
                  href={`${item.href}`}
                  className={`${classNames(
                    item.href === pathname
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  )} `}
                >
                  <div className="flex space-x-4 items-center">
                    <item.icon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item.name}</span>
                  </div>
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
};

export default SmartcashNav;
