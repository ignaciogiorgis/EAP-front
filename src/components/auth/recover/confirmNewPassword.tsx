"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormNewPassword from "./formNewPassword";

export default function ConfirmarNuevaContraseña({ token }: { token: string }) {
  const router = useRouter();
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    if (!token) return;

    const confirmarNewPassword = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/recover/${token}`,
          { method: "GET" }
        );
        const data = await res.json();
        if (res.ok) {
          setMensaje(data.mensaje);
        } else {
          setError(true);
          setMensaje(data.mensaje);
        }
      } catch (error) {
        console.error("Error al confirmar la cuenta:", error);
        setError(true);
        setMensaje("Hubo un problema al confirmar tu cuenta.");
      }
    };

    confirmarNewPassword();
    router.push(`/auth/recover/${token}`);
  }, [token]);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center px-6">
      {!token ? (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
          <h1 className="text-center text-3xl font-bold text-indigo-600 mb-6">
            Account Confirmation
          </h1>
          {mensaje && (
            <p className="text-center text-green-600 font-semibold mb-4">
              {mensaje}
            </p>
          )}
          {error && (
            <p className="text-center text-red-600 font-semibold mb-4">
              There was an error confirming your account.
            </p>
          )}
          <p className="text-center text-indigo-500">
            If you have not received an email, please check your spam folder.
          </p>
        </div>
      ) : (
        <FormNewPassword token={token} />
      )}
    </div>
  );
}
