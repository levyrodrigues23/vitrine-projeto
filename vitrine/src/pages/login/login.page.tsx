import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";

import { useAuthStore } from "../../store/useAuthStore";
import { Text, Input } from "../../components/ui";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido. Utilize o e-mail institucional."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    setAuthError(null);

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (values.email === "admin@ufc.br" && values.password === "123456") {
      login({
        id: "1",
        name: "Administrador do Sistema",
        email: values.email,
        role: "admin",
      });
      navigate("/admin");
    } else if (values.email === "gerenciador@ufc.br" && values.password === "123456") {
      login({
        id: "2",
        name: "Gerenciador de Projetos",
        email: values.email,
        role: "gerenciador",
      });
      navigate("/gerenciador");
    } else {
      setAuthError("Credenciais inválidas. Tente admin@ufc.br ou gerenciador@ufc.br com a senha 123456.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-b from-blue/10 via-[#FAFAFA] to-white">
      <header className="p-6 md:p-10">
        <div className="flex items-center gap-3">
          <img src="/logo-ufc.png" alt="Logo UFC" className="h-10 w-auto object-contain" />
          <Text as="span" variant="title-3" className="font-bold tracking-tight text-black">
            Vitrine de Projetos
          </Text>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 pb-20">
        <div className="w-full max-w-[360px] space-y-8">
          <div className="space-y-2 text-center">
            <Text as="h1" variant="title-1" className="text-[32px] font-semibold tracking-tight text-black">
              Entrar no sistema
            </Text>
            <Text as="p" variant="body-sm" className="text-gray-500">
              Acesso restrito para gestão de conteúdo da vitrine.
            </Text>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-semibold text-black">
                E-mail
              </label>
              <Input
                id="email"
                {...register("email")}
                type="email"
                placeholder="Digite seu e-mail"
                className={`h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black ${
                  errors.email ? "border-red focus:border-red focus:ring-red" : ""
                }`}
              />
              {errors.email && (
                <Text variant="body-sm" className="text-red">
                  {errors.email.message}
                </Text>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-sm font-semibold text-black">
                Senha
              </label>
              <Input
                id="password"
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className={`h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black ${
                  errors.password ? "border-red focus:border-red focus:ring-red" : ""
                }`}
              />
              {errors.password && (
                <Text variant="body-sm" className="text-red">
                  {errors.password.message}
                </Text>
              )}
            </div>

            {authError && (
              <div className="rounded-md bg-red/10 p-3 text-center">
                <Text variant="body-sm" className="font-medium text-red">
                  {authError}
                </Text>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 h-10 w-full rounded-md bg-[#111111] px-4 text-sm font-semibold text-white transition-colors hover:bg-black/90 disabled:opacity-70"
            >
              {isSubmitting ? "Autenticando..." : "Continuar com e-mail"}
            </button>
          </form>
        </div>
      </main>

      <footer className="pb-8 text-center px-6">
        <Text variant="body-sm" className="text-gray-400">
          Ao clicar em "Continuar com e-mail" você concorda com nossos{" "}
          <a href="#" className="underline transition-colors hover:text-gray-600">
            Termos de Uso
          </a>{" "}
          e{" "}
          <a href="#" className="underline transition-colors hover:text-gray-600">
            Política de Privacidade
          </a>
          .
        </Text>
      </footer>
    </div>
  );
}

