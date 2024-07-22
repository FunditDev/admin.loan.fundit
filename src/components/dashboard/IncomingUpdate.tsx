import { register } from "module";
import React, { useEffect, useState } from "react";
import CustomAmountInput from "../forms/CustomAmountInput";
import CustomButton from "../forms/CustomButton";
import CustomInput from "../forms/CustomInput";
import Spinner, { SpinnerTwo } from "@components/icons/Spinner";
import { useForm } from "react-hook-form";
import { processNoAuth, processWithAuth } from "@/utils/http";
import { Endpoints } from "@/utils/endpoint";
import { toast } from "react-toastify";
import { PendingStaffUpdate, Updatetype } from "@utils/types";
import { useSWRConfig } from "swr";
type Props = {
  slug: string;
  incomingUpdate: Updatetype;
};

const IncomingUpdate = ({ slug, incomingUpdate }: Props) => {
  const {
    reset,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<Updatetype>({});
  const { mutate } = useSWRConfig();
  const [isRejecting, setIsRejecting] = useState(false);
  useEffect(() => {
    reset(incomingUpdate);
  }, [incomingUpdate]);

  const handleUpdate = async (data: Updatetype) => {
    const confirmSubmit = confirm(
      "Are you sure you want to update this staff?"
    );
    if (confirmSubmit) {
      if (incomingUpdate.staffEmail !== data.staffEmail) {
        alert("You cannot update the staff email");
        return;
      }
      if (incomingUpdate.lastName !== data.lastName) {
        alert("You cannot update the staff Last Name");
        return;
      }
      try {
        const res = await processWithAuth(
          "post",
          `${Endpoints.confirmUpdate}`,
          {
            ...data,
            earnings: parseFloat(data.earnings.replace(/,/g, "")),
            staffId: incomingUpdate.staffId,
            updateType: incomingUpdate?.updateType,
          }
        );
        mutate(`${Endpoints.getPendingUpdate}/${slug}`);
        toast.success("Staff updated successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        mutate(`${Endpoints.getPendingUpdate}`);
      } catch (e: any) {
        console.log("error -->", e);
        if (Array.isArray(e?.message)) {
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
  const handleReject = async (data: Updatetype) => {
    setIsRejecting(true);
    try {
      const res = await processWithAuth("post", `${Endpoints.rejectUpdate}`, {
        ...data,
        staffId: incomingUpdate.staffId,
        earnings: parseFloat(incomingUpdate.earnings.replace(/,/g, "")),
        updateType: incomingUpdate?.updateType,
      });
      toast.success("Staff update rejected successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      mutate(`${Endpoints.getPendingUpdate}`);
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
    } finally {
      setIsRejecting(false);
    }
  };
  return (
    <div className="w-full">
      <h3 className="text-center font-bold text-3xl mb-5">
        Incoming Update{" "}
        <span className="text-base">({incomingUpdate?.updateType}) </span>
      </h3>
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="flex space-y-5 flex-col mb-3"
      >
        <CustomInput
          register={register}
          placeholder="Staff First Name"
          name="firstName"
          type="text"
          label="Staff First Name"
          disabled
        />
        <CustomInput
          register={register}
          placeholder="Staff Last Name"
          name="lastName"
          type="text"
          label="Staff Last Name"
          disabled
        />

        <CustomAmountInput
          {...register("earnings")}
          placeholder="Update Earnings"
          name="earnings"
          errors={errors.earnings?.message}
          label="Earnings"
          disabled
        />
        <CustomInput
          register={register}
          placeholder="Email"
          name="staffEmail"
          label="Staff Email"
          type="email"
          disabled
          aria-disabled
        />

        <CustomButton
          disabled={isSubmitting}
          type="submit"
          outerClassName="!w-[300px] mx-auto "
          className="uppercase text-sm"
        >
          {isSubmitting ? (
            <SpinnerTwo className="size-5 !mx-auto" />
          ) : (
            <>
              {incomingUpdate?.updateType === "UPDATE"
                ? "Approve Update"
                : "Approve Delete"}
            </>
          )}
        </CustomButton>
      </form>
      <CustomButton
        disabled={isRejecting}
        type="button"
        handleClick={() => handleReject(incomingUpdate)}
        outerClassName="!w-[300px] mx-auto "
        className="uppercase text-sm bg-red-500 hover:bg-red-600"
      >
        {isRejecting ? (
          <SpinnerTwo className="size-5 !mx-auto" />
        ) : (
          <>Reject Update</>
        )}
      </CustomButton>
    </div>
  );
};

export default IncomingUpdate;
