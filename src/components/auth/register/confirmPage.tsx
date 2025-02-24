"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import "animate.css";

export default function ConfirmarCuenta() {
  const { id } = useParams();
  const token = id;
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
    <div className="h-screen bg-indigo-500 flex flex-col items-center justify-center space-y-12 px-6">
      <h1 className="text-center font-bold uppercase text-white lg:text-4xl text-3xl tracking-wide animate__animated animate__fadeIn">
        Account Confirmation
      </h1>

      {mensaje && (
        <p className="text-white text-lg italic animate__animated animate__fadeIn">
          {mensaje}
        </p>
      )}

      {error ? (
        <div className="flex items-center space-x-2 text-red-400 font-semibold animate__animated animate__bounceIn">
          <FaExclamationCircle className="text-4xl" />
          <p>{error}</p>
        </div>
      ) : (
        <div className="flex items-center space-x-2 text-emerald-800 animate__animated animate__bounceIn">
          <FaCheckCircle className="text-4xl" />
          <p>Success! Your account has been confirmed.</p>
        </div>
      )}

      {!error && !mensaje && (
        <Link
          className="bg-emerald-500 p-4 rounded-lg shadow-xl text-white font-semibold text-lg transition-transform transform hover:scale-105 hover:bg-emerald-700 active:scale-95 animate__animated animate__fadeIn"
          href="/auth/login"
        >
          Enter Here
        </Link>
      )}
    </div>
  );
}
