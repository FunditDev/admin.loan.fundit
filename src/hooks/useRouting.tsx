import { useRouter } from "next/navigation";

export const useRouting = () => {
    console.log("useRouting -->")
  return useRouter()
};
