"use client";
import { useSingleSmartcashloan } from "@/hooks/usePendingUpdate";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import CustomInput from "@/components/forms/CustomInput";
import CustomAmountInput from "@/components/forms/CustomAmountInput";
import CustomButton from "@/components/forms/CustomButton";
import { SpinnerTwo } from "@components/icons/Spinner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { processWithAuth } from "@utils/http";
import { mutate } from "swr";
import { formatAmount, timeFormatter } from "@/utils/helper";
import { toast } from "react-toastify";

type LoanUpdateProps = {
  amount: string;
};

const schema = yup.object().shape({
  amount: yup.string().required("Amount is required"),
});

const LoanUpdatePage = ({ params }: { params: { slug: string } }) => {
  const searchParams = useSearchParams();
  const staffId = searchParams.get("staffId");
  const { data,isLoading } = useSingleSmartcashloan({
    loanId: params.slug,
    staffId: staffId!,
  });
  console.log(data, "loan");
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="max-w-2xl mx-auto text-3xl sm:text-4xl font-medium text-gray-800 text-center">
        Loan Repayment schedule
      </h2>
      <div className="overflow-x-auto  mt-20">
        <table className="border border-collapse w-full whitespace-nowrap">
          <thead>
            <tr className="*:px-2 *:py-2 *:border text-center">
              <td>Month </td>
              <td>Amount</td>
              <td>Partial Repayment</td>
              <td>Remainder</td>
              <td>Date Repaid</td>
              <td>Due Payment Date</td>
            </tr>
          </thead>
          <tbody>
          {isLoading &&
              Array.from({ length: 6 }).map((_, index) => (
                <tr
                  key={index}
                  className="*:px-2 *:py-2 *:border *:text-center *:text-sm"
                >
                  <td
                    colSpan={10}
                    className={`${
                      index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
                    } animate-pulse h-10`}
                  ></td>
                </tr>
              ))}
           
            {data &&
              data.loanTenure &&
              data.loanTenure.map((loan, index) => (
                <tr
                  key={loan.month}
                  className="*:px-2 *:py-2 *:border *:text-center *:text-sm "
                >
                  <td>{loan.month}</td>
                  <td>
                    {parseFloat(
                      formatAmount(loan.originalAmount)
                    ).toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    })}
                    
                  </td>
                  <td>
                    {!loan.partialPayment
                      ? (0).toLocaleString("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        })
                      : loan.partialPayment.toLocaleString("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        })}
                  </td>
                  <td>
                    {loan.partialPayment && !loan.fullyPaid
                      ? (
                          parseFloat(formatAmount(loan.originalAmount)) -
                          loan.partialPayment
                        ).toLocaleString("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        })
                      : (0).toLocaleString("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        })}
                  </td>

                  <td>
                    {loan.dateFullyPaid
                      ? timeFormatter(loan.dateFullyPaid)
                      : null}
                  </td>
                  <td>
                    {timeFormatter(loan.repaymentDate)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="mt-20 ">
          <h2 className="max-w-2xl mx-auto text-3xl sm:text-4xl font-medium text-gray-800 text-center">
            Repayment History
          </h2>
          <div className="mt-8 overflow-x-auto">
            <table className="border border-collapse w-full whitespace-nowrap">
              <thead>
                <tr className="*:px-2 *:py-2 *:border text-center">
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data && data.repayment && data.repayment.length > 0 ? (
                  data.repayment.map((repayment, index) => (
                    <tr
                      key={index}
                      className="*:px-2 *:py-2 *:border *:text-center *:text-sm "
                    >
                      <td>
                        {repayment.repaymentAmount.toLocaleString("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        })}
                      </td>
                      <td>{timeFormatter(repayment.date)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-center" colSpan={2}>No repayment has been made</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanUpdatePage;
