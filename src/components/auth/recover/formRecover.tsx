"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Form from "next/form";
import { validateForm } from "@/utils/validation";

type RecoverFormProps = {
  onSubmit: (data: { email: string }) => Promise<void>;
  externalError?: string;
};

export default function RecoverForm({
  onSubmit,
  externalError,
}: RecoverFormProps) {
  const [errors, setErrors] = useState<string[]>([]);
  const [formValues, setFormValues] = useState({
    email: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [displayErrors, setDisplayErrors] = useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const validationSchema = {
    email: {
      required: true,
      pattern: /\S+@\S+\.\S+/,
      customMessage: "EL email es obligatorio",
    },
  };

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
    <div className="bg-indigo-300 h-screen p-3 flex flex-col justify-center items-center">
      <h1 className="font-extrabold sm:text-xl lg:text-3xl text-white my-10 uppercase ">
        Recupera tu Contraseña
      </h1>
      <Form
        action={handleSubmit}
        className=" flex flex-col gap-2 lg:w-1/3 mb-10 bg-white py-7  px-8 rounded-md shadow-md"
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
        <label className="block text-gray-700">Email</label>
        <input
          name="email"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          placeholder="Email"
          value={formValues.email}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-indigo-500 mt-3 rounded-md text-white shadow-md hover:bg-indigo-700 py-2 uppercase font-bold"
        >
          Enviar
        </button>
        <div className="flex justify-between">
          <Link className="text-gray-400 text-sm" href="/auth/register">
            Crear Cuenta
          </Link>
          <Link className="text-gray-400 text-sm" href="/auth/login">
            Iniciar Sesion
          </Link>
        </div>
      </Form>
    </div>
  );
}
