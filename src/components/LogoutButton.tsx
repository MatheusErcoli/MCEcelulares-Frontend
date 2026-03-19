"use client";

import { logoutAction } from "@/src/actions/auth";
import { Icon } from "./Icon"; // Ajuste o caminho do Icon conforme a sua estrutura de pastas

export function LogoutButton() {
    // Essa função roda no navegador antes de disparar a Action no servidor
    const handleLogout = () => {
        localStorage.removeItem("auth_token");
    };

    return (
        <form action={logoutAction} onSubmit={handleLogout}>
            <button
                type="submit"
                className="border-2 border-white text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-white hover:text-[#7929c8] transition-all"
            >
                Sair <Icon name="faRightFromBracket" className="w-3" size="sm" />
            </button>
        </form>
    );
}