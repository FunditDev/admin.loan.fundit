"use client";
import CustomAmountInput from "@/components/forms/CustomAmountInput";
import CustomButton from "@/components/forms/CustomButton";
import CustomInput from "@/components/forms/CustomInput";
import Spinner, { SpinnerTwo } from "@/components/icons/Spinner";
import { Endpoints } from "@/utils/endpoint";
import { processNoAuth, processWithAuth } from "@/utils/http";
import {
  Transition,
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PendingStaffUpdate, Updatetype } from "@/utils/types";
import IncomingUpdate from "@/components/dashboard/IncomingUpdate";

type StaffType = {
  firstName: string;
  lastName: string;
  staffEmail: string;
  earnings: string;
  staffId: string;
};

const Page = ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const fetchStaff = async () => {
    setIsFetching(true);
    try {
      const res = await processWithAuth(
        "get",
        `${Endpoints.getStaff}/${params.slug}`
      );
      if (res && res.data) {
        setIsFetching(false);
        const data = res.data;
        setStaffDetails({
          ...data,
          earnings: data?.earnings.toLocaleString("en-NG"),
        });
      }
    } catch (e) {
      setIsFetching(false);
      console.log("error -->", e);
    }
  };
  const [staffDetails, setStaffDetails] = useState<StaffType>({
    firstName: "",
    lastName: "",
    staffEmail: "",
    earnings: "0",
    staffId: "",
  });
  const [isfetching, setIsFetching] = useState(true);
  let [isOpen, setIsOpen] = useState(true);

  const {
    reset,
    register,
    formState: { errors },
  } = useForm<StaffType>();

  useEffect(() => {
    fetchStaff();
  }, []);

  useEffect(() => {
    reset({
      firstName: staffDetails.firstName,
      lastName: staffDetails.lastName,
      staffEmail: staffDetails.staffEmail,
      earnings: staffDetails.earnings,
    });
  }, [staffDetails]);
  const [incomingUpdate, setIncomingUpdate] =
    useState<PendingStaffUpdate | null>(null);
  const fetchUpdate = async () => {
    try {
      const res = await processWithAuth(
        "get",
        `${Endpoints.getPendingUpdate}/${params.slug}`
      );
      return res?.data;
    } catch (error) {
      console.log("error -->", error);
      return null;
    }
  };
  useEffect(() => {
    (async () => {
      const update = await fetchUpdate();
      if (update && update?.earnings) {
        setIncomingUpdate({
          ...update,
          earnings: update?.earnings?.toLocaleString("en-Us"),
        });
      }
    })();
  }, []);
//   console.log(incomingUpdate, "incomingUpdate");
  if (isfetching)
    return (
      <div className="flex justify-center items-center py-36">
        <SpinnerTwo className=" !h-10 !w-10 stroke-2 " />
      </div>
    );

  return (
    <div className="px-5 sm:px-10 py-10 rounded-md w-full  ">
      <h1 className="font-bold text-2xl text-center">Staff - {params.slug}</h1>
      <div className="flex flex-col mt-10">
        <div className="flex gap-20">
          <div className="w-full max-w-[500px]">
            <h3 className="text-center font-bold text-3xl mb-5">
              Current Profile
            </h3>
            <form
              className="flex space-y-5 flex-col "
              action={"#"}
              method="null"
            >
              <CustomInput
                register={register}
                placeholder="Staff First Name"
                name="firstName"
                type="text"
                label="First Name"
                disabled
                className=" cursor-not-allowed"
              />

              <CustomInput
                register={register}
                placeholder="Staff Last Name"
                name="lastName"
                type="text"
                label="Last Name"
                disabled
                className=" cursor-not-allowed"
              />
              <CustomAmountInput
                {...register("earnings")}
                placeholder="Update Earnings"
                name="earnings"
                errors={errors.earnings?.message}
                label="Earnings"
                disabled
                className=" cursor-not-allowed"
              />
              <CustomInput
                register={register}
                placeholder="Email"
                name="staffEmail"
                label="Staff Email"
                type="email"
                disabled
                aria-disabled
                className=" cursor-not-allowed"
              />
            </form>
          </div>
          {incomingUpdate ? (
            <IncomingUpdate
              slug={params.slug}
              incomingUpdate={incomingUpdate as unknown as Updatetype}
            />
          ) : (
            <div className="w-full max-w-[500px]">
              <h3 className="text-center font-bold text-3xl mb-5">
                No Incoming Update
              </h3>
            </div>
          )}
        </div>
      </div>
      <InstructionModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Page;

type InstructionModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const InstructionModal = ({ isOpen, setIsOpen }: InstructionModalProps) => {
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-5 py-8 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Instructions
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Check the incoming update to approve or reject the update.
                    </p>
                    <p className="text-sm text-gray-600 font-medium">
                      {" "}
                      Note: You can&apos;t edit any of the fields.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Okay !
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
