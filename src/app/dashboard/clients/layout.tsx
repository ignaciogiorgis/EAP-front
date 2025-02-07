import { FaUsers } from "react-icons/fa";

export default async function ClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="flex justify-center items-center gap-8">
          <h1 className="text-center text-white pt-4 font-bold sm:text-2xl md:text-3xl">
            Clients
          </h1>

          <div>
            <FaUsers className="text-yellow-400 text-5xl" />
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
