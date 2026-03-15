import { SignCard } from "@/src/components/common/SignCard";
import Link from "next/link";
import { SignupForm } from "./components/SignupForm";

export default function Cadastro() {
  return (
    <SignCard title="Cadastro" backHref="/">
      <SignupForm />

      <div className="text-center mt-6">
        <p className="text-gray-600">
          Já tem uma conta?{" "}
          <Link href="/login" className="font-bold text-[#5714d7] hover:underline">
            Faça Login
          </Link>
        </p>
      </div>
    </SignCard>
  );
}