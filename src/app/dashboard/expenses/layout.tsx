export default async function ExpensesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="bg-gradient-to-b from-gray-900 to-gray-800">
        <h1 className="text-center text-white pt-4 font-bold sm:text-2xl md:text-3xl">
          Expenses
        </h1>
        {children}
      </main>
    </div>
  );
}
