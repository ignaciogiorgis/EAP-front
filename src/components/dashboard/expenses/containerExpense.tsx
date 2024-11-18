"use client";

import { useState } from "react";
<<<<<<< HEAD
import {
  handleCreateExpense,
  handleEditExpense,
  handleShowExpenses,
} from "@/app/dashboard/api/route";
=======
import { handleCreateExpense } from "@/app/dashboard/api/route";
>>>>>>> parent of 07d4789 (24-create-function-edit-expense)
import FormExpenses from "./view/formExpenses";
import MenuExpenses from "./view/menuExpenses";
import ListExpenses from "./view/listExpenses";

type ExpensesPageProps = {
  expenses: any[];
};

export default function ContainerExpense({
  expenses: initialExpenses,
}: ExpensesPageProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showComponent, setShowComponent] = useState<"form" | "list" | null>(
    null
  );
<<<<<<< HEAD
  const [expenseToEdit, setExpenseToEdit] = useState<any | null>(null);
  const [expenses, setExpenses] = useState(initialExpenses);

  const reloadExpenses = async () => {
    try {
      const response = await handleShowExpenses();
      if (response.success) {
        setExpenses(response.data); // Actualiza la lista de gastos
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error al recargar los gastos:", error);
      setErrorMessage("Error al recargar los gastos. Inténtalo más tarde.");
    }
  };

  // Handle submit for creating a new expense
=======
>>>>>>> parent of 07d4789 (24-create-function-edit-expense)
  async function onCreateExpenseSubmit(data: {
    name: string;
    value: string;
    description: string;
    date: string;
  }) {
    try {
      const response = await handleCreateExpense(data);

      if (response.success) {
<<<<<<< HEAD
        await reloadExpenses(); // Recargar la lista después de crear un gasto
        setShowComponent("list"); // Mostrar la lista
=======
        setShowComponent(null);
>>>>>>> parent of 07d4789 (24-create-function-edit-expense)
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
<<<<<<< HEAD
      console.error("Error durante la creación:", error);
=======
      console.error("Error durante el registro:", error);
>>>>>>> parent of 07d4789 (24-create-function-edit-expense)
      setErrorMessage(
        "Ocurrió un error inesperado. Inténtalo de nuevo más tarde."
      );
    }
  }

<<<<<<< HEAD
  // Manejo de la edición de un gasto
  async function onEditExpenseSubmit(data: {
    id?: string; // `id` es opcional
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
        await reloadExpenses(); // Recargar la lista después de editar un gasto
        setExpenseToEdit(null); // Reiniciar el gasto a editar
        setShowComponent("list"); // Mostrar la lista
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error durante la edición:", error);
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
        onFormToggle={handleFormToggle} // Reinicia expenseToEdit al alternar el formulario
=======
  return (
    <div className="overflow-auto scrollbar-hide">
      <MenuExpenses
        onFormToggle={() =>
          setShowComponent(showComponent === "form" ? null : "form")
        }
>>>>>>> parent of 07d4789 (24-create-function-edit-expense)
        onListToggle={() =>
          setShowComponent(showComponent === "list" ? null : "list")
        }
      />
<<<<<<< HEAD

      {/* Mostrar el formulario para crear un gasto */}
      {showComponent === "form" && !expenseToEdit && (
        <FormExpenses
          onSubmit={onCreateExpenseSubmit}
          externalError={errorMessage as string}
          setIsForm={() => setShowComponent(null)} // Cierra el formulario
        />
      )}

      {/* Mostrar el formulario para editar un gasto existente */}
      {showComponent === "form" && expenseToEdit && (
        <FormExpenses
          onSubmit={onEditExpenseSubmit}
          externalError={errorMessage as string}
          expense={expenseToEdit} // Pasa el gasto a editar
          setIsForm={() => {
            setExpenseToEdit(null); // Reinicia el gasto a editar
            setShowComponent("list"); // Muestra la lista después de editar
          }}
        />
      )}

      {/* Mostrar la lista de gastos */}
      {showComponent === "list" && (
        <ListExpenses
          expenses={expenses}
          onEdit={(expense) => {
            setExpenseToEdit(expense); // Establece el gasto a editar
            setShowComponent("form"); // Cambia al formulario para editar
          }}
        />
      )}
=======
      {showComponent === "form" && (
        <FormExpenses
          onSubmit={onCreateExpenseSubmit}
          externalError={errorMessage as string}
          setIsForm={() => setShowComponent(null)}
        />
      )}

      {showComponent === "list" && <ListExpenses expenses={expenses} />}
>>>>>>> parent of 07d4789 (24-create-function-edit-expense)
    </div>
  );
}
