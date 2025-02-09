"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "next/form";
import { PropsRecover } from "@/components/index";

export default function formNewPassword({ token }: PropsRecover) {
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
      console.error("Registration error:", error);
      setErrors(["There was a problem registering."]);
    }
    router.push("/auth/login");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Enter your new Password <span className="text-indigo-500">EAP</span>
        </h1>
        <Form className="space-y-4" action={handleRecover}>
          <label
            className="block text-gray-400 text-sm font-medium"
            htmlFor="password"
          >
            Password
          </label>

          <input
            className="w-full p-3 mt-1 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-indigo-500"
            name="password"
            type="password"
            placeholder="Password"
          />

          <button
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold p-3 rounded-md transition-all"
            type="submit"
          >
            Send
          </button>
        </Form>
      </div>
    </div>
  );
}
