"use client";
import CustomAmountInput from "@/components/forms/CustomAmountInput";
import CustomButton from "@/components/forms/CustomButton";
import CustomInput from "@/components/forms/CustomInput";
import Spinner, { SpinnerTwo } from "@/components/icons/Spinner";
import { Endpoints } from "@/utils/endpoint";
import { processNoAuth, processWithAuth } from "@/utils/http";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
        // console.log(data, "data -->");
        setStaffDetails({
          ...data,
          earnings: data?.earnings.toLocaleString("en-Us"),
        });
      }
    } catch (e) {
      setIsFetching(false);
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
  useEffect(() => {
    setIsOpen(true);
  }, []);
  const {
    reset,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    getValues,
  } = useForm<StaffType>();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchStaff();
  }, []);

  useEffect(() => {
    reset({
      lastName: staffDetails.lastName,
      firstName: staffDetails.firstName,
      staffEmail: staffDetails.staffEmail,
      earnings: staffDetails.earnings,
    });
  }, [staffDetails]);
  const handleUpdate = async (data: StaffType) => {
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
        const res = await processWithAuth(
          "post",
          `${Endpoints.updateStaff}`,
          {
            ...data,
            earnings: parseFloat(data.earnings.replace(/,/g, "")),
            staffId: staffDetails.staffId,
            updateType: "UPDATE",
          }
        );
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
        if (Array.isArray(e.message)) {
          toast.error(e?.message[0] || "An error occured", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
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
  const handleUpdateApprove = async (data: StaffType) => {
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
      setIsUpdating(true);
      try {
        const res = await processWithAuth(
          "post",
          `${Endpoints.updateAndApprove}`,
          {
            ...data,
            earnings: parseFloat(data.earnings.replace(/,/g, "")),
            staffId: staffDetails.staffId,
            updateType: "UPDATE",
          }
        );
        setIsUpdating(false);
        toast.success("Update Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (e: any) {
        setIsUpdating(false);
        if (Array.isArray(e.message)) {
          toast.error(e?.message[0] || "An error occured", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
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
  }
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
            earnings: parseFloat(staffDetails.earnings.replace(/,/g, "")),
            updateType: "DELETE",
          }
        );
      } catch (e: any) {
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
      <div className="flex justify-center items-center py-20">
        <SpinnerTwo className="!h-10 !w-10  stroke-2" />
      </div>
    );

  return (
    <div className="bg-white shadow-sm px-5 sm:px-10 py-10 rounded-md w-full  max-w-[400px] mx-auto sm:max-w-[600px] sm:min-w-[420px]">
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
            {...register("earnings")}
            placeholder="Update Earnings"
            name="earnings"
            errors={errors.earnings?.message}
            label="Earnings"
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
          <div className=" flex gap-4 sm:gap-10 items-center flex-col sm:flex-row">

          <CustomButton disabled={isSubmitting || isUpdating} type="submit" outerClassName="w-full">
            {isSubmitting ? (
              <SpinnerTwo className="!w-5 !mx-auto" />
            ) : (
              "Update Staff Details"
            )}
          </CustomButton>
          <CustomButton disabled={isSubmitting || isUpdating} type="button" outerClassName="w-full" handleClick={()=>handleUpdateApprove(getValues())}>
            {isUpdating ? (
              <SpinnerTwo className="!w-5 !mx-auto" />
            ) : (
              "Update And Approve"
            )}
          </CustomButton>
          </div>
        </form>
        {/* Uncomment if need for deleting staff arise */}
        {/* <p className="text-center py-2">Or</p> */}
        {/* <div>
          <CustomButton
            handleClick={handleDelete}
            className=" !to-red-500 !from-red-500 cursor-not-allowed"
            type="button"
            disabled
          >
            Delete Staff
          </CustomButton>
        </div> */}
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
                      You can only update the Staff&apos;s Earnings and First
                      Name.
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
