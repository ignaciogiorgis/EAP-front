import NavBar from "@/components/dashboard/components/navBar/NavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-auto scrollbar-hide">
      <main>
        <NavBar />
        {children}
      </main>
    </div>
  );
}
