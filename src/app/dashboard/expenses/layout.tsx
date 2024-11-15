import { ReactNode } from "react";
import { handleShowExpenses } from "../api/route";
import React from "react";

type DashboardLayoutProps = {
  children: ReactNode;
  expenses: any[]; // Ajusta el tipo según la estructura de tus datos
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await handleShowExpenses();

  const expenses = response.success ? response.data : [];
  const errorMessage = !response.success ? response.message : null;

  return (
    <div>
      <main>
        <h1 className="text-center text-indigo-700 text-4xl font-bold mt-7">
          Expenses
        </h1>
        {React.cloneElement(children as React.ReactElement, { expenses })}
      </main>
    </div>
  );
}
