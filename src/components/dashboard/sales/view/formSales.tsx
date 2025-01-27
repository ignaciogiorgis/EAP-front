"use client";

import { useEffect, useState } from "react";
import Form from "next/form";
import { validateForm } from "@/utils/validation";

type FormSalesProps = {
  onSubmit: (data: {
    id?: string;
    productName: string;
    clientName: string;
    quantity: number;
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
    total: number;
    paid: boolean;
    saleDate: string;
  };
  setIsForm: React.Dispatch<React.SetStateAction<boolean>>;
  products: Array<{ id: string; name: string; cost: number; profit: number }>;
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
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(sale?.quantity || 1);
  const [total, setTotal] = useState<number>(0);

  const validationSchema = {
    productName: {
      required: true,
      customMessage: "The product is required",
    },
    clientName: {
      required: true,
      customMessage: "Por favor seleccione un cliente",
    },
  };

  useEffect(() => {
    if (selectedProduct && quantity) {
      const product = products.find((p) => p.name === selectedProduct);
      if (product) {
        const pricePerUnit = product.cost + product.profit;
        setTotal(pricePerUnit * quantity);
      }
    }
  }, [selectedProduct, quantity, products]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const rawValues = {
      id: sale?.id || "",
      productName: formData.get("productName") as string,
      clientName: formData.get("clientName") as string,
      quantity: formData.get("quantity") as string,
      total: total.toString(),
      paid: formData.get("paid") === "on" ? "true" : "false",
      saleDate: formData.get("saleDate") as string,
    };

    const validationErrors = validateForm(rawValues, validationSchema);

    if (validationErrors.length === 0) {
      const formValues = {
        ...rawValues,
        quantity: Number(rawValues.quantity),
        total: total,
        paid: Boolean(rawValues.paid),
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
        action="#"
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 lg:w-1/3 mb-10 bg-white py-7 px-8 rounded-md shadow-xl"
      >
        <div className="flex justify-between mb-4">
          <h3 className="text-white w-2/3 py-2 rounded-md font-semibold text-center bg-indigo-950">
            {sale ? "Editar Venta" : "Agregar Venta"}
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

        <label className="block text-gray-700">Producto</label>
        <select
          name="productName"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          defaultValue={sale?.productName || ""}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">Seleccionar producto</option>
          {products.map((product) => (
            <option key={product.id} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>

        <label className="block text-gray-700">Cliente</label>
        <select
          name="clientName"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          defaultValue={sale?.clientName || ""}
        >
          <option value="">Seleccionar cliente</option>
          {clients.map((client) => (
            <option key={client.id} value={client.firstName}>
              {client.firstName + " " + client.lastName}
            </option>
          ))}
        </select>

        <label className="block text-gray-700">Cantidad</label>
        <input
          type="number"
          name="quantity"
          min="1"
          className="py-3 px-4 bg-slate-200 rounded-md text-black"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <label className="block text-gray-700">Fecha de Venta</label>
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
            Pagado
          </label>
        </div>

        <div className="text-lg font-semibold text-gray-900 mt-4">
          Total: ${total.toFixed(2)}
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
