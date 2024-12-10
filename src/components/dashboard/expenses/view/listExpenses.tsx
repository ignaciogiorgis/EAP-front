type expensesListProps = {
  expenses: {
    id: number;
    name: string;
    value: number;
    description: string;
    date: string;
  }[];
  onEdit: (expense: any) => void;
  onOpenModal: (id: string | number) => void;
};
const listExpenses = ({ expenses, onEdit, onOpenModal }: expensesListProps) => {
  return (
    <div className="mb-5">
      <div className="px-5">
        <div className="relative flex flex-col w-full h-full text-white bg-gray-800 shadow-md rounded-lg bg-clip-border ">
          <table className="sm:table hidden">
            <thead className="">
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
                <th className="p-4 border-b border-indigo-600 bg-gray-800">
                  <p className="text-sm font-normal leading-none text-white">
                    Action
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr
                  key={expense.id}
                  className="hover:bg-gray-800 border border-black"
                >
                  <td className="p-4 bg-gray-900">
                    <p className="text-sm text-gray-100 font-semibold">
                      {expense.name}
                    </p>
                  </td>
                  <td className="p-4 bg-gray-700 ">
                    <p className="text-sm text-white">{expense.value}</p>
                  </td>
                  <td className="p-4 bg-gray-900">
                    <p className="text-sm text-white">{expense.description}</p>
                  </td>
                  <td className="p-4 bg-gray-700">
                    <p className="text-sm text-white">{expense.date}</p>
                  </td>
                  <td className="flex ">
                    <button
                      onClick={() => onEdit(expense)}
                      className="bg-green-300  font-extrabold text-green-900 w-full p-4 hover:bg-green-950 hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onOpenModal(expense.id)}
                      className="bg-red-300  font-extrabold text-red-900 w-full p-4 hover:bg-red-950 hover:text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <div className="flex flex-col sm:hidden p-3">
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex flex-col justify-center gap-2 p-4 mb-4 bg-gray-900 rounded-md"
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
    </div>
  );
};

export default listExpenses;
