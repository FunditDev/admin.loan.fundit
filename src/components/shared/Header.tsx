"use client";
import { Endpoints } from "@utils/endpoint";
import { processWithAuth } from "@utils/http";
import { removeToken } from "@/utils/token";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  UserCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect } from "react";
import { toast } from "react-toastify";
type Props = {
  setSidebarOpen: (value: boolean) => void;
};
const Header = ({ setSidebarOpen }: Props) => {
  // const user = useAppSelector((state) => state.user?.user);
  // const dispatch = useAppDispatch();
  const [user, setUser] = React.useState<any>();
  const router = useRouter();
  useEffect(() => {
    const storeUser =
      window.localStorage !== undefined &&
      (localStorage.getItem("staff")! as any);
    if (!storeUser) {
      router.push("/");
    }
    setUser(JSON.parse(storeUser));
  }, []);

  const handleLogOut = async () => {
    try {
      toast.success("Logout Successful");
      removeToken("token");
      const res = await processWithAuth("get", Endpoints.logout);
      // removeToken("refreshToken");
      router.push("/");
      // dispatch(logOutUser());
      // await logoutAction();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    } finally {
      toast.success("Logout Successful");
      removeToken("token");
      router.push("/");
      // dispatch(logOutUser());
      // await logoutAction();
    }
  };
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex items-center  flex-1 justify-end gap-x-4 lg:gap-x-6">
          <div
            className="hidden lg:block justify-end lg:h-6 lg:w-px lg:bg-gray-900/10"
            aria-hidden="true"
          />
          <Menu as="div" className="relative">
            <MenuButton className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <UserCircleIcon
                className="h-6 w-6 text-gray-400"
                aria-hidden="true"
              />
              <span className="flex lg:items-center">
                <span
                  className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="true"
                >
                  {user?.firstName} {user?.lastName}
                </span>
                <ChevronDownIcon
                  className="ml-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </MenuButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <MenuItem>
                  <button
                    className=" px-3 py-1 text-sm leading-6 text-gray-900 flex gap-4 justify-center items-center"
                    onClick={handleLogOut}
                  >
                    <UserCircleIcon className="w-6 h-6 text-black" />
                    <span>Logout</span>
                  </button>
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
