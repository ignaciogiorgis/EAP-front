"use client";

import { useState } from "react";
import {
  handleCreateExpense,
  handleEditExpense,
  handleDeleteExpense,
} from "@/app/dashboard/api/route";
import FormExpenses from "./view/formExpenses";
import MenuExpenses from "./view/menuExpenses";
import ListExpenses from "./view/listExpenses";
import DeleteModalExpense from "./view/deleteModalExpense";
import Pagination from "./view/paginatioExpenses";

type ExpenseResponse = {
  success: boolean;
  data?: any[];
  message?: any;
};

type ExpensesPageProps = {
  expenses: any[];
  refreshData: () => Promise<ExpenseResponse>;
};

const ITEMS_PER_PAGE = 5; // Número de elementos por página.

export default function ContainerExpense({
  expenses: initialExpenses,
  refreshData,
}: ExpensesPageProps) {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showComponent, setShowComponent] = useState<"form" | "list" | null>(
    null
  );
  const [expenseToEdit, setExpenseToEdit] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState<
    string | number | null
  >(null);

  const totalPages = Math.ceil(expenses.length / ITEMS_PER_PAGE);

  // Calcular los elementos de la página actual.
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentExpenses = expenses.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleOpenModal = (id: string | number) => {
    setSelectedExpenseId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRefresh = async () => {
    try {
      const result = await refreshData();
      if (result.success && result.data) {
        setExpenses(result.data);
      } else {
        setErrorMessage("No se pudieron actualizar los datos.");
      }
    } catch (error) {
      console.error("Error al refrescar datos:", error);
      setErrorMessage("Error inesperado al actualizar los datos.");
    }
  };

  const deleteExpense = async (id: string | number) => {
    const response = await handleDeleteExpense(id);

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
    <div className="overflow-auto scrollbar-hide">
      <MenuExpenses
        onFormToggle={() =>
          setShowComponent(showComponent === "form" ? null : "form")
        }
        onListToggle={() =>
          setShowComponent(showComponent === "list" ? null : "list")
        }
      />

      {showComponent === "form" && !expenseToEdit && (
        <FormExpenses
          onSubmit={async (data) => {
            await handleCreateExpense(data);
            await handleRefresh();
          }}
          externalError={errorMessage as string}
          setIsForm={() => setShowComponent(null)}
        />
      )}

      {showComponent === "list" && (
        <>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <ListExpenses
            expenses={currentExpenses}
            onOpenModal={handleOpenModal}
            onEdit={(expense) => {
              setExpenseToEdit(expense);
              setShowComponent("form");
            }}
          />
        </>
      )}

      {isModalOpen && (
        <DeleteModalExpense
          onClose={handleCloseModal}
          onDelete={() => {
            if (selectedExpenseId !== null) {
              deleteExpense(selectedExpenseId);
              handleCloseModal();
            }
          }}
        />
      )}
    </div>
  );
}
