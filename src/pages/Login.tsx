import HelloWorld from "@/components/HelloWorld/HelloWorld";
import { useAuth } from "@/state/auth";

export function Login() {
  const { login } = useAuth();
  return (
    <>
      <HelloWorld msg="Login" />
      <button onClick={() => login()}>Login</button>
    </>
  );
}
