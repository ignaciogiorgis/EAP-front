type ProductsListProps = {
  products: {
    id: number;
    name: string;
    quantity: number;
    cost: number;
    profit: number;
  }[];
  onEdit: (product: any) => void;
  onOpenModal: (id: string | number) => void;
};
const listproducts = ({ products, onEdit, onOpenModal }: ProductsListProps) => {
  return (
    <div className="mb-5">
      <div className="px-5 mx-auto ">
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
                    Quantity
                  </p>
                </th>
                <th className="p-4 border-b border-indigo-600 bg-gray-800">
                  <p className="text-sm font-normal leading-none text-white">
                    Cost
                  </p>
                </th>
                <th className="p-4 border-b border-indigo-600 bg-gray-800">
                  <p className="text-sm font-normal leading-none text-white">
                    Profit
                  </p>
                </th>
                <th className="p-4 border-b border-indigo-600 bg-gray-800">
                  <p className="text-sm font-normal leading-none text-white"></p>
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-800 border border-black"
                >
                  <td className="p-4 bg-gray-900">
                    <p className="text-sm text-gray-100 font-semibold">
                      {product.name}
                    </p>
                  </td>
                  <td className="p-4 bg-gray-700 ">
                    <p className="text-sm text-white">{product.quantity}</p>
                  </td>
                  <td className="p-4 bg-gray-900">
                    <p className="text-sm text-white">{product.cost}</p>
                  </td>
                  <td className="p-4 bg-gray-700">
                    <p className="text-sm text-white">{product.profit}</p>
                  </td>
                  <td className="flex ">
                    <button
                      onClick={() => onEdit(product)}
                      className="bg-green-300  font-extrabold text-green-900 w-full p-4 hover:bg-green-950 hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onOpenModal(product.id)}
                      className="bg-red-300  font-extrabold text-red-900 w-full p-4 hover:bg-red-950 hover:text-white"
                    >
                      Delete
                    </button>
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

export default listproducts;
