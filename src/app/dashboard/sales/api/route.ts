"use server";

import { cookies } from "next/headers";

export async function handleCreateSale(data: {
  productName: string;
  clientName: string;
  quantity: number;
  total: number;
  paid: boolean;
  saleDate: string;
}) {
  try {
    const token = (await cookies()).get("token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/sale`,
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
        message: errorData?.message || "Request error",
      };
    }

    const responseData = await response.json();
    return { success: true, data: responseData };
  } catch (error) {
    console.error("Request error POST:", error);
    return { success: false, message: "Request error" };
  }
}
export async function handleEditSale(
  id: string,
  data: {
    productName: string;
    clientName: string;
    quantity: number;
    total: number;
    paid: boolean;
    saleDate: string;
  }
) {
  try {
    const token = (await cookies()).get("token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/sale/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    console.log(response, "response");
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
export async function handleDeleteSale(
  id: string | number
): Promise<{ success: boolean; message?: string }> {
  try {
    const token = (await cookies()).get("token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/sale/${id}`,
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
export async function handleShowSales() {
  try {
    const token = (await cookies()).get("token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/sale`,
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
