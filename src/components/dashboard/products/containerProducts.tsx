"use client";
import MenuProducts from "./view/menuProducts";
import ListProducts from "./view/listProducts";
import { useState } from "react";
import FormProducts from "./view/formProducts";
import {
  handleCreateProduct,
  handleDeleteProduct,
  handleEditProduct,
} from "@/app/dashboard/products/api/route";
import Pagination from "../components/pagination";
import DeleteModalProduct from "./view/deleteModalProduct";

type ExpenseResponse = {
  success: boolean;
  data?: any[];
  message?: any;
};

type ProductPageProps = {
  products: any[];
  refreshData: () => Promise<ExpenseResponse>;
};

const containerPorducts = ({
  refreshData,
  products: initialProducts,
}: ProductPageProps) => {
  const [products, setProducts] = useState(initialProducts);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showComponent, setShowComponent] = useState<"form" | "list" | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [productToEdit, setProductToEdit] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<
    string | number | null
  >(null);

  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

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
        setProducts(result.data);
      } else {
        setErrorMessage("Data could not be updated.");
      }
    } catch (error) {
      console.error("Error while refreshing data:", error);
      setErrorMessage("Unexpected error updating data.");
    }
  };
  const handleFormToggle = () => {
    setProductToEdit(null);
    setShowComponent(showComponent === "form" ? null : "form");
  };
  // Handle submit for creating a new expense
  async function onCreateExpenseSubmit(data: {
    name: string;
    quantity: number;
    cost: number;
    profit: number;
  }) {
    try {
      const response = await handleCreateProduct(data);

      if (response.success) {
        await handleRefresh();
        setShowComponent("list"); // Show list after successful creation
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error during creation:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  }

  // Handle submit for editing an existing expense
  async function onEditExpenseSubmit(data: {
    id?: string; // Make id optional
    name: string;
    quantity: number;
    cost: number;
    profit: number;
  }) {
    if (!data.id) {
      setErrorMessage("The ID is required to edit an expense.");
      return;
    }

    try {
      const response = await handleEditProduct(data.id, data);

      if (response.success) {
        await handleRefresh();
        setProductToEdit(null); // Reset the expense to edit
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
    const response = await handleDeleteProduct(id);

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
      <MenuProducts
        onFormToggle={handleFormToggle}
        onListToggle={() =>
          setShowComponent(showComponent === "list" ? null : "list")
        }
      />

      {showComponent === "form" && !productToEdit && (
        <FormProducts
          onSubmit={onCreateExpenseSubmit}
          externalError={errorMessage as string}
          setIsForm={() => setShowComponent(null)}
        />
      )}

      {showComponent === "form" && productToEdit && (
        <FormProducts
          onSubmit={onEditExpenseSubmit}
          externalError={errorMessage as string}
          product={productToEdit}
          setIsForm={() => {
            setProductToEdit(null);
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
          <ListProducts
            products={currentProducts}
            onOpenModal={handleOpenModal}
            onEdit={(product: any) => {
              setProductToEdit(product);
              setShowComponent("form");
            }}
          />
        </>
      )}
      {isModalOpen && (
        <DeleteModalProduct
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

export default containerPorducts;
