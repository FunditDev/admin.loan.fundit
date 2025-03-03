"use client";
import CustomAmountInput from "@/components/forms/CustomAmountInput";
import CustomButton from "@/components/forms/CustomButton";
import CustomInput from "@/components/forms/CustomInput";
import { SpinnerTwo } from "@/components/icons/Spinner";
import { processWithAuth } from "@/utils/http";
import { Endpoints } from "@/utils/endpoint";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type AddStaffType = {
  firstName: string;
  lastName: string;
  staffEmail: string;
  earnings: string;
  staffId: string;
  bankAccount: string;
  bankName: string;
  bvn: string;
  legalEmployer: string;
  
};
const companyCode = process.env.NEXT_PUBLIC_COMPANY_CODE;
const AddStaffPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddStaffType>({
    defaultValues: { bankName: "Fundit" },
  });
  const router = useRouter();
  const handleStaffAdd = async (data: AddStaffType) => {
    const confirmSubmit = confirm(
      "Are you sure you want to add this staff and all the details are correct?"
    );
    if (confirmSubmit) {
      try {
        const res = await processWithAuth("post", `${Endpoints.addNewStaff}/${companyCode}`, {
          ...data,
          earnings: parseFloat(data.earnings.replace(/,/g, "")),
          bankAccount: data.bankAccount,
        });
        if (res) {
          toast.success("Staff Added Successfully", {
            position: "top-right",
            autoClose: 5000,
          });
          router.push("/dashboard/staff");
        }
      } catch (e: any) {
        console.log(e, "hdhdjd");
        if (Array.isArray(e.error)) {
          // e.error.forEach((err) => {
          //   toast.error(err);
          // });
          toast.error(e.error[0]);
        } else {
          toast.error(e.error);
        }
      }
    } else {
      return;
    }
  };
  return (
    <div className=" px-5 sm:px-10 py-10 max-w-3xl mx-auto rounded-md w-full  ">
      <h1 className="font-bold text-2xl text-center">Add New Staff</h1>
      <div className="flex flex-col mt-10 w-full">
        <div className="flex gap-20 w-full">
          <form
            onSubmit={handleSubmit(handleStaffAdd)}
            className="w-full space-y-4 mx-auto"
          >
            <div className="flex max-md:flex-col gap-6 lg:justify-between w-full">
              <CustomInput
                name="firstName"
                type="text"
                register={register}
                placeholder="Enter First Name"
                label="First Name"
                // outerClass="w-full"
              />
              <CustomInput
                name="lastName"
                type="text"
                register={register}
                placeholder="Enter Last Name"
                label="Last Name"
              />
            </div>
            <div className="flex max-md:flex-col gap-6">
              <CustomInput
                name="staffId"
                type="text"
                register={register}
                placeholder="Enter Staff Id"
                label="Staff Id"
              />
              <CustomAmountInput
                {...register("earnings")}
                placeholder="Enter Earnings"
                name="earnings"
                errors={errors.earnings?.message}
                label="Earnings"
                className="!text-black w-full"
                outerClassName="w-full"
              />
            </div>
            <CustomInput
              register={register}
              placeholder="Enter Email"
              name="staffEmail"
              label="Email"
              type="email"
            />
            <div className="flex max-md:flex-col gap-6">
              <CustomInput
                name="bankAccount"
                type="text"
                register={register}
                placeholder="Enter Bank Account No"
                label="Bank Account No"
              />
              <CustomInput
                name="bankName"
                type="text"
                disabled
                register={register}
                placeholder="Enter Bank Name"
                label="Bank Name "
              />
            </div>
            <div className="flex max-md:flex-col gap-6">
              <CustomInput
                name="bvn"
                type="text"
                register={register}
                placeholder="Enter BVN"
                label="BVN"
              />
              <CustomInput
                name="legalEmployer"
                type="text"
                register={register}
                placeholder="Enter Legal Employer"
                label="Legal Employer"
              />
            </div>
            <div className="mx-auto">
              <CustomButton
                type="submit"
                className="mt-10"
                outerClassName="mx-auto max-w-[300px]"
              >
                {isSubmitting ? (
                  <SpinnerTwo className="!w-5 !mx-auto " />
                ) : (
                  "Add Staff"
                )}
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStaffPage;
