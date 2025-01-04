"use Server";

import { cookies } from "next/headers";

export async function handleCreateSale(data: {
  productId: number;
  clientId: number;
  quantity: number;
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
export async function handleDeleteSale() {
  return null;
}
export async function handleEditSale() {
  return null;
}
