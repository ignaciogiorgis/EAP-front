export async function handleRegister(data: {
  nombre: string;
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
