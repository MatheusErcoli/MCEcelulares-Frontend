import { SignCard } from "@/src/components/common/SignCard";
import { FormLogin } from "./components/LoginForm";

export default function Login() {
  return (
    <SignCard title="Login">
      <FormLogin/>
    </SignCard>
  );
}