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
    <div className="bg-indigo-300">
      {!token ? (
        <div>
          <h1 className="text-white">Confirmación de Cuenta</h1>
          {mensaje && <p>{mensaje}</p>}
          {error && <p>Hubo un error al confirmar tu cuenta.</p>}
        </div>
      ) : (
        <FormNewPassword token={token} />
      )}
    </div>
  );
}
