import React from "react";

type expensesListProps = {
  expenses: {
    name: string;
    value: number;
    description: string;
    date: string;
  }[];
};
const listExpenses = ({ expenses }: expensesListProps) => {
  return (
    <div className="mb-5">
      <div className="max-w-[720px] mx-auto ">
        <div className="relative flex flex-col w-full h-full text-white bg-gray-800 shadow-md rounded-lg bg-clip-border">
          <table className="w-full text-left table-auto min-w-max ">
            <thead>
              <tr>
                <th className="p-4 border-b border-indigo-600 bg-gray-800">
                  <p className="text-sm font-normal leading-none text-white">
                    Name
                  </p>
                </th>
                <th className="p-4 border-b border-indigo-600 bg-gray-800">
                  <p className="text-sm font-normal leading-none text-white">
                    Value
                  </p>
                </th>
                <th className="p-4 border-b border-indigo-600 bg-gray-800">
                  <p className="text-sm font-normal leading-none text-white">
                    Description
                  </p>
                </th>
                <th className="p-4 border-b border-indigo-600 bg-gray-800">
                  <p className="text-sm font-normal leading-none text-white">
                    Date
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={index} className="hover:bg-gray-800">
                  <td className="p-4 bg-gray-900">
                    <p className="text-sm text-gray-100 font-semibold">
                      {expense.name}
                    </p>
                  </td>
                  <td className="p-4 bg-gray-700">
                    <p className="text-sm text-white">{expense.value}</p>
                  </td>
                  <td className="p-4 bg-gray-900">
                    <p className="text-sm text-white">{expense.description}</p>
                  </td>
                  <td className="p-4 bg-gray-700">
                    <p className="text-sm text-white">{expense.date}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default listExpenses;
