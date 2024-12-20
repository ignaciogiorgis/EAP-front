type ClientsListProps = {
  clients: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    birthday: string;
    dni: number;
    phone: number;
  }[];
  onEdit: (client: any) => void;
  onOpenModal: (id: string | number) => void;
};
const listClients = ({ clients, onEdit, onOpenModal }: ClientsListProps) => {
  return (
    <div className="mb-5">
      <div className="px-5">
        <div className="relative flex flex-col w-full h-full text-white bg-gray-800 shadow-md rounded-lg bg-clip-border ">
          <table className="sm:table hidden">
            <thead>
              <tr>
                <th className="p-4 border-b border-indigo-600 bg-gray-800">
                  <p className="text-sm font-normal leading-none text-white">
                    First Name
                  </p>
                </th>
                <th className="p-4 border-b border-indigo-600 bg-gray-800">
                  <p className="text-sm font-normal leading-none text-white truncate">
                    Last Name
                  </p>
                </th>
                <th className="p-4 border-b border-indigo-600 bg-gray-800">
                  <p className="text-sm font-normal leading-none text-white">
                    Email
                  </p>
                </th>
               
                <th className="p-4 border-b border-indigo-600 bg-gray-800">
                  <p className="text-sm font-normal leading-none text-white">
                    Dni
                  </p>
                </th>
                <th className="p-4 border-b border-indigo-600 bg-gray-800">
                  <p className="text-sm font-normal leading-none text-white">
                    Phone
                  </p>
                </th>
                <th className="p-4 border-b border-indigo-600 bg-gray-800">
                  <p className="text-sm font-normal leading-none text-white">
                    Actions
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr
                  key={client.id}
                  className="hover:bg-gray-800 border border-black"
                >
                  <td className="p-4 bg-gray-900">
                    <p className="text-sm text-gray-100 font-semibold">
                      {client.firstName}
                    </p>
                  </td>
                  <td className="p-4 bg-gray-700 ">
                    <p className="text-sm text-white">{client.lastName}</p>
                  </td>
                  <td className="p-4 bg-gray-900">
                    <p className="text-sm text-white">{client.email}</p>
                  </td>
                 
                  <td className="p-4 bg-gray-700">
                    <p className="text-sm text-white">{client.dni}</p>
                  </td>
                  <td className="p-4 bg-gray-700">
                    <p className="text-sm text-white">{client.phone}</p>
                  </td>
                  <td className="flex ">
                    <button
                      onClick={() => onEdit(client)}
                      className="bg-green-300  font-extrabold text-green-900 w-full p-4 hover:bg-green-950 hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onOpenModal(client.id)}
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
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="flex flex-col justify-center gap-2 p-4 mb-4 bg-gray-900 rounded-md"
                >
                  <p className="text-sm font-bold text-white">
                    Last Name:{" "}
                    <span className="font-normal">{client.firstName}</span>
                  </p>
                  <p className="text-sm font-bold text-white">
                    Last Name:{" "}
                    <span className="font-normal">{client.lastName}</span>
                  </p>
                  <p className="text-sm font-bold text-white">
                    Email: <span className="font-normal">{client.email}</span>
                  </p>
                  <p className="text-sm font-bold text-white">
                    Address:{" "}
                    <span className="font-normal">{client.address}</span>
                  </p>
                  <p className="text-sm font-bold text-white">
                    Birthday:{" "}
                    <span className="font-normal">{client.birthday}</span>
                  </p>
                  <p className="text-sm font-bold text-white">
                    Dni: <span className="font-normal">{client.dni}</span>
                  </p>
                  <p className="text-sm font-bold text-white">
                    Phone: <span className="font-normal">{client.phone}</span>
                  </p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => onEdit(client)}
                      className="bg-green-300 w-full font-extrabold text-green-900 p-2 hover:bg-green-950 hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onOpenModal(client.id)}
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

export default listClients;
