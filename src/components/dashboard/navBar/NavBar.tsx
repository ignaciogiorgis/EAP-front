"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/api/route";

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
    <div>
      <div className="flex bg-gray-800 text-white top-0 py-3 px-5 flex-wrap justify-between bg-silver">
        <h1 className="text-xl font-bold">
          Expenses <span className="font-medium">and </span> Profits
        </h1>
        <ul className="flex gap-[40px] text-m">
          <li className=" hover:text-indigo-500 cursor-pointer">
            <Link href="#">Home</Link>
          </li>
          <li className=" hover:text-indigo-500 cursor-pointer">
            <Link href="#">Expenses</Link>
          </li>
          <li className=" hover:text-indigo-500 cursor-pointer">
            <Link href="#">Profits</Link>
          </li>
          <li className=" hover:text-indigo-500 cursor-pointer">
            <button onClick={handleLogout}>logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
