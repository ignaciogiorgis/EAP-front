import { setCookie, deleteCookie } from "cookies-next";

export async function logoutUser() {
  try {
    // Eliminar el token en el cliente (navegador) con cookies-next
    deleteCookie("token");

    // Realizar el llamado al backend para el logout
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Error al hacer logout");
    }

    return true;
  } catch (error) {
    console.error("Error en logout:", error);
    return false;
  }
}
