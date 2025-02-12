"use client";

import { useState, useEffect } from "react";
import FormProfile from "@/components/dashboard/profile/view/formProfile";
import { handleEditProfile } from "@/app/dashboard/api/route";

interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
  message?: string;
}

interface ContainerProfileProps {
  user: User;
  handleUploadProfilePicture: (
    formData: FormData
  ) => Promise<{ success: boolean; message?: string }>;
}

const ContainerProfile = ({
  user,
  handleUploadProfilePicture,
}: ContainerProfileProps) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User>(user);

  async function onSubmit(formData: FormData) {
    try {
      const updatedData = {
        name: formData.get("name") as string,
        email: formData.get("email") as string, // No debería cambiar
        picture: formData.get("picture") as string, // Se obtendría de la subida de imagen
        message: formData.get("message") as string,
      };

      // Llamamos a handleEditProfile pasando el id del usuario y los datos actualizados
      const response = await handleEditProfile(user.id, updatedData);

      if (!response.success) {
        return { success: false, message: response.message };
      }

      setCurrentUser((prevUser) => ({
        ...prevUser,
        ...updatedData,
      }));

      return { success: true, message: "Perfil actualizado correctamente" };
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      return { success: false, message: "Hubo un error en la solicitud" };
    }
  }

  return (
    <div className="min-h-screen p-6 text-white">
      <FormProfile
        onSubmit={onSubmit}
        user={currentUser}
        setIsForm={setIsFormOpen}
        handleUploadProfilePicture={handleUploadProfilePicture}
      />
    </div>
  );
};

export default ContainerProfile;
