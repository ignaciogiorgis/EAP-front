"use client";

import MenuSales from "./view/menuSales";
import ListSales from "./view/listSales";
import { useEffect, useState } from "react";
import FormSales from "./view/formSales";
import {
  handleCreateSale,
  handleDeleteSale,
  handleEditSale,
} from "@/app/dashboard/sales/api/route";
import Pagination from "../../components/pagination";
import DeleteModalSale from "./view/deleteModalSale";

interface SaleResponse {
  success: boolean;
  data?: any[];
  message?: any;
}

type SalesPageProps = {
  sales: any[];
  refreshData: () => Promise<SaleResponse>;
  products: any[];
  clients: any[];
};

const containerProducts = ({
  refreshData,
  sales: initialSales,
  products,
  clients,
}: SalesPageProps) => {
  const [sales, setSales] = useState(initialSales);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showComponent, setShowComponent] = useState<"form" | "list" | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [saleToEdit, setSaleToEdit] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<
    string | number | null
  >(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const ITEMS_PER_PAGE = 5;

  const filteredSales = sales.filter((sale) => {
    const searchLower = searchTerm.toLowerCase();
    return sale.clientName.toLowerCase().includes(searchLower);
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSales.length / ITEMS_PER_PAGE)
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentSales = filteredSales.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (currentPage > 1 && currentSales.length === 0) {
      setCurrentPage((prev) => Math.max(1, prev - 1));
    }
  }, [currentSales.length, currentPage]);

  const handleOpenModal = (id: string | number) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRefresh = async () => {
    try {
      const result = await refreshData();
      if (result.success && result.data) {
        setSales(result.data);

        setCurrentPage((prevPage) => {
          const maxPages = Math.ceil(result.data!.length / ITEMS_PER_PAGE);
          return prevPage > maxPages ? maxPages : prevPage;
        });
      } else {
        setErrorMessage("Data could not be updated.");
      }
    } catch (error) {
      console.error("Error while refreshing data:", error);
      setErrorMessage("Unexpected error updating data.");
    }
  };
  const handleFormToggle = () => {
    setSaleToEdit(null);
    setShowComponent(showComponent === "form" ? null : "form");
  };

  async function onCreateExpenseSubmit(data: {
    productName: string;
    clientName: string;
    quantity: number;
    total: number;
    paid: boolean;
    saleDate: string;
  }) {
    try {
      const response = await handleCreateSale(data);

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

  async function onEditExpenseSubmit(data: {
    id?: string;
    productName: string;
    clientName: string;
    quantity: number;
    total: number;
    paid: boolean;
    saleDate: string;
  }) {
    if (!data.id) {
      setErrorMessage("The ID is required to edit an expense.");
      return;
    }

    try {
      const response = await handleEditSale(data.id, data);

      if (response.success) {
        await handleRefresh();
        setSaleToEdit(null);
        setShowComponent("list");
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error during edit:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  }
  const deleteExpense = async (id: string | number) => {
    const response = await handleDeleteSale(id);

    if (response.success) {
      await handleRefresh();
    } else {
      console.error(response.message);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen p-6 text-white">
      <div className="mx-auto">
        <div className="bg-gray-700 shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-center gap-4">
          <MenuSales
            onFormToggle={handleFormToggle}
            onListToggle={() =>
              setShowComponent(showComponent === "list" ? null : "list")
            }
          />
          <input
            type="text"
            placeholder="Search sale for client..."
            className="w-full md:w-1/4 px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {showComponent === "form" && !saleToEdit && (
        <FormSales
          onSubmit={onCreateExpenseSubmit}
          externalError={errorMessage as string}
          setIsForm={() => setShowComponent(null)}
          products={products}
          clients={clients}
        />
      )}

      {showComponent === "form" && saleToEdit && (
        <FormSales
          onSubmit={onEditExpenseSubmit}
          externalError={errorMessage as string}
          sale={saleToEdit}
          setIsForm={() => {
            setSaleToEdit(null);
            setShowComponent("list");
          }}
          products={products}
          clients={clients}
        />
      )}

      {showComponent === "list" && (
        <>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <ListSales
            sales={currentSales}
            onOpenModal={handleOpenModal}
            onEdit={(sale: any) => {
              setSaleToEdit(sale);
              setShowComponent("form");
            }}
          />
        </>
      )}
      {isModalOpen && (
        <DeleteModalSale
          onClose={handleCloseModal}
          onDelete={() => {
            if (selectedProductId !== null) {
              deleteExpense(selectedProductId);
              handleCloseModal();
            }
          }}
        />
      )}
    </div>
  );
};

export default containerProducts;
