"use client";

import { useState } from "react";
import {
  handleCreateExpense,
  handleEditExpense,
} from "@/app/dashboard/expenses/api/route";
import FormExpenses from "./view/formExpenses";
import MenuExpenses from "./view/menuExpenses";
import ListExpenses from "./view/listExpenses";
import DeleteModalExpense from "./view/deleteModalExpense";
import { handleDeleteExpense } from "@/app/dashboard/expenses/api/route";
import Pagination from "../components/pagination";

type ExpenseResponse = {
  success: boolean;
  data?: any[];
  message?: any;
};

type ExpensesPageProps = {
  expenses: any[];
  refreshData: () => Promise<ExpenseResponse>;
};

export default function ContainerExpense({
  expenses: initialExpenses,
  refreshData,
}: ExpensesPageProps) {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showComponent, setShowComponent] = useState<"form" | "list" | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [expenseToEdit, setExpenseToEdit] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState<
    string | number | null
  >(null);

  const ITEMS_PER_PAGE = 5;
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
        setErrorMessage("Data could not be updated.");
      }
    } catch (error) {
      console.error("Error while refreshing data:", error);
      setErrorMessage("Unexpected error updating data.");
    }
  };

  // Handle submit for creating a new expense
  async function onCreateExpenseSubmit(data: {
    name: string;
    value: string;
    description: string;
    date: string;
  }) {
    try {
      const response = await handleCreateExpense(data);

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
    value: string;
    description: string;
    date: string;
  }) {
    if (!data.id) {
      setErrorMessage("The ID is required to edit an expense.");
      return;
    }

    try {
      const response = await handleEditExpense(data.id, data);

      if (response.success) {
        await handleRefresh();
        setExpenseToEdit(null); // Reset the expense to edit
        setShowComponent("list"); // Show the list after editing
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error during edit:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  }

  // Handle form toggle
  const handleFormToggle = () => {
    setExpenseToEdit(null); // Reset expenseToEdit when switching to create
    setShowComponent(showComponent === "form" ? null : "form");
  };

  const deleteExpense = async (id: string | number) => {
    const response = await handleDeleteExpense(id);

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
      <MenuExpenses
        onFormToggle={handleFormToggle}
        onListToggle={() =>
          setShowComponent(showComponent === "list" ? null : "list")
        }
      />

      {showComponent === "form" && !expenseToEdit && (
        <FormExpenses
          onSubmit={onCreateExpenseSubmit}
          externalError={errorMessage as string}
          setIsForm={() => setShowComponent(null)}
        />
      )}

      {showComponent === "form" && expenseToEdit && (
        <FormExpenses
          onSubmit={onEditExpenseSubmit}
          externalError={errorMessage as string}
          expense={expenseToEdit}
          setIsForm={() => {
            setExpenseToEdit(null);
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
