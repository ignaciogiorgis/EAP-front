"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConfirmarCuenta({ token }: { token: string }) {
  const router = useRouter();
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!token) return;

    const confirmarCuenta = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/confirm/${token}`,
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

    confirmarCuenta();
  }, [token]);

  return (
    <div className="h-screen bg-indigo-500 flex flex-col items-center justify-center space-y-5">
      <h1 className="text-center font-bold uppercase lg:text-4xl ">
        Confirmación de Cuenta
      </h1>
      {mensaje && <p>{mensaje}</p>}
      {error ? (
        error
      ) : (
        <Link
          className="bg-emerald-500 p-3 rounded-md shadow-md font-bold hover:bg-emerald-700"
          href="/auth/login"
        >
          Ingresa Aqui
        </Link>
      )}
    </div>
  );
}
