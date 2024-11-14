import NavBar from "@/components/dashboard/navBar/NavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>
        <h1 className="text-center text-indigo-700 text-4xl font-bold mt-7">
          Expenses
        </h1>
        {children}
      </main>
    </div>
  );
}
