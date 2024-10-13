import Image from "next/image";
import LoginForm from "@components/home/LoginForm";
import AuthContainer from "@/components/home/AuthContainer";

export default function Home() {
  return (
    <main className="min-h-screen ">
      <AuthContainer />
    </main>
  );
}
