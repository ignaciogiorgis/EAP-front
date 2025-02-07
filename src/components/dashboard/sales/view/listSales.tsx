"use client";

import { SalesListProps } from "@/components/index";

const ListSales = ({ sales, onEdit, onOpenModal }: SalesListProps) => {
  return (
    <div className="mb-5">
      <div className="px-5">
        <div className="relative flex flex-col w-full h-full bg-gray-900 shadow-lg rounded-xl">
          <table className="hidden sm:table w-full border-collapse overflow-hidden rounded-lg">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <th className="p-4 text-left">Product Name</th>
                <th className="p-4 text-left">Client Name</th>
                <th className="p-4 text-left">Quantity</th>
                <th className="p-4 text-left">Total</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr
                  key={sale.id}
                  className="hover:bg-gray-800 transition-all border-b border-gray-700"
                >
                  <td className="p-4">{sale.productName}</td>
                  <td className="p-4">{sale.clientName}</td>
                  <td className="p-4">{sale.quantity}</td>
                  <td className="p-4">{sale.total}</td>
                  <td className="flex gap-2 justify-center p-4">
                    <button
                      onClick={() => onEdit(sale)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onOpenModal(sale.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-col gap-4 sm:hidden p-4">
            {sales.map((sale) => (
              <div
                key={sale.id}
                className="p-4 bg-gray-800 rounded-xl shadow-md border border-gray-700"
              >
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Name:</span>{" "}
                  {sale.productName}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Value:</span>{" "}
                  {sale.clientName}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Description:</span>{" "}
                  {sale.quantity}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Date:</span>{" "}
                  {sale.total}
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => onEdit(sale)}
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onOpenModal(sale.id)}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListSales;
