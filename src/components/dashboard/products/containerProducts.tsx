"use client";
import MenuProducts from "./view/menuProducts";
import ListProducts from "./view/listProducts";
import { useState } from "react";
import FormProducts from "./view/formProducts";

const containerPorducts = () => {
  const [showComponent, setShowComponent] = useState<"form" | "list" | null>(
    null
  );
  const handleFormToggle = () => {
    setExpenseToEdit(null); // Reset expenseToEdit when switching to create
    setShowComponent(showComponent === "form" ? null : "form");
  };
  const [expenseToEdit, setExpenseToEdit] = useState<any | null>(null);
  return (
    <div className="overflow-auto scrollbar-hide">
      <MenuProducts
        onFormToggle={handleFormToggle}
        onListToggle={() =>
          setShowComponent(showComponent === "list" ? null : "list")
        }
      />
      {showComponent === "list" && <ListProducts />}

      {showComponent === "form" && !expenseToEdit && <FormProducts />}
    </div>
  );
};

export default containerPorducts;
