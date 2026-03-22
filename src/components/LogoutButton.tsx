"use client";

import { logoutAction } from "@/src/actions/auth";
import { Icon } from "./Icon"; 
import { useRouter } from "next/navigation";

export function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        localStorage.removeItem("auth_token");
        document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";

        await logoutAction();

        router.push("/");
        
        router.refresh(); 
    };

    return (
        <button
            type="button" 
            onClick={handleLogout}
            className="border-2 border-white text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-white hover:text-[#7929c8] transition-all"
        >
            Sair <Icon name="faRightFromBracket" className="w-3" size="sm" />
        </button>
    );
}