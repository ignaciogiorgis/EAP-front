import { useState } from "react";
import Form from "next/form";
import { FormClientsProps } from "@/components/index";
import { validateForm, ValidationSchema } from "@/utils/validation";
import { format } from "date-fns";

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

    const validationErrors = validateForm(rawValues, validationSchema);

    if (validationErrors.length === 0) {
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

      formValues.birthday = formattedDate;

      await onSubmit(formValues);
      setIsForm(false);
    } else {
      setErrors(validationErrors);
      setDisplayErrors(true);
    }
  }

  const combinedErrors = [...errors];
  if (externalError) combinedErrors.push(externalError);

  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <Form
        action={handleSubmit}
        className="flex flex-col gap-4 lg:w-1/3 bg-gray-900 text-white p-8 rounded-lg shadow-xl"
      >
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-semibold text-gray-300">
            {client ? "Edit Client" : "Add Client"}
          </h3>
          <button
            type="button"
            onClick={() => setIsForm(false)}
            className="text-xl font-bold text-gray-400 hover:text-gray-200 transition"
          >
            ✕
          </button>
        </div>

        {displayErrors && combinedErrors.length > 0 && (
          <div className=" md:grid md:grid-cols-2">
            {combinedErrors.map((error, index) => (
              <p
                className="bg-red-500 text-white p-2 rounded-md mt-1 ml-1"
                key={index}
              >
                {error}
              </p>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400">First Name</label>
            <input
              type="text"
              name="firstName"
              className="w-full bg-gray-800 p-3 rounded-md text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
              defaultValue={client?.firstName || ""}
              placeholder="Enter the first name..."
            />
          </div>

          <div>
            <label className="text-gray-400">Last Name</label>
            <input
              name="lastName"
              className="w-full bg-gray-800 p-3 rounded-md text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
              defaultValue={client?.lastName || ""}
              placeholder="Enter the last name..."
            />
          </div>
        </div>

        <div>
          <label className="text-gray-400">Email</label>
          <input
            name="email"
            className="w-full bg-gray-800 p-3 rounded-md text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
            defaultValue={client?.email || ""}
            placeholder="Enter the email..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400">Address</label>
            <input
              name="address"
              className="w-full bg-gray-800 p-3 rounded-md text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
              defaultValue={client?.address || ""}
              placeholder="Enter the address..."
            />
          </div>

          <div>
            <label className="text-gray-400">Birthday</label>
            <input
              name="birthday"
              type="date"
              className="w-full bg-gray-800 p-3 rounded-md text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
              defaultValue={client?.birthday || ""}
              placeholder="Enter the birthday..."
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400">DNI</label>
            <input
              name="dni"
              type="number"
              className="w-full bg-gray-800 p-3 rounded-md text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
              defaultValue={client?.dni || ""}
              placeholder="Enter the dni..."
            />
          </div>

          <div>
            <label className="text-gray-400">Phone</label>
            <input
              name="phone"
              type="number"
              className="w-full bg-gray-800 p-3 rounded-md text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
              defaultValue={client?.phone || ""}
              placeholder="Enter the phone..."
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition p-3 rounded-md text-white uppercase font-semibold"
        >
          {client ? "Update" : "Create"}
        </button>
      </Form>
    </div>
  );
};

export default FormClient;
