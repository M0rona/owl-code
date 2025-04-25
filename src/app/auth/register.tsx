import { Input } from "@/components/ui/input";
import { AuthLayout } from "./components/authLayout";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/config/firebase";
import { FirebaseError } from "firebase/app";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const inputImageRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    // const profileImage = formData.get("profileImage") as string;
    const userName = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      return toast.error("As senhas não coincidem");
    }

    setIsLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(userCredential.user, {
          displayName: userName,
        });

        toast.success("Cadastro realizado com sucesso!");
        navigate("/dashboard");
      })
      .catch((error: FirebaseError) => {
        toast.error("Erro ao criar usuário: " + error.message);
      });

    setIsLoading(false);
  };

  // TODO: Ver sobre inserir a foto de perfil
  useEffect(() => {
    let objectUrl: string | null = null;
    if (image) {
      objectUrl = URL.createObjectURL(image);
      setImageUrl(objectUrl);
    } else {
      setImageUrl(null);
    }
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [image]);

  return (
    <AuthLayout label="Registre-se" onSubmit={handleSubmit}>
      <div className="flex justify-center mb-5">
        <div
          className="size-32 rounded-full bg-background flex items-center justify-center p-2 cursor-pointer"
          onClick={() => inputImageRef.current?.click()}
        >
          <span className="text-center text-xs">Insira sua foto de perfil</span>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="foto-de-perfil"
              className="absolute size-32 rounded-full"
            />
          )}
        </div>
      </div>

      <input
        ref={inputImageRef}
        type="file"
        name="profileImage"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
          }
        }}
        hidden
        accept="image/*"
      />

      <Input
        placeholder="Nome de usuário"
        type="text"
        name="username"
        required
      />
      <Input placeholder="E-mail" type="email" name="email" required />
      <Input placeholder="Senha" type="password" name="password" required />
      <Input
        placeholder="Confirmar senha"
        type="password"
        name="confirmPassword"
        required
      />

      <Button type="submit" size="lg">
        {isLoading ? <Loader2 className="animate-spin" /> : "Registrar"}
      </Button>

      <Link className={buttonVariants({ variant: "outline" })} to="/">
        Voltar ao login
      </Link>
    </AuthLayout>
  );
}
