import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const { logout } = useAuth();
  const router = useRouter();
  const res = await fetch(url, options);

  if (res.status === 401) {
      logout();
      router.push("/login");
  }

  return res;
}