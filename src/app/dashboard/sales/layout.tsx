import NavBar from "@/components/dashboard/components/navBar/NavBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales",
  description: "Generated by create next app",
};

export default function SalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>
        <h1 className="text-center text-gray-800 text-4xl font-bold mt-7">
          Sales
        </h1>
        {children}
      </main>
    </div>
  );
}