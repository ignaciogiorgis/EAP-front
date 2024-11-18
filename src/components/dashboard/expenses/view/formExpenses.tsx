"use client";
import { useEffect, useState } from "react";
import Form from "next/form";
import { validateForm, ValidationSchema } from "@/utils/validation";

type CreateExpenseFormProps = {
  onSubmit: (data: {
    name: string;
    value: string;
    description: string;
    date: string;
  }) => Promise<void>;
  externalError?: string;
  setIsForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const formExpenses = ({
  onSubmit,
  externalError,
  setIsForm,
}: CreateExpenseFormProps) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [formValues, setFormValues] = useState({
    name: "",
    value: "",
    description: "",
    date: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [displayErrors, setDisplayErrors] = useState<boolean>(false);

  const validationSchema: ValidationSchema = {
    name: { required: true, customMessage: "The name is required" },
    value: {
      required: true,
      customMessage: "The value is required",
    },
    description: {
      required: true,
      customMessage: "The description is required",
    },
    date: {
      required: true,
      customMessage: "The date is required",
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
    <div className=" p-3 flex flex-col justify-center items-center scrollbar-none">
      <Form
        action={handleSubmit}
        className="flex flex-col  gap-2 lg:w-1/3 mb-10 bg-white py-7  px-8 rounded-md border border-black border-dotted shadow-xl "
      >
        <div className="flex justify-between mb-4">
          <h3 className="text-white w-2/3  py-2 rounded-md font-semibold text-center bg-indigo-950">
            Add your Expense
          </h3>
          <button
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
          value={formValues.name}
          onChange={handleChange}
        />

        <label className="block text-gray-700">Value</label>
        <input
          name="value"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          value={formValues.value}
          onChange={handleChange}
        />

        <label className="block text-gray-700">Description</label>
        <input
          name="description"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          value={formValues.description}
          onChange={handleChange}
        />

        <label className="block text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          value={formValues.date}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-indigo-500 mt-3 rounded-md text-white shadow-md hover:bg-indigo-700 py-2 uppercase font-bold"
        >
          Create
        </button>
      </Form>
    </div>
  );
};

export default formExpenses;
