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
    <div className="p-3 flex flex-col justify-center items-center scrollbar-none">
      <Form
        action={handleSubmit}
        className="flex flex-col gap-2 lg:w-1/3 mb-10 bg-white py-7 px-8 rounded-md border border-black border-dotted shadow-xl"
      >
        <div className="flex justify-between mb-4">
          <h3 className="text-white w-2/3 py-2 rounded-md font-semibold text-center bg-indigo-950">
            {product ? "Edit Product" : "Add Product"}
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
          defaultValue={product?.name || ""}
        />

        <label className="block text-gray-700">quantity</label>
        <input
          name="quantity"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          defaultValue={product?.quantity || ""}
        />

        <label className="block text-gray-700">cost</label>
        <input
          name="cost"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          defaultValue={product?.cost || ""}
        />

        <label className="block text-gray-700">profit</label>
        <input
          name="profit"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          defaultValue={product?.profit || ""}
        />

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
