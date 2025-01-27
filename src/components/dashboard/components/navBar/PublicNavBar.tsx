import Link from "next/link";
import React from "react";

const PublicNavBar = () => {
  return (
    <div className="relative text-white py-3 px-5 flex flex-wrap justify-between">
      <h1 className="text-4xl font-bold">
        Expenses <span className="font-medium">and</span> Profits
      </h1>
      <ul className="flex gap-[40px] text-m items-center">
        <li className="hover:text-indigo-500 cursor-pointer">
          <Link href="/auth/login">Sign In</Link>
        </li>
        <li className="hover:text-indigo-500 cursor-pointer">
          <Link href="/auth/register">Create an account</Link>
        </li>
      </ul>
    </div>
  );
};

export default PublicNavBar;
