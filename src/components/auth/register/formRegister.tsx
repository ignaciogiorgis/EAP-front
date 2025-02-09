"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Form from "next/form";
import { RegisterFormProps } from "@/components/index";
import { validateForm, ValidationSchema } from "@/utils/validation";
import { FiAlertCircle } from "react-icons/fi";

export default function RegisterForm({
  onSubmit,
  externalError,
}: RegisterFormProps) {
  const [errors, setErrors] = useState<string[]>([]);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    repetir_password: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [displayErrors, setDisplayErrors] = useState<boolean>(false);

  const validationSchema: ValidationSchema = {
    name: { required: true, customMessage: "The Name is required" },
    email: {
      required: true,
      pattern: /\S+@\S+\.\S+/,
      customMessage: "The Email is required",
    },
    password: {
      required: true,
      minLength: 6,
      customMessage: "The Password is required",
    },
    repetir_password: {
      required: true,
      matchField: "password",
      customMessage: "Repeat your Password",
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Create an Account to <span className="text-indigo-500">EAP</span>
        </h1>
        {displayErrors && combinedErrors.length > 0 && (
          <div className="mb-4">
            {combinedErrors.map((error, index) => (
              <div
                key={index}
                className="flex items-center bg-red-600 text-white p-2 mt-1 rounded-md text-sm"
              >
                <FiAlertCircle className="mr-2" /> {error}
              </div>
            ))}
          </div>
        )}
        <Form action={handleSubmit} className="space-y-4">
          <label className="block text-gray-400 text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full p-3 mt-1 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-indigo-500"
            value={formValues.name}
            onChange={handleChange}
            placeholder="Name"
          />

          <label className="block text-gray-400 text-sm font-medium">
            Email
          </label>
          <input
            name="email"
            className="w-full p-3 mt-1 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-indigo-500"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <label className="block text-gray-400 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full p-3 mt-1 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-indigo-500"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Password"
          />

          <label className="block text-gray-400 text-sm font-medium">
            Repeat Password
          </label>
          <input
            type="password"
            name="repetir_password"
            className="w-full p-3 mt-1 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-indigo-500"
            value={formValues.repetir_password}
            onChange={handleChange}
            placeholder="Repeat Password"
          />
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold p-3 rounded-md transition-all"
          >
            Create
          </button>

          <div className="flex justify-between">
            <Link className="text-gray-400 text-sm" href="/auth/login">
              Sign In
            </Link>
            <Link className="text-gray-400 text-sm" href="/auth/recover">
              Forgot password?
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
