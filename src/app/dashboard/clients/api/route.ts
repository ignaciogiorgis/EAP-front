"use server";
import { cookies } from "next/headers";

export async function handleCreateClient(data: {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  birthday: string;
  dni: number;
  phone: number;
}) {
  try {
    const token = (await cookies()).get("token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/client`,
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

export async function handleShowClients() {
  try {
    const token = (await cookies()).get("token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/client`,
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

export async function handleEditClient(
  id: string,
  data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    birthday?: string;
    dni?: number;
    phone?: number;
  }
) {
  try {
    const token = (await cookies()).get("token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/client/${id}`, // URL con el ID del gasto
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

    return { success: true, data: responseData };
  } catch (error) {
    console.error(" Request error PUT:", error);
    return { success: false, message: " Request error" };
  }
}

export async function handleDeleteClient(
  id: string | number
): Promise<{ success: boolean; message?: string }> {
  try {
    const token = (await cookies()).get("token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/client/${id}`, // URL con el ID del gasto
      {
        method: "PATCH", // Método PATCH para realizar el borrado lógico
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isDeleted: true }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
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
