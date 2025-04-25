import { Button } from "@/components/ui/button";
import { auth, db } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
// import { getColletions } from "@/service/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuthContext } from "@/contexts/auth";

export function DashboardPage() {
  const { currentUser } = useAuthContext();
  // const { data } = useQuery({
  //   queryKey: ["linguagens"],
  //   queryFn: async () => await getColletions("linguagens"),
  // });

  const { data } = useQuery({
    queryKey: ["jornadas"],
    queryFn: async () => {
      const col = collection(db, "jornadas");
      const q = query(col, where("user_id", "==", currentUser?.uid));
      return (await getDocs(q)).docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      }));
    },
  });

  console.log(data);

  return (
    <div className="size-full">
      <header className="p-2 pr-8 flex justify-between items-center">
        <img src="./mascote.png" className="size-24" />

        <Button size="lg" onClick={() => signOut(auth)}>
          Sair
          <LogOut />
        </Button>
      </header>
    </div>
  );
}
