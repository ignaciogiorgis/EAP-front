import NavBar from "@/components/dashboard/navBar/NavBar";

export default function ProfitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>
        <h1 className="text-center text-gray-800 text-4xl font-bold mt-7">
          Profits
        </h1>
        {children}
      </main>
    </div>
  );
}
