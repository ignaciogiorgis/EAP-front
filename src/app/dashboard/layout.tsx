import NavBar from "@/components/dashboard/navBar/NavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>
        <NavBar />
        {children}
      </main>
    </div>
  );
}
