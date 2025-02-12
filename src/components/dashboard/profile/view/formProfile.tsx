"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormProfileProps } from "@/components/index";

const FormProfile = ({
  onSubmit,
  user,
  setIsForm,
  handleUploadProfilePicture,
}: FormProfileProps) => {
  const router = useRouter();

  const [errors, setErrors] = useState<string[]>([]);
  const [displayErrors, setDisplayErrors] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(user?.picture || null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (file) {
      formData.append("file", file);
    }

    formData.append("name", formData.get("name") as string);
    formData.append("email", user.email);
    formData.append("message", formData.get("message") as string);

    if (file) {
      const uploadResponse = await handleUploadProfilePicture(formData);
      if (!uploadResponse.success) {
        setErrors([uploadResponse.message || "Error al cargar la imagen"]);
        setDisplayErrors(true);
        return;
      }
    }

    const response = await onSubmit(formData);

    if (response?.success) {
      setIsForm(false);
      router.push("/dashboard");
    } else {
      setErrors([response?.message || "Error desconocido"]);
      setDisplayErrors(true);
    }
  }

  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 lg:w-1/3 bg-gray-900 text-white p-8 rounded-lg shadow-xl"
      >
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-semibold text-gray-300">Edit Profile</h3>
        </div>

        {displayErrors && errors.length > 0 && (
          <div className="md:grid md:grid-cols-2">
            {errors.map((error, index) => (
              <p
                className="bg-red-500 text-white p-2 rounded-md mt-1 ml-1"
                key={index}
              >
                {error}
              </p>
            ))}
          </div>
        )}

        <div>
          <label className="text-gray-400">Name</label>
          <input
            type="text"
            name="name"
            className="w-full bg-gray-800 p-3 rounded-md text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
            defaultValue={user?.name}
            placeholder="Enter your name..."
          />
        </div>

        <div>
          <label className="text-gray-400">Email</label>
          <input
            type="email"
            name="email"
            className="w-full bg-gray-800 p-3 rounded-md text-gray-500 border border-gray-700 cursor-not-allowed"
            defaultValue={user?.email}
            disabled
          />
        </div>

        <div>
          <label className="text-gray-400">Profile Picture</label>
          {preview && (
            <img
              src={preview}
              alt="Profile Preview"
              className="w-36 h-36 object-cover rounded-full mx-auto mb-3 border p-2"
            />
          )}
          <input
            type="file"
            accept="image/*"
            className="w-full bg-gray-800 p-2 rounded-md text-white border border-gray-700"
            onChange={handleFileChange}
          />
        </div>

        <div>
          <label className="text-gray-400">Message</label>
          <textarea
            name="message"
            className="w-full bg-gray-800 p-3 rounded-md text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500 resize-none"
            defaultValue={user?.message || ""}
            placeholder="Enter a message for the project..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition p-3 rounded-md text-white uppercase font-semibold"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default FormProfile;
