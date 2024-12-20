"use client";

import { useState } from "react";
import MenuClients from "./view/menuClients";
import ListClients from "./view/listClients";
import FormClients from "./view/formClients";
import {
  handleCreateClient,
  handleDeleteClient,
  handleEditClient,
} from "@/app/dashboard/clients/api/route";
import Pagination from "../components/pagination";
import DeleteModalClient from "./view/deleteModalClients";

type ClientResponse = {
  success: boolean;
  data?: any[];
  message?: any;
};

type ClientPageProps = {
  clients: any[];
  refreshData: () => Promise<ClientResponse>;
};

const containerClients = ({
  refreshData,
  clients: initialClients,
}: ClientPageProps) => {
  const [clients, setClients] = useState(initialClients);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showComponent, setShowComponent] = useState<"form" | "list" | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [clientToEdit, setClientToEdit] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<
    string | number | null
  >(null);

  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(clients.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentClients = clients.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleOpenModal = (id: string | number) => {
    setSelectedClientId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRefresh = async () => {
    try {
      const result = await refreshData();
      if (result.success && result.data) {
        setClients(result.data);
      } else {
        setErrorMessage("Data could not be updated.");
      }
    } catch (error) {
      console.error("Error while refreshing data:", error);
      setErrorMessage("Unexpected error updating data.");
    }
  };
  const handleFormToggle = () => {
    setClientToEdit(null);
    setShowComponent(showComponent === "form" ? null : "form");
  };
  async function onCreateClientSubmit(data: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    birthday: string;
    dni: number;
    phone: number;
  }) {
    try {
      const response = await handleCreateClient(data);

      if (response.success) {
        await handleRefresh();
        setShowComponent("list");
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error during creation:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  }

  async function onEditClientSubmit(data: {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    birthday: string;
    dni: number;
    phone: number;
  }) {
    if (!data.id) {
      setErrorMessage("The ID is required to edit an expense.");
      return;
    }

    try {
      const response = await handleEditClient(data.id, data);

      if (response.success) {
        await handleRefresh();
        setClientToEdit(null);
        setShowComponent("list");
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error during edit:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  }
  const deleteClient = async (id: string | number) => {
    const response = await handleDeleteClient(id);

    if (response.success) {
      await handleRefresh(); // Refresca los datos tras el borrado
    } else {
      console.error(response.message); // Muestra el mensaje de error
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="overflow-auto scrollbar-hide">
      <MenuClients
        onFormToggle={handleFormToggle}
        onListToggle={() =>
          setShowComponent(showComponent === "list" ? null : "list")
        }
      />

      {showComponent === "form" && !clientToEdit && (
        <FormClients
          onSubmit={onCreateClientSubmit}
          externalError={errorMessage as string}
          setIsForm={() => setShowComponent(null)}
        />
      )}

      {showComponent === "form" && clientToEdit && (
        <FormClients
          onSubmit={onEditClientSubmit}
          externalError={errorMessage as string}
          client={clientToEdit}
          setIsForm={() => {
            setClientToEdit(null);
            setShowComponent("list");
          }}
        />
      )}

      {showComponent === "list" && (
        <>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <ListClients
            clients={currentClients}
            onOpenModal={handleOpenModal}
            onEdit={(client: any) => {
              setClientToEdit(client);
              setShowComponent("form");
            }}
          />
        </>
      )}
      {isModalOpen && (
        <DeleteModalClient
          onClose={handleCloseModal}
          onDelete={() => {
            if (selectedClientId !== null) {
              deleteClient(selectedClientId);
              handleCloseModal();
            }
          }}
        />
      )}
    </div>
  );
};

export default containerClients;
