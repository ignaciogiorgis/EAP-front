"use client";

import { useState } from "react";
import FormProfile from "@/components/dashboard/profile/view/formProfile";
import { handleEditProfile } from "@/utils/dashboard/profile";
import { ContainerProfileProps, User } from "@/components/index";

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
        email: formData.get("email") as string,
        picture: formData.get("picture") as string,
        message: formData.get("message") as string,
      };

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
