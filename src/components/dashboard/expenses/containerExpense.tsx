"use client";

import { useState } from "react";
import {
  handleCreateExpense,
  handleEditExpense,
} from "@/app/dashboard/api/route";
import FormExpenses from "./view/formExpenses";
import MenuExpenses from "./view/menuExpenses";
import ListExpenses from "./view/listExpenses";

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
  const [expenseToEdit, setExpenseToEdit] = useState<any | null>(null);

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
      setErrorMessage(
        "Ocurrió un error inesperado. Inténtalo de nuevo más tarde."
      );
    }
  }

  // Handle submit for editing an existing expense
  async function onEditExpenseSubmit(data: {
    id?: string; // Make `id` optional
    name: string;
    value: string;
    description: string;
    date: string;
  }) {
    if (!data.id) {
      setErrorMessage("El ID es requerido para editar un gasto.");
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
      setErrorMessage(
        "Ocurrió un error inesperado. Inténtalo de nuevo más tarde."
      );
    }
  }

  // Handle form toggle
  const handleFormToggle = () => {
    setExpenseToEdit(null); // Reset expenseToEdit when switching to create
    setShowComponent(showComponent === "form" ? null : "form");
  };

  return (
    <div className="overflow-auto scrollbar-hide">
      <MenuExpenses
        onFormToggle={handleFormToggle} // Reset the expenseToEdit when toggling the form
        onListToggle={() =>
          setShowComponent(showComponent === "list" ? null : "list")
        }
      />

      {/* Show Form for creating expense */}
      {showComponent === "form" && !expenseToEdit && (
        <FormExpenses
          onSubmit={onCreateExpenseSubmit}
          externalError={errorMessage as string}
          setIsForm={() => setShowComponent(null)} // Close the form
        />
      )}

      {/* Show Form for editing an existing expense */}
      {showComponent === "form" && expenseToEdit && (
        <FormExpenses
          onSubmit={onEditExpenseSubmit}
          externalError={errorMessage as string}
          expense={expenseToEdit} // Pass the expense to edit
          setIsForm={() => {
            setExpenseToEdit(null); // Reset the expense to edit
            setShowComponent("list"); // Show the list after editing
          }}
        />
      )}

      {/* Show List of expenses */}
      {showComponent === "list" && (
        <ListExpenses
          expenses={expenses}
          onEdit={(expense) => {
            setExpenseToEdit(expense); // Set the expense to edit
            setShowComponent("form"); // Switch to the form for editing
          }}
        />
      )}
    </div>
  );
}
