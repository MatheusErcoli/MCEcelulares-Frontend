import { Button } from "@/src/components/ui/Button";
import Link from "next/link";

export const FormLogin = () => {
    return (
      <form className="space-y-6">
        <input
          type="email"
          placeholder="E-mail"
          className="w-full rounded-full bg-gray-200 px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#6211f1]/50"
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full rounded-full bg-gray-200 px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#6211f1]/50"
        />
        
        <Button text="ENTRAR" />

        <div className="text-center">
          <p className="text-gray-600">
            Não tem uma conta?{" "}
            <Link href="/cadastro" className="font-bold text-[#5714d7] hover:underline">
              Registre-se
            </Link>
          </p>
        </div>
      </form>
    );
}
