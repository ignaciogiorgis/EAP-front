"use client";

import LoginForm from "@/components/auth/login/formLogin";
import { handleLogin } from "@/app/auth/login/api/route";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onRegisterSubmit(data: { email: string; password: string }) {
    try {
      const response = await handleLogin(data);

      if (response.success) {
        router.push("/dashboard");
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error durante el registro:", error);
      setErrorMessage(
        "Ocurrió un error inesperado. Inténtalo de nuevo más tarde."
      );
    }
  }

  return (
    <LoginForm
      onSubmit={onRegisterSubmit}
      externalError={errorMessage as string}
    />
  );
}
