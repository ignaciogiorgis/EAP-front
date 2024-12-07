import { ReactNode } from "react";
import { handleShowExpenses } from "./api/route";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>
        <h1 className="text-center text-gray-800 text-4xl font-bold mt-7">
          Expenses
        </h1>
        {children}
      </main>
    </div>
  );
}
