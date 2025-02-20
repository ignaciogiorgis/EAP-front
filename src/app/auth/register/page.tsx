"use client";
import RegisterForm from "@/components/auth/register/formRegister";
import { useRouter } from "next/navigation";
import { handleRegister } from "@/app/auth/api/route";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onRegisterSubmit(data: {
    name: string;
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
      console.error("Error during registration:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
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
