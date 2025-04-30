import { signOut } from "firebase/auth";
import { Button } from "../ui/button";
import { auth } from "@/config/firebase";
import { LogOut } from "lucide-react";
import { Outlet } from "react-router-dom";

export function PrivateLayout() {
  return (
    <div className="size-full flex items-center flex-col p-5">
      <header className="flex justify-between items-center w-full max-w-7xl">
        <img src="./mascoteLogo.png" className="size-18 object-contain" />

        <Button size="lg" onClick={() => signOut(auth)}>
          Sair
          <LogOut />
        </Button>
      </header>

      <main className="size-full max-w-7xl">
        <Outlet />
      </main>
    </div>
  );
}
