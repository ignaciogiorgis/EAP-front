import { useState } from "react";
import Form from "next/form";
import { validateForm, ValidationSchema } from "@/utils/validation";
import { format } from "date-fns";

type FormExpensesProps = {
  onSubmit: (data: {
    id?: string;
    name: string;
    value: string;
    description: string;
    date: string;
  }) => Promise<void>;
  externalError?: string;
  expense?: {
    id: string;
    name: string;
    value: string;
    description: string;
    date: string;
  };
  setIsForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormExpenses = ({
  onSubmit,
  externalError,
  expense,
  setIsForm,
}: FormExpensesProps) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [displayErrors, setDisplayErrors] = useState<boolean>(false);

  const validationSchema: ValidationSchema = {
    name: { required: true, customMessage: "The name is required" },
    value: { required: true, customMessage: "The value is required" },
    description: {
      required: true,
      customMessage: "The description is required",
    },
    date: { required: true, customMessage: "The date is required" },
  };

  async function handleSubmit(formData: FormData) {
    const dateValue = formData.get("date") as string;
    const formValues = {
      id: expense?.id || "", // Garantizamos que sea una cadena
      name: formData.get("name") as string,
      value: formData.get("value") as string,
      description: formData.get("description") as string,
      date: format(new Date(formData.get("date") as string), "yyyy-MM-dd"),
    };

    const validationErrors = validateForm(
      formValues as { [key: string]: string },
      validationSchema
    );

    if (validationErrors.length === 0) {
      await onSubmit(formValues);
      setIsForm(false); // Cierra el formulario tras el éxito
    } else {
      setErrors(validationErrors);
      setDisplayErrors(true);
    }
  }

  const combinedErrors = [...errors];
  if (externalError) combinedErrors.push(externalError);

  return (
    <div className="p-3 flex flex-col justify-center items-center scrollbar-none">
      <Form
        action={handleSubmit}
        className="flex flex-col gap-2 lg:w-1/3 mb-10 bg-white py-7 px-8 rounded-md border  shadow-2xl"
      >
        <div className="flex justify-between mb-4">
          <h3 className="text-white w-2/3 py-2 rounded-md font-semibold text-center bg-indigo-950">
            {expense ? "Edit Expense" : "Add Expense"}
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

        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          defaultValue={expense?.name || ""}
          placeholder="Enter the name..."
        />

        <label className="block text-gray-700">Value</label>
        <input
          name="value"
          type="number"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          defaultValue={expense?.value || ""}
          placeholder="Enter the value..."
        />

        <label className="block text-gray-700">Description</label>
        <input
          name="description"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          defaultValue={expense?.description || ""}
          placeholder="Enter the description..."
        />

        <label className="block text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          defaultValue={expense?.date || ""}
        />

        <button
          type="submit"
          className="bg-indigo-500 mt-3 rounded-md text-white shadow-md hover:bg-indigo-700 py-2 uppercase font-bold"
        >
          {expense ? "Update" : "Create"}
        </button>
      </Form>
    </div>
  );
};

export default FormExpenses;
