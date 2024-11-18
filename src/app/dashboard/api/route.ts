//funcion que hace el llamado ala api para crear un nuevo gasto
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
        message: errorData?.error?.msg || " Request error",
      };
    }

    const responseData = await response.json();
    return { success: true, data: responseData };
  } catch (error) {
    console.error(" Request error POST:", error);
    return { success: false, message: " Request error" };
  }
}
//funcion que hace el llamado ala api para traer el listado de gastos
export async function handleShowExpenses() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/expense`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData?.error?.msg || " Request error",
      };
    }

    const responseData = await response.json();

    return { success: true, data: responseData };
  } catch (error) {
    console.error(" Request error GET:", error);
    return { success: false, message: " Request error" };
  }
}

// Función que hace el llamado a la API para editar un gasto
export async function handleEditExpense(
  id: string,
  data: {
    name?: string;
    value?: string;
    description?: string;
    date?: string;
  }
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/expense/${id}`, // URL con el ID del gasto
      {
        method: "PUT", // Método PUT para editar
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Datos a enviar
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData?.error?.msg || " Request error",
      };
    }

    const responseData = await response.json();

    return { success: true, data: responseData }; // Retorna el gasto editado
  } catch (error) {
    console.error(" Request error PUT:", error);
    return { success: false, message: " Request error" };
  }
}
