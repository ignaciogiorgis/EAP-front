import { useState } from "react";
import Form from "next/form";
import { validateForm, ValidationSchema } from "@/utils/validation";
import { format } from "date-fns";
import { FormExpensesProps } from "@/components/index";

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
    const formValues = {
      id: expense?.id || "",
      name: (formData.get("name") as string) || "",
      value: (formData.get("value") as string) || "",
      description: (formData.get("description") as string) || "",
      date: (formData.get("date") as string) || "",
    };

    const validationErrors = validateForm(
      formValues as { [key: string]: string },
      validationSchema
    );

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setDisplayErrors(true);
      return;
    }

    let formattedDate = "";
    try {
      formattedDate = format(new Date(formValues.date), "yyyy-MM-dd");
    } catch (error) {
      console.error("Invalid date value:", error);
      setErrors(["The date format is invalid."]);
      setDisplayErrors(true);
      return;
    }

    formValues.date = formattedDate;

    await onSubmit(formValues);
    setIsForm(false);
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
            {expense ? "Edit Expense" : "Add Expense"}
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
            <label className="text-gray-400">Name</label>
            <input
              type="text"
              name="name"
              className="w-full bg-gray-800 p-3 rounded-md text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
              defaultValue={expense?.name || ""}
              placeholder="Enter the name..."
            />
          </div>
          <div>
            <label className="text-gray-400">Value</label>
            <input
              name="value"
              type="number"
              className="w-full bg-gray-800 p-3 rounded-md text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
              defaultValue={expense?.value || ""}
              placeholder="Enter the value..."
            />
          </div>
          <div>
            <label className="text-gray-400">Description</label>
            <input
              name="description"
              className="w-full bg-gray-800 p-3 rounded-md text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
              defaultValue={expense?.description || ""}
              placeholder="Enter the description..."
            />
          </div>
          <div>
            <label className="text-gray-400">Date</label>
            <input
              type="date"
              name="date"
              className="w-full bg-gray-800 p-3 rounded-md text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
              defaultValue={expense?.date || ""}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition p-3 rounded-md text-white uppercase font-semibold"
        >
          {expense ? "Update" : "Create"}
        </button>
      </Form>
    </div>
  );
};

export default FormExpenses;
