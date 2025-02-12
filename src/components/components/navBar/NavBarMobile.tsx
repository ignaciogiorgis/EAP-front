import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/auth/api/route";

const NavBarMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    const success = await logoutUser();
    if (success) {
      router.push("/auth/login");
    } else {
      alert("Error al cerrar sesión. Intenta de nuevo.");
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg rounded-lg px-4 py-3">
      <div className="container flex justify-between items-center mx-auto">
        {/* Botón de menú hamburguesa */}
        <button
          onClick={toggleMenu}
          className="text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-2 transition-transform transform hover:scale-105"
        >
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      <div
        className={`mt-4 space-y-3 ${
          isMenuOpen
            ? "block opacity-100 scale-100"
            : "hidden opacity-0 scale-95"
        } transition-all duration-300 md:hidden`}
      >
        <ul className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
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
                className="block py-2 px-4 text-gray-700 dark:text-gray-300 rounded-md hover:bg-indigo-500 hover:text-white transition-colors"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
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
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsDropdownOpen(false);
                  }}
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
      </div>
    </nav>
  );
};

export default NavBarMobile;
