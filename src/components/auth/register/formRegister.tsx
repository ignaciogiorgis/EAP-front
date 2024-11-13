"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Form from "next/form";
import { validateForm, ValidationSchema } from "@/utils/validation";

type RegisterFormProps = {
  onSubmit: (data: {
    nombre: string;
    email: string;
    password: string;
    repetir_password: string;
  }) => Promise<void>;
  externalError?: string;
};

export default function RegisterForm({
  onSubmit,
  externalError,
}: RegisterFormProps) {
  const [errors, setErrors] = useState<string[]>([]);
  const [formValues, setFormValues] = useState({
    nombre: "",
    email: "",
    password: "",
    repetir_password: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [displayErrors, setDisplayErrors] = useState<boolean>(false);

  const validationSchema: ValidationSchema = {
    nombre: { required: true, customMessage: "El nombre es obligatorio." },
    email: {
      required: true,
      pattern: /\S+@\S+\.\S+/,
      customMessage: "El email es obligatorio",
    },
    password: {
      required: true,
      minLength: 6,
      customMessage: "La contraseña es obligatoria",
    },
    repetir_password: {
      required: true,
      matchField: "password",
      customMessage: "Repeti tu contraseña",
    },
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  useEffect(() => {
    const validationErrors = validateForm(formValues, validationSchema);
    setErrors(validationErrors);
    if (formSubmitted) {
      setDisplayErrors(true);
    }
  }, [formValues, formSubmitted]);

  async function handleSubmit(formData: FormData) {
    setFormSubmitted(true);
    const validationErrors = validateForm(formValues, validationSchema);

    if (validationErrors.length === 0) {
      await onSubmit(formValues);
    } else {
      setErrors(validationErrors);
    }
  }

  const combinedErrors = [...errors];
  if (externalError) combinedErrors.push(externalError);

  return (
    <div className="bg-indigo-300 p-3 flex flex-col justify-center items-center ">
      <h1 className="font-extrabold text-3xl text-white my-10 uppercase ">
        Crear Cuenta
      </h1>
      <Form
        action={handleSubmit}
        className="flex flex-col gap-2 lg:w-1/3 mb-10 bg-white py-7  px-8 rounded-md shadow-md"
      >
        {displayErrors && combinedErrors.length > 0 && (
          <div>
            {combinedErrors.map((error, index) => (
              <div
                key={index}
                className="bg-red-100 my-2 p-2 rounded text-red-700"
              >
                <p>{error}</p>
              </div>
            ))}
          </div>
        )}
        <label className="block text-gray-700">Nombre</label>
        <input
          type="text"
          name="nombre"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          value={formValues.nombre}
          onChange={handleChange}
        />

        <label className="block text-gray-700">Email</label>
        <input
          name="email"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          value={formValues.email}
          onChange={handleChange}
        />

        <label className="block text-gray-700">Contraseña</label>
        <input
          type="password"
          name="password"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          value={formValues.password}
          onChange={handleChange}
        />

        <label className="block text-gray-700">Repetir Contraseña</label>
        <input
          type="password"
          name="repetir_password"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          value={formValues.repetir_password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-indigo-500 mt-3 rounded-md text-white shadow-md hover:bg-indigo-700 py-2 uppercase font-bold"
        >
          Registrarse
        </button>
        <div className="flex justify-between">
          <Link className="text-gray-400 text-sm" href="/auth/login">
            Iniciar Sesion
          </Link>
          <Link className="text-gray-400 text-sm" href="/auth/recover">
            Olvide mi Contraseña
          </Link>
        </div>
      </Form>
    </div>
  );
}
