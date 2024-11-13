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
