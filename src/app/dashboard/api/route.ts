export async function handleCreateExpense(data: {
  name: string;
  value: string;
  description: string;
  date: string;
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/expense`,
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

export async function handleShowExpenses() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/expense`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 3, // Revalidar los datos cada 60 segundos
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.log("3", errorData);
      return {
        success: false,
        message: errorData?.error?.msg || "Error en la solicitud",
      };
    }

    const responseData = await response.json();

    return { success: true, data: responseData };
  } catch (error) {
    console.error("Error en la solicitud GET:", error);
    return { success: false, message: "Error en la solicitud" };
  }
}
