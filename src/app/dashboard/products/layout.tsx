import { FaBox } from "react-icons/fa";

export default async function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="flex justify-center items-center gap-8">
          <h1 className="text-center text-white pt-4 font-bold sm:text-2xl md:text-3xl">
            Products
          </h1>
          <div>
            <FaBox className="text-orange-400 text-5xl" />
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
