"use client";
import CustomAmountInput from "@/components/forms/CustomAmountInput";
import CustomButton from "@/components/forms/CustomButton";
import CustomInput from "@/components/forms/CustomInput";
import Spinner from "@/components/icons/Spinner";
import { Endpoints } from "@/utils/endpoint";
import { processNoAuth } from "@/utils/http";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type StaffType = {
  firstName: string;
  lastName: string;
  staffEmail: string;
  monthlySalary: string;
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
      const res = await processNoAuth(
        "get",
        `${Endpoints.getStaff}/${params.slug}`
      );
      if (res && res.data) {
        setIsFetching(false);
        const data = res.data;
        setStaffDetails({
          ...data,
          monthlySalary: data?.monthlySalary.toLocaleString("en-Us"),
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
    monthlySalary: "0",
    staffId: "",
  });
  const [isfetching, setIsFetching] = useState(true);
  let [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    setIsOpen(true);
  }, []);
  const {
    reset,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<StaffType>();

  useEffect(() => {
    fetchStaff();
  }, []);

  useEffect(() => {
    reset({
      lastName: staffDetails.lastName,
      firstName: staffDetails.firstName,
      staffEmail: staffDetails.staffEmail,
      monthlySalary: staffDetails.monthlySalary,
    });
  }, [staffDetails]);
  const handleUpdate = async (data: StaffType) => {
    console.log(data);
    const confirmSubmit = confirm(
      "Are you sure you want to update this staff?"
    );
    if (confirmSubmit) {
      if (staffDetails.staffEmail !== data.staffEmail) {
        alert("You cannot update the staff email");
        return;
      }
      if (staffDetails.firstName !== data.firstName) {
        alert("You cannot update the staff First Name");
        return;
      }
      try {
        const res = await processNoAuth(
          "post",
          `${Endpoints.updateStaff}?adminId=1234566`,
          {
            ...data,
            monthlySalary: parseFloat(data.monthlySalary.replace(/,/g, "")),
            staffId: staffDetails.staffId,
            updateType: "UPDATE",
          }
        );
        console.log(res);
        toast.success("Update has been sent for Approval", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (e: any) {
        console.log("error -->", e);
        toast.error(e?.message || "An error occured", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      return;
    }
  };
  const handleDelete = async () => {
    return;
    const confirmSubmit = confirm(
      "Are you sure you want to delete this staff?"
    );
    if (confirmSubmit) {
      try {
        const res = await processNoAuth(
          "post",
          `${Endpoints.updateStaff}?adminId=1234566`,
          {
            ...staffDetails,
            monthlySalary: parseFloat(
              staffDetails.monthlySalary.replace(/,/g, "")
            ),
            updateType: "DELETE",
          }
        );
        console.log(res);
      } catch (e: any) {
        console.log("error -->", e);
        toast.error(e?.message || "An error occured", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      return;
    }
  };
  if (isfetching)
    return (
      <div className="flex justify-center items-center">
        <Spinner className="fill-gray-600 h-16 w-16 text-xl stroke-2 animate-spin" />
      </div>
    );

  return (
    <div className="bg-white shadow-sm px-5 sm:px-10 py-10 rounded-md w-full  max-w-[400px] sm:max-w-[500px] sm:min-w-[420px]">
      <h1 className="font-bold text-2xl text-center">Staff - {params.slug}</h1>
      <div className="flex flex-col mt-10">
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="flex space-y-5 flex-col"
        >
          <CustomInput
            register={register}
            placeholder="Staff First Name"
            name="firstName"
            type="text"
            errors={errors.firstName?.message}
            label="Staff First Name"
            disabled
          />
          <CustomInput
            register={register}
            placeholder="Staff Last Name"
            name="lastName"
            type="text"
            errors={errors.lastName?.message}
            label="Staff Last Name"
            
          />

          <CustomAmountInput
            {...register("monthlySalary")}
            placeholder="Update Monthly Salary"
            name="monthlySalary"
            errors={errors.monthlySalary?.message}
            label="Monthly Salary"
          />
          <CustomInput
            register={register}
            placeholder="Email"
            name="staffEmail"
            errors={errors.staffEmail?.message}
            label="Staff Email"
            type="email"
            disabled
            aria-disabled
          />
          <CustomButton disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <Spinner className="fill-white text-5 w-5 mx-auto animate-spin" />
            ) : (
              "Update Staff Details"
            )}
          </CustomButton>
        </form>
        <p className="text-center py-2">Or</p>
        <div>
          <CustomButton
            handleClick={handleDelete}
            className=" !to-red-500 !from-red-500"
            type="button"
            disabled
          >
            Delete Staff
          </CustomButton>
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
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-5 py-8 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Instructions
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      You can only update the Staff&apos;s Monthly Salary and
                      First Name.
                    </p>
                    <p className="text-sm text-gray-500">
                      You cannot update the staff&apos;s Email or Last Name.
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
