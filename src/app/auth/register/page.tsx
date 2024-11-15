"use client";
import RegisterForm from "@/components/auth/register/formRegister";
import { useRouter } from "next/navigation";
import { handleRegister } from "@/app/auth/register/api/route";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onRegisterSubmit(data: {
    nombre: string;
    email: string;
    password: string;
    repetir_password: string;
  }) {
    try {
      const response = await handleRegister(data);

      if (response.success) {
        router.push("/auth/pre-confirm");
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
    <div>
      <RegisterForm
        onSubmit={onRegisterSubmit}
        externalError={errorMessage as string}
      />
    </div>
  );
}
