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
//funcion que hace el llamado para recuperar el password
export async function handleRecover(data: { email: string }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/recover`,
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

    return { success: true, data: responseData };
  } catch (error) {
    console.error("Error en la solicitud POST:", error);
    return { success: false, message: "Error en la solicitud" };
  }
}

export async function handleRegister(data: {
  name: string;
  email: string;
  password: string;
  repetir_password: string;
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
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
      // Retornar el error para manejarlo en el frontend sin lanzar una excepción
      return {
        success: false,
        message: errorData?.error?.msg || "Error en la solicitud",
      };
    }

    const responseData = await response.json();
    return { success: true, data: responseData };
  } catch (error) {
    console.error("Error en la solicitud POST:", error);
    return { success: false, message: "Error en la solicitud" };
  }
}

