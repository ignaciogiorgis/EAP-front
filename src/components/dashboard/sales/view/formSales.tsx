"use client";

import { useEffect, useState } from "react";
import Form from "next/form";
import { validateForm } from "@/utils/validation";
import { FormSalesProps } from "@/components/index";

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
    <div className="p-4 flex flex-col justify-center items-center">
      <Form
        action="#"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 lg:w-1/3 bg-gray-900 text-white p-8 rounded-lg shadow-xl"
      >
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-semibold text-gray-300">
            {sale ? "Edit Sale" : "Add Sale"}
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
            <label className="text-gray-400">Producto</label>
            <select
              name="productName"
              className="w-full bg-gray-800 p-3 rounded-md text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
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
          </div>
          <div>
            <label className="text-gray-400">Cliente</label>
            <select
              name="clientName"
              className="w-full bg-gray-800 p-3 rounded-md text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
              defaultValue={sale?.clientName || ""}
            >
              <option value="">Seleccionar cliente</option>
              {clients.map((client) => (
                <option key={client.id} value={client.firstName}>
                  {client.firstName + " " + client.lastName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-gray-400">Cantidad</label>
            <input
              type="number"
              name="quantity"
              min="1"
              className="w-full bg-gray-800 p-3 rounded-md text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="text-gray-400">Fecha de Venta</label>
            <input
              type="date"
              name="saleDate"
              className="w-full bg-gray-800 p-3 rounded-md text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
              defaultValue={
                sale?.saleDate
                  ? new Date(sale.saleDate).toISOString().split("T")[0]
                  : new Date().toISOString().split("T")[0]
              }
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                name="paid"
                id="paid"
                defaultChecked={sale?.paid}
                className="w-7 h-7 "
              />
              <label htmlFor="paid" className="text-white">
                Pagado
              </label>
            </div>
          </div>

          <div className="text-lg font-semibold text-white mt-4">
            Total: ${total.toFixed(2)}
          </div>
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
