//funcion que hace el llamado ala api para crear un nuevo gasto
"use server";

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

export async function handleDeleteExpense(
  id: string | number
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/expense/${id}`, // URL con el ID del gasto
      {
        method: "PATCH", // Método PATCH para realizar el borrado lógico
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDeleted: true }), // Marca el gasto como eliminado
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData?.message || "Error performing logical erase.",
      };
    }

    const responseData = await response.json();

    return {
      success: true,
      message: responseData.message || "Logical erase successful. ",
    };
  } catch (error) {
    console.error("Error performing logical erase:", error);
    return {
      success: false,
      message: "Unexpected error when performing logical erase.",
    };
  }
}
