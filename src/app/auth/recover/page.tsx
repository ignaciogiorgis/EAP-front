"use client";
import RecoverForm from "@/components/auth/recover/formRecover";
import { useRouter } from "next/navigation";
import { handleRecover } from "@/app/auth/recover/api/route";
import { useState } from "react";

export default function RecoverPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onRecoverSubmit(data: { email: string }) {
    try {
      const response = await handleRecover(data);

      if (response.success) {
        router.push("/auth/change-password");
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
    <RecoverForm
      onSubmit={onRecoverSubmit}
      externalError={errorMessage as string}
    />
  );
}
