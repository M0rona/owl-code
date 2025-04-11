import { Input } from "@/components/ui/input";
import { AuthLayout } from "./components/authLayout";
import { Button } from "@/components/ui/button";

export function RegisterPage() {
  return (
    <AuthLayout label="Registre-se" onSubmit={(e) => e.preventDefault()}>
      <Input placeholder="Nome de usuário" type="text" name="username" />
      <Input placeholder="E-mail" type="email" name="email" />
      <Input placeholder="Senha" type="password" name="password" />
      <Input
        placeholder="Confirmar senha"
        type="password"
        name="confirmPassword"
      />

      <Button variant="link" className="w-fit px-0">
        Esqueci minha senha
      </Button>

      <Button type="submit" size="lg">
        Registrar
      </Button>
    </AuthLayout>
  );
}
