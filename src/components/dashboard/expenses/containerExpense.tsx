"use client";

import { useState } from "react";
import { handleCreateExpense } from "@/app/dashboard/api/route";
import FormExpenses from "./view/formExpenses";
import MenuExpenses from "./view/menuExpenses";
import ListExpenses from "./view/listExpenses";

type ExpensesPageProps = {
  expenses: any[];
};

export default function ContainerExpense({ expenses }: ExpensesPageProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showComponent, setShowComponent] = useState<"form" | "list" | null>(
    null
  );
  async function onCreateExpenseSubmit(data: {
    name: string;
    value: string;
    description: string;
    date: string;
  }) {
    try {
      const response = await handleCreateExpense(data);

      if (response.success) {
        setShowComponent(null);
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
      <MenuExpenses
        onFormToggle={() =>
          setShowComponent(showComponent === "form" ? null : "form")
        }
        onListToggle={() =>
          setShowComponent(showComponent === "list" ? null : "list")
        }
      />
      {showComponent === "form" && (
        <FormExpenses
          onSubmit={onCreateExpenseSubmit}
          externalError={errorMessage as string}
          setIsForm={() => setShowComponent(null)}
        />
      )}

      {showComponent === "list" && <ListExpenses expenses={expenses} />}
    </div>
  );
}
