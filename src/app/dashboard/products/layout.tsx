export default async function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>
        <h1 className="text-center text-gray-800 text-4xl font-bold mt-7">
          Products
        </h1>
        {children}
      </main>
    </div>
  );
}
