"use client";

import { useState, useEffect } from "react";
import {
  handleCreateExpense,
  handleEditExpense,
  handleDeleteExpense,
} from "@/utils/dashboard/expenses";
import FormExpenses from "./view/formExpenses";
import MenuExpenses from "./view/menuExpenses";
import ListExpenses from "./view/listExpenses";
import DeleteModal from "@/components/components/ModalDelete/deleteModal";
import Pagination from "../../components/pagination";
import { ExpensesPageProps } from "@/components/index";

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
  const [searchTerm, setSearchTerm] = useState<string>("");

  const ITEMS_PER_PAGE = 5;

  const filteredExpenses = expenses.filter((expense) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      expense.name.toLowerCase().includes(searchLower) ||
      expense.description.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredExpenses.length / ITEMS_PER_PAGE)
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentExpenses = filteredExpenses.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (currentPage > 1 && currentExpenses.length === 0) {
      setCurrentPage((prev) => Math.max(1, prev - 1));
    }
  }, [currentExpenses.length, currentPage]);

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
        setShowComponent("list");
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error during creation:", error);
      setErrorMessage("An unexpected error occurred.");
    }
  }

  async function onEditExpenseSubmit(data: {
    id?: string;
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
        setExpenseToEdit(null);
        setShowComponent("list");
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error during edit:", error);
      setErrorMessage("An unexpected error occurred.");
    }
  }

  const handleFormToggle = () => {
    setExpenseToEdit(null);
    setShowComponent(showComponent === "form" ? null : "form");
  };

  const deleteExpense = async (id: string | number) => {
    const response = await handleDeleteExpense(id);
    if (response.success) {
      await handleRefresh();
    } else {
      console.log(response.message);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen p-6 text-white">
      <div className="mx-auto">
        <div className="bg-gray-700 shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-center gap-4">
          <MenuExpenses
            onFormToggle={handleFormToggle}
            onListToggle={() =>
              setShowComponent(showComponent === "list" ? null : "list")
            }
          />
          <input
            type="text"
            placeholder="Search Expenses..."
            className="w-full md:w-1/4 px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

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
          <DeleteModal
            onClose={handleCloseModal}
            onDelete={() => {
              if (selectedExpenseId !== null) {
                deleteExpense(selectedExpenseId);
                handleCloseModal();
              }
            }}
            option="Expense"
          />
        )}
      </div>
    </div>
  );
}
