"use client";
import MenuSales from "./view/menuSales";
import ListSales from "./view/listSales";
import { useState } from "react";
import FormSales from "./view/formSales";
import {
  handleCreateSale,
  handleDeleteSale,
  handleEditSale,
} from "@/app/dashboard/sales/api/route";
import Pagination from "../components/pagination";
import DeleteModalSale from "./view/deleteModalSale";

type SaleResponse = {
  success: boolean;
  data?: any[];
  message?: any;
};

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

  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(sales.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentSales = sales.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
  // Handle submit for creating a new expense
  async function onCreateExpenseSubmit(data: {
    productName: number;
    clientName: number;
    quantity: number;
    price: number;
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
    productName: number;
    clientName: number;
    quantity: number;
    price: number;
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
        setSaleToEdit(null); // Reset the expense to edit
        setShowComponent("list"); // Show the list after editing
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
      <MenuSales
        onFormToggle={handleFormToggle}
        onListToggle={() =>
          setShowComponent(showComponent === "list" ? null : "list")
        }
      />

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
