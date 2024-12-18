import { useState } from "react";
import Form from "next/form";
import { validateForm, ValidationSchema } from "@/utils/validation";
import { format } from "date-fns";

type FormClientsProps = {
  onSubmit: (data: {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    birthday: string;
    dni: number;
    phone: number;
  }) => Promise<void>;
  externalError?: string;
  client?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    birthday: string;
    dni: number;
    phone: number;
  };
  setIsForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormClient = ({
  onSubmit,
  externalError,
  client,
  setIsForm,
}: FormClientsProps) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [displayErrors, setDisplayErrors] = useState<boolean>(false);

  const validationSchema: ValidationSchema = {
    firstName: { required: true, customMessage: "The first Name is required" },
    lastName: { required: true, customMessage: "The last name is required" },
    email: {
      required: true,
      pattern: /\S+@\S+\.\S+/,
      customMessage: "The email is required",
    },
    address: { required: true, customMessage: "The address is required" },
    birthday: { required: true, customMessage: "The birthday is required" },
    dni: { required: true, customMessage: "The dni is required" },
    phone: { required: true, customMessage: "The phone is required" },
  };

  async function handleSubmit(formData: FormData) {
    const rawValues = {
      id: client?.id || "",
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      address: formData.get("address") as string,
      birthday: formData.get("birthday") as string,
      dni: formData.get("dni") as string,
      phone: formData.get("phone") as string,
    };

    // Validación inicial: verificar campos vacíos
    const validationErrors = validateForm(rawValues, validationSchema);

    if (validationErrors.length === 0) {
      // Si no hay errores, convertir los valores necesarios a números
      const formValues = {
        ...rawValues,
        dni: Number(rawValues.dni),
        phone: Number(rawValues.phone),
      };

      let formattedDate = "";
      try {
        formattedDate = format(new Date(formValues.birthday), "yyyy-MM-dd");
      } catch (error) {
        console.error("Invalid date value:", error);
        setErrors(["The date format is invalid."]);
        setDisplayErrors(true);
        return;
      }

      // Actualizamos el objeto con la fecha formateada
      formValues.birthday = formattedDate;

      await onSubmit(formValues); // Enviar los datos procesados
      setIsForm(false); // Cerrar el formulario tras el éxito
    } else {
      setErrors(validationErrors); // Mostrar errores
      setDisplayErrors(true);
    }
  }

  const combinedErrors = [...errors];
  if (externalError) combinedErrors.push(externalError);

  return (
    <div className="p-3 flex flex-col justify-center items-center scrollbar-none">
      <Form
        action={handleSubmit}
        className="flex flex-col gap-2 lg:w-1/3 mb-10 bg-white py-7 px-8 rounded-md border border-black border-dotted shadow-xl"
      >
        <div className="flex justify-between mb-4">
          <h3 className="text-white w-2/3 py-2 rounded-md font-semibold text-center bg-indigo-950">
            {client ? "Edit client" : "Add client"}
          </h3>
          <button
            type="button"
            onClick={() => setIsForm(false)}
            className="text-3xl font-bold uppercase flex items-center justify-center text-white bg-indigo-500 rounded-md w-1/5 hover:bg-indigo-700"
          >
            X
          </button>
        </div>

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

        <label className="block text-gray-700">First Name</label>
        <input
          type="text"
          name="firstName"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          defaultValue={client?.firstName || ""}
        />

        <label className="block text-gray-700">Last Name</label>
        <input
          name="lastName"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          defaultValue={client?.lastName || ""}
        />

        <label className="block text-gray-700">Email</label>
        <input
          name="email"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          defaultValue={client?.email || ""}
        />

        <label className="block text-gray-700">Address</label>
        <input
          name="address"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          defaultValue={client?.address || ""}
        />
        <label className="block text-gray-700">Birthday</label>
        <input
          name="birthday"
          type="date"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          defaultValue={client?.birthday || ""}
        />
        <label className="block text-gray-700">Dni</label>
        <input
          name="dni"
          type="number"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          defaultValue={client?.dni || ""}
        />
        <label className="block text-gray-700">Phone</label>
        <input
          name="phone"
          type="number"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          defaultValue={client?.phone || ""}
        />

        <button
          type="submit"
          className="bg-indigo-500 mt-3 rounded-md text-white shadow-md hover:bg-indigo-700 py-2 uppercase font-bold"
        >
          {client ? "Update" : "Create"}
        </button>
      </Form>
    </div>
  );
};

export default FormClient;
