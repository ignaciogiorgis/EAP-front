"use client";

import MenuProducts from "./view/menuProducts";
import ListProducts from "./view/listProducts";
import { useEffect, useState } from "react";
import FormProducts from "./view/formProducts";
import {
  handleCreateProduct,
  handleDeleteProduct,
  handleEditProduct,
} from "@/app/dashboard/products/api/route";
import Pagination from "../components/pagination";
import DeleteModalProduct from "./view/deleteModalProduct";

type ProductResponse = {
  success: boolean;
  data?: any[];
  message?: any;
};

type ProductPageProps = {
  products: any[];
  refreshData: () => Promise<ProductResponse>;
};

const containerProducts = ({
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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const ITEMS_PER_PAGE = 5;

  const filteredProducts = products.filter((product) => {
    const searchLower = searchTerm.toLowerCase();
    return product.name.toLowerCase().includes(searchLower);
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (currentPage > 1 && currentProducts.length === 0) {
      setCurrentPage((prev) => Math.max(1, prev - 1));
    }
  }, [currentProducts.length, currentPage]);

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

        // Ajustar la página actual para no quedar en una vacía
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
    setProductToEdit(null);
    setShowComponent(showComponent === "form" ? null : "form");
  };

  async function onCreateProductSubmit(data: {
    name: string;
    quantity: number;
    cost: number;
    profit: number;
  }) {
    try {
      const response = await handleCreateProduct(data);

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

  async function onEditProductSubmit(data: {
    id?: string;
    name: string;
    quantity: number;
    cost: number;
    profit: number;
  }) {
    if (!data.id) {
      setErrorMessage("The ID is required to edit an product.");
      return;
    }

    try {
      const response = await handleEditProduct(data.id, data);

      if (response.success) {
        await handleRefresh();
        setProductToEdit(null);
        setShowComponent("list");
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error during edit:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  }
  const deleteProduct = async (id: string | number) => {
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
      <div className="flex justify-center ">
        <div className="flex justify-center bg-slate-200 w-1/2 mt-4 rounded-lg">
          <MenuProducts
            onFormToggle={handleFormToggle}
            onListToggle={() =>
              setShowComponent(showComponent === "list" ? null : "list")
            }
          />
          <input
            type="text"
            placeholder="Search expenses..."
            className="mb-10 p-2 mt-6 border rounded text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {showComponent === "form" && !productToEdit && (
        <FormProducts
          onSubmit={onCreateProductSubmit}
          externalError={errorMessage as string}
          setIsForm={() => setShowComponent(null)}
        />
      )}

      {showComponent === "form" && productToEdit && (
        <FormProducts
          onSubmit={onEditProductSubmit}
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
              deleteProduct(selectedProductId);
              handleCloseModal();
            }
          }}
        />
      )}
    </div>
  );
};

export default containerProducts;
