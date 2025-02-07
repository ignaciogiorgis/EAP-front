"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/auth/api/route";
import NavBarMobile from "./NavBarMobile";

const NavBar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const success = await logoutUser();
    if (success) {
      router.push("/auth/login");
    } else {
      alert("Error al cerrar sesión. Intenta de nuevo.");
    }
  };

  return (
    <nav className="bg-gray-900 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold tracking-wide">
          Expenses <span className="font-medium text-indigo-400">and</span>{" "}
          Profits
        </h1>

        <ul className="hidden md:flex space-x-8 text-lg items-center">
          {[
            { href: "/dashboard", label: "Dashboard" },
            { href: "/dashboard/expenses", label: "Expenses" },
            { href: "/dashboard/sales", label: "Sales" },
            { href: "/dashboard/clients", label: "Clients" },
            { href: "/dashboard/products", label: "Products" },
          ].map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="hover:text-indigo-400 hover:underline transition duration-300"
              >
                {item.label}
              </Link>
            </li>
          ))}

          <li>
            <button
              className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg transition duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>

        <div className="md:hidden">
          <NavBarMobile />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
