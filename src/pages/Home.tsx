import HelloWorld from "@/components/HelloWorld/HelloWorld";
import { useAuth } from "@/state/auth";

export function Home() {
  const { logout } = useAuth();
  return (
    <>
      <HelloWorld msg="Home" />
      <button onClick={() => logout()}>Logout</button>
    </>
  );
}
