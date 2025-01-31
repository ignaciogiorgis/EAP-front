//funcion que hace el llamado ala api para crear un nuevo gasto
"use server";

import { cookies } from "next/headers";

export async function handleCreateExpense(data: {
  name: string;
  value: string;
  description: string;
  date: string;
}) {
  try {
    const token = (await cookies()).get("token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/expense`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData?.error || " Request error",
      };
    }

    const responseData = await response.json();
    return { success: true, data: responseData };
  } catch (error) {
    console.error(" Request error POST:", error);
    return { success: false, message: " Request error" };
  }
}
export async function handleShowExpenses(search: string = "") {
  try {
    const token = (await cookies()).get("token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/expense?search=${search}`, // Pasa el parámetro de búsqueda aquí
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData?.error || " Request error",
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
    const token = (await cookies()).get("token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/expense/${id}`, // URL con el ID del gasto
      {
        method: "PUT", // Método PUT para editar
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data), // Datos a enviar
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData?.error || " Request error",
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
    const token = (await cookies()).get("token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/expense/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isDeleted: true }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.log("desde route front", errorData);
      return {
        success: false,
        message: errorData?.error || "Error performing logical erase.",
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
