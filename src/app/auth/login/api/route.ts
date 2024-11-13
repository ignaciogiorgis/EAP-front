import { setCookie } from "cookies-next";

export async function handleLogin(data: { email: string; password: string }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData?.error || "Error en la solicitud",
      };
    }

    const responseData = await response.json();
    const { token } = responseData;

    setCookie("token", token, { maxAge: 60 * 60 * 24 });

    return { success: true, data: responseData };
  } catch (error) {
    console.error("Error en la solicitud POST:", error);
    return { success: false, message: "Error en la solicitud" };
  }
}
