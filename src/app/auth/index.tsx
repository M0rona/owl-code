import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "./components/authLayout";
import { Link } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setIsLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Login realizado com sucesso!");
      })
      .catch((error: FirebaseError) => {
        if (error.code === "auth/invalid-credential") {
          return toast.error("E-mail ou senha inválidos");
        }

        toast.error("Erro ao entrar: " + error.message);
      });

    setIsLoading(false);
  };

  return (
    <AuthLayout label="Login" onSubmit={handleSubmit}>
      <Input placeholder="E-mail" type="email" name="email" required />
      <Input placeholder="Senha" type="password" name="password" required />

      <Button variant="link" className="w-fit px-0">
        Esqueci minha senha
      </Button>

      <Button type="submit" size="lg" disabled={isLoading}>
        {isLoading ? <Loader2 className="animate-spin" /> : "Entrar"}
      </Button>
      <Link className={buttonVariants({ variant: "outline" })} to="/registro">
        Registrar-se
      </Link>
    </AuthLayout>
  );
}
