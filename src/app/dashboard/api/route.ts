"use server";
import { cookies } from "next/headers";

export async function handleShowProfile() {
  try {
    const token = (await cookies()).get("token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile`,
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
        message: errorData?.error || "Request error",
      };
    }

    const responseData = await response.json();
    return { success: true, data: responseData };
  } catch (error) {
    console.error("Request error GET:", error);
    return { success: false, message: "Request error" };
  }
}

export async function handleUploadProfilePicture(formData: FormData) {
  try {
    const token = (await cookies()).get("token")?.value;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/upload-profile`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData?.error || "Error uploading image",
      };
    }

    const responseData = await response.json();
    return { success: true, data: responseData };
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    return { success: false, message: "Error uploading profile picture" };
  }
}

export async function handleEditProfile(
  id: string,
  data: {
    name: string;
    email: string;
    picture?: string | null;
    message?: string | null;
  }
) {
  try {
    const token = (await cookies()).get("token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile/${id}`,
      {
        method: "PUT",
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
        message: errorData?.error || "Request error",
      };
    }

    const responseData = await response.json();
    return { success: true, data: responseData };
  } catch (error) {
    console.error("Request error PUT:", error);
    return { success: false, message: "Request error" };
  }
}
