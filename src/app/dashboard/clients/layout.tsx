export default async function ClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>
        <h1 className="text-center text-gray-700 font-bold mt-7 sm:text-2xl md:text-3xl">
          Clients
        </h1>
        {children}
      </main>
    </div>
  );
}
