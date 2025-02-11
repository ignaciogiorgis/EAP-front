"use client";

import { useState, useEffect } from "react";
import FormProfile from "@/components/dashboard/profile/view/formProfile";

interface User {
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
      const response = await fetch("/api/profile", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        return { success: false, message: "Error al enviar el formulario" };
      }

      return { success: true, message: "Perfil actualizado correctamente" };
    } catch (error) {
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
