"use client";

import { useState } from "react";
import { handleCreateExpense } from "@/app/dashboard/api/route";
import FormExpenses from "@/components/dashboard/expenses/formExpenses";
import MenuExpenses from "@/components/dashboard/expenses/menuExpenses";

export default function CreateExpensePage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isForm, setIsForm] = useState(false);

  async function onCreateExpenseSubmit(data: {
    name: string;
    value: string;
    description: string;
    date: string;
  }) {
    try {
      const response = await handleCreateExpense(data);

      if (response.success) {
        setIsForm(false);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error durante el registro:", error);
      setErrorMessage(
        "Ocurrió un error inesperado. Inténtalo de nuevo más tarde."
      );
    }
  }

  return (
    <div className="overflow-auto scrollbar-hide">
      <MenuExpenses setIsForm={setIsForm} />
      {isForm && (
        <FormExpenses
          onSubmit={onCreateExpenseSubmit}
          externalError={errorMessage as string}
          setIsForm={setIsForm}
        />
      )}
    </div>
  );
}
