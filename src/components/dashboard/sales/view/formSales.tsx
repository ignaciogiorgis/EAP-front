"use client";

import { useState } from "react";
import Form from "next/form";
import { validateForm, ValidationSchema } from "@/utils/validation";

type FormSalesProps = {
  onSubmit: (data: {
    id?: string;
    productName: string;
    clientName: string;
    quantity: number;
    price: number;
    total: number;
    paid: boolean;
    saleDate: string;
  }) => Promise<void>;
  externalError?: string;
  sale?: {
    id: string;
    productName: string;
    clientName: string;
    quantity: number;
    price: number;
    total: number;
    paid: boolean;
    saleDate: string;
  };
  setIsForm: React.Dispatch<React.SetStateAction<boolean>>;
  products: Array<{ id: string; name: string; price: number }>;
  clients: Array<{ id: string; firstName: string; lastName: string }>;
};

const FormSales = ({
  onSubmit,
  externalError,
  sale,
  setIsForm,
  products,
  clients,
}: FormSalesProps) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [displayErrors, setDisplayErrors] = useState<boolean>(false);
  const [selectedSale, setSelectedSale] = useState(sale?.productName || "");
  const [quantity, setQuantity] = useState(sale?.quantity || 1);

  const validationSchema: ValidationSchema = {
    productName: { required: true, customMessage: "Please select a product" },
    clientName: { required: true, customMessage: "Please select a client" },
    quantity: { required: true, customMessage: "The quantity is required" },
  };

  async function handleSubmit(formData: FormData) {
    const rawValues = {
      id: sale?.id || "",
      productName: formData.get("productName") as string,
      clientName: formData.get("clientName") as string,
      quantity: formData.get("quantity") as string,
      saleDate:
        (formData.get("saleDate") as string) || new Date().toISOString(),
    };

    const validationErrors = validateForm(rawValues, validationSchema);

    if (validationErrors.length === 0) {
      const selectedProduct = products.find(
        (p) => p.name === rawValues.productName
      );
      const price = selectedProduct?.price || 0;
      const total = price * Number(rawValues.quantity);

      const formValues = {
        ...rawValues,
        quantity: Number(rawValues.quantity),
        price,
        total,
        paid: formData.get("paid") === "on",
      };

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
    <div className="p-3 flex flex-col justify-center items-center scrollbar-none">
      <Form
        action={handleSubmit}
        className="flex flex-col gap-2 lg:w-1/3 mb-10 bg-white py-7 px-8 rounded-md shadow-xl"
      >
        <div className="flex justify-between mb-4">
          <h3 className="text-white w-2/3 py-2 rounded-md font-semibold text-center bg-indigo-950">
            {sale ? "Edit Sale" : "Add Sale"}
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

        <label className="block text-gray-700">Product</label>
        <select
          name="productName"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          defaultValue={sale?.productName || ""}
          onChange={(e) => setSelectedSale(e.target.value)}
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>

        <label className="block text-gray-700">Client</label>
        <select
          name="clientName"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          defaultValue={sale?.clientName || ""}
        >
          <option value="">Select a client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.firstName}>
              {client.firstName + " " + client.lastName}
            </option>
          ))}
        </select>

        <label className="block text-gray-700">Quantity</label>
        <input
          type="number"
          name="quantity"
          min="1"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          defaultValue={sale?.quantity || 1}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <label className="block text-gray-700">Sale Date</label>
        <input
          type="date"
          name="saleDate"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          defaultValue={
            sale?.saleDate
              ? new Date(sale.saleDate).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0]
          }
        />

        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            name="paid"
            id="paid"
            defaultChecked={sale?.paid}
            className="w-4 h-4"
          />
          <label htmlFor="paid" className="text-gray-700">
            Paid
          </label>
        </div>

        <div className="text-lg font-semibold text-gray-900 mt-4">
          Total: $
          {(
            (products.find((p) => p.name === selectedSale)?.price || 0) *
            quantity
          ).toFixed(2)}
        </div>

        <button
          type="submit"
          className="bg-indigo-500 mt-3 rounded-md text-white shadow-md hover:bg-indigo-700 py-2 uppercase font-bold"
        >
          {sale ? "Update" : "Create"}
        </button>
      </Form>
    </div>
  );
};

export default FormSales;
