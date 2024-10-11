import Image from "next/image";
import LoginForm from "@components/home/LoginForm";
import RegisterForm from "@/components/home/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen ">
      <RegisterForm/>
    </main>
  );
}
