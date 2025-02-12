"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/auth/api/route";
import NavBarMobile from "./NavBarMobile";

const NavBar = () => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
                onClick={() => setIsDropdownOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}

          <li className="relative">
            <button
              className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Settings ▼
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                <Link
                  href="/dashboard/profile"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2 text-white hover:bg-gray-700 transition duration-300"
                >
                  Profile
                </Link>
                <button
                  className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500 hover:text-white transition duration-300 rounded-b-lg"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
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
