import { Button } from "@/components/ui/button";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
export function DashboardPage() {
  function handleSignOut() {
    signOut(auth);
  }
  return (
    <>
      <h1>Home page</h1>

      <Button className="mt-5" onClick={handleSignOut}>
        Sair
      </Button>
    </>
  );
}
