import { useState } from "react";
import Form from "next/form";
import { validateForm, ValidationSchema } from "@/utils/validation";

type FormProductsProps = {
  onSubmit: (data: {
    id?: string;
    name: string;
    quantity: number;
    cost: number;
    profit: number;
  }) => Promise<void>;
  externalError?: string;
  product?: {
    id: string;
    name: string;
    quantity: number;
    cost: number;
    profit: number;
  };
  setIsForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormProducts = ({
  onSubmit,
  externalError,
  product,
  setIsForm,
}: FormProductsProps) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [displayErrors, setDisplayErrors] = useState<boolean>(false);

  const validationSchema: ValidationSchema = {
    name: { required: true, customMessage: "The name is required" },
    quantity: { required: true, customMessage: "The quantity is required" },
    cost: {
      required: true,
      customMessage: "The cost is required",
    },
    profit: { required: true, customMessage: "The profit is required" },
  };

  async function handleSubmit(formData: FormData) {
    const rawValues = {
      id: product?.id || "",
      name: formData.get("name") as string,
      quantity: formData.get("quantity") as string,
      cost: formData.get("cost") as string,
      profit: formData.get("profit") as string,
    };

    // Validación inicial: verificar campos vacíos
    const validationErrors = validateForm(rawValues, validationSchema);

    if (validationErrors.length === 0) {
      // Si no hay errores, convertir los valores necesarios a números
      const formValues = {
        ...rawValues,
        quantity: Number(rawValues.quantity),
        cost: Number(rawValues.cost),
        profit: Number(rawValues.profit),
      };

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
    <div className="p-4 flex flex-col justify-center items-center">
      <Form
        action={handleSubmit}
        className="flex flex-col gap-4 lg:w-1/3 bg-gray-900 text-white p-8 rounded-lg shadow-xl"
      >
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-semibold text-gray-300">
            {product ? "Edit Product" : "Add Product"}
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
              defaultValue={product?.name || ""}
              placeholder="Enter the name..."
            />
          </div>
          <div>
            <label className="text-gray-400">Quantity</label>
            <input
              name="quantity"
              className="w-full bg-gray-800 p-3 rounded-md text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
              defaultValue={product?.quantity || ""}
              placeholder="Enter the quantity..."
            />
          </div>
          <div>
            <label className="text-gray-400">Cost</label>
            <input
              name="cost"
              className="w-full bg-gray-800 p-3 rounded-md text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
              defaultValue={product?.cost || ""}
              placeholder="Enter the cost..."
            />
          </div>
          <div>
            <label className="text-gray-400">Profit</label>
            <input
              name="profit"
              className="w-full bg-gray-800 p-3 rounded-md text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
              defaultValue={product?.profit || ""}
              placeholder="Enter the profit..."
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-indigo-500 mt-3 rounded-md text-white shadow-md hover:bg-indigo-700 py-2 uppercase font-bold"
        >
          {product ? "Update" : "Create"}
        </button>
      </Form>
    </div>
  );
};

export default FormProducts;
