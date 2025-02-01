"use client";
import { expensesListProps } from "@/components/index";

const ListExpenses = ({ expenses, onEdit, onOpenModal }: expensesListProps) => {
  return (
    <div className="mb-5">
      <div className="px-5">
        <div className="relative flex flex-col w-full h-full text-white bg-gray-800 shadow-md rounded-lg bg-clip-border">
          <table className="sm:table hidden">
            <thead>
              <tr>
                <th className="p-4 border-b border-indigo-600 bg-gray-800">
                  Name
                </th>
                <th className="p-4 border-b border-indigo-600 bg-gray-800">
                  Value
                </th>
                <th className="p-4 border-b border-indigo-600 bg-gray-800">
                  Description
                </th>
                <th className="p-4 border-b border-indigo-600 bg-gray-800">
                  Date
                </th>
                <th className="p-4 border-b border-indigo-600 bg-gray-800">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="hover:bg-gray-800 border border-black"
                >
                  <td className="p-4 bg-gray-900">{expense.name}</td>
                  <td className="p-4 bg-gray-700">{expense.value}</td>
                  <td className="p-4 bg-gray-900">{expense.description}</td>
                  <td className="p-4 bg-gray-700">{expense.date}</td>
                  <td className="flex">
                    <button
                      onClick={() => onEdit(expense)}
                      className="bg-green-300 font-extrabold text-green-900 w-full p-4 hover:bg-green-950 hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onOpenModal(expense.id)}
                      className="bg-red-300 font-extrabold text-red-900 w-full p-4 hover:bg-red-950 hover:text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-col sm:hidden p-3">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex flex-col gap-2 p-4 mb-4 bg-gray-900 rounded-md"
              >
                <p className="text-sm font-bold text-white">
                  Name: <span className="font-normal">{expense.name}</span>
                </p>
                <p className="text-sm font-bold text-white">
                  Value: <span className="font-normal">{expense.value}</span>
                </p>
                <p className="text-sm font-bold text-white">
                  Description:{" "}
                  <span className="font-normal">{expense.description}</span>
                </p>
                <p className="text-sm font-bold text-white">
                  Date: <span className="font-normal">{expense.date}</span>
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={() => onEdit(expense)}
                    className="bg-green-300 w-full font-extrabold text-green-900 p-2 hover:bg-green-950 hover:text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onOpenModal(expense.id)}
                    className="bg-red-300 w-full font-extrabold text-red-900 p-2 hover:bg-red-950 hover:text-white"
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
