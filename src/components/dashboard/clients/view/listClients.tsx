"use client";

import { ClientsListProps } from "@/components/index";

const ListClients = ({ clients, onEdit, onOpenModal }: ClientsListProps) => {
  return (
    <div className="mb-5">
      <div className="px-5">
        <div className="relative flex flex-col w-full h-full bg-gray-900 shadow-lg rounded-xl">
          <table className="hidden sm:table w-full border-collapse overflow-hidden rounded-lg">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Address</th>
                <th className="p-4 text-left">Dni</th>
                <th className="p-4 text-left">Birthday</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr
                  key={client.id}
                  className="hover:bg-gray-800 transition-all border-b border-gray-700"
                >
                  <td className="p-4">
                    {client.firstName + " " + client.lastName}
                  </td>
                  <td className="p-4">{client.address}</td>
                  <td className="p-4">{client.dni}</td>
                  <td className="p-4">{client.birthday}</td>
                  <td className="flex gap-2 justify-center p-4">
                    <button
                      onClick={() => onEdit(client)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onOpenModal(client.id)}
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
            {clients.map((client) => (
              <div
                key={client.id}
                className="p-4 bg-gray-800 rounded-xl shadow-md border border-gray-700"
              >
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Name:</span>{" "}
                  {client.firstName + " " + client.lastName}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Address:</span>{" "}
                  {client.address}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Dni:</span>{" "}
                  {client.dni}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Birthday:</span>{" "}
                  {client.birthday}
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => onEdit(client)}
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onOpenModal(client.id)}
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

export default ListClients;
