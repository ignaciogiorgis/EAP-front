"use client";

import { expensesListProps } from "@/components/index";

const ListExpenses = ({ expenses, onEdit, onOpenModal }: expensesListProps) => {
  return (
    <div className="mb-5">
      <div className="px-5">
        <div className="relative flex flex-col w-full h-full bg-gray-900 shadow-lg rounded-xl">
          {/* Tabla para pantallas grandes */}
          <table className="hidden sm:table w-full border-collapse overflow-hidden rounded-lg">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Value</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="hover:bg-gray-800 transition-all border-b border-gray-700"
                >
                  <td className="p-4">{expense.name}</td>
                  <td className="p-4">{expense.value}</td>
                  <td className="p-4">{expense.description}</td>
                  <td className="p-4">{expense.date}</td>
                  <td className="flex gap-2 justify-center p-4">
                    <button
                      onClick={() => onEdit(expense)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onOpenModal(expense.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Vista de tarjetas para móviles */}
          <div className="flex flex-col gap-4 sm:hidden p-4">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="p-4 bg-gray-800 rounded-xl shadow-md border border-gray-700"
              >
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Name:</span>{" "}
                  {expense.name}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Value:</span>{" "}
                  {expense.value}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Description:</span>{" "}
                  {expense.description}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Date:</span>{" "}
                  {expense.date}
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => onEdit(expense)}
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onOpenModal(expense.id)}
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

export default ListExpenses;
