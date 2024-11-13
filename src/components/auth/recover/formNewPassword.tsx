"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "next/form";

interface Props {
  token: string;
}

export default function formNewPassword({ token }: Props) {
  const [errors, setErrors] = useState<string[]>([]);

  const router = useRouter();
  async function handleRecover(formData: FormData) {
    const password = formData.get("password") as string;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/recover/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );
      if (res.ok) {
        router.push("/auth/change-password");
      } else {
        const data = await res.json();
        setErrors([data.mensaje]);
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      setErrors(["Hubo un problema en el registro."]);
    }
    router.push("/auth/login");
  }
  return (
    <div className=" h-screen flex w-full flex-col justify-center items-center">
      <h1 className="font-extrabold text-3xl text-white my-10 uppercase ">
        Coloca tu nueva Contraseña
      </h1>
      <Form
        className=" flex flex-col gap-2 w-1/3 mb-10 bg-white py-7  px-8 rounded-md shadow-md"
        action={handleRecover}
      >
        <label className="text-gray-500 font-semibold" htmlFor="password">
          Password
        </label>

        <input
          className="py-3 px-4 bg-slate-200 rounded-md "
          name="password"
          type="password"
          placeholder="Password"
        />

        <button
          className="bg-indigo-500 rounded-md mt-3 text-white shadow-md hover:bg-indigo-700 py-2 uppercase font-bold"
          type="submit"
        >
          Enviar
        </button>
      </Form>
    </div>
  );
}
