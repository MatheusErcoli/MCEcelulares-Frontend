import { SignCard } from "@/src/components/common/SignCard";
import Link from "next/link";

export default function Login() {
  return (
    <SignCard title="Login">
      <form className="space-y-5">
        <input
          type="text"
          placeholder="Usuário"
          className="w-full rounded-full bg-gray-200 px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#6211f1]/50"
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full rounded-full bg-gray-200 px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#6211f1]/50"
        />
        
        <button
          type="submit"
          className="w-full rounded-full bg-linear-to-r from-[#5714d7] to-[#7929c8] py-4 font-bold text-white transition-opacity hover:opacity-90"
        >
          ENTRAR
        </button>

        {/* Link para Cadastro */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Não tem uma conta?{" "}
            <Link href="/cadastro" className="font-bold text-[#5714d7] hover:underline">
              Registre-se
            </Link>
          </p>
        </div>
      </form>
    </SignCard>
  );
}