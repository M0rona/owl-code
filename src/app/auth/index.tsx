import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "./components/authLayout";
import { Link } from "react-router";

export function LoginPage() {
  return (
    <AuthLayout label="Login" onSubmit={(e) => e.preventDefault()}>
      <Input placeholder="E-mail" type="email" name="email" />
      <Input placeholder="Senha" type="password" name="password" />

      <Button variant="link" className="w-fit px-0">
        Esqueci minha senha
      </Button>

      <Button type="submit" size="lg">
        Login
      </Button>
      <Link className={buttonVariants({ variant: "outline" })} to="/registro">
        Registrar-se
      </Link>
    </AuthLayout>
  );
}
