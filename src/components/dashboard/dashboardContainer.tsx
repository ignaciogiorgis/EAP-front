import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaUsers,
  FaBox,
  FaUserTimes,
  FaChartLine,
  FaStore,
  FaDollarSign,
} from "react-icons/fa";
import { handleShowDataDashboard } from "@/app/dashboard/api/route";

export default async function Dashboard() {
  const dataDashboard = await handleShowDataDashboard();
  const {
    totalExpenses,
    totalSales,
    totalCountSales,
    totalDebt,
    bestSellingProduct,
    totalClients,
  } = dataDashboard?.data;

  console.log(dataDashboard?.data);
  const stats = [
    {
      title: "Ganancias Último Mes",
      value: `$ ${totalSales}`,
      icon: <FaMoneyBillWave className="text-green-400 text-5xl" />,
      className: "lg:col-span-2",
    },
    {
      title: "Total de Gastos",
      value: `$ ${totalExpenses}`,
      icon: <FaShoppingCart className="text-red-400 text-5xl" />,
    },
    {
      title: "Número de Ventas",
      value: ` ${totalCountSales}`,
      icon: <FaBox className="text-blue-400 text-5xl" />,
    },
    {
      title: "Deuda total",
      value: ` ${totalDebt}`,
      icon: <FaUserTimes className="text-purple-400 text-5xl" />,
    },
    {
      title: "Clientes Totales",
      value: `${totalClients}`,
      icon: <FaUsers className="text-yellow-400 text-5xl" />,
      className: "lg:row-span-2",
    },
    {
      title: "Ingresos Totales",
      value: "$320,000",
      icon: <FaDollarSign className="text-green-500 text-5xl" />,
      className: "lg:col-span-2",
    },
    {
      title: "Crecimiento Mensual",
      value: "+15%",
      icon: <FaChartLine className="text-cyan-400 text-5xl" />,
    },
    {
      title: "Sucursales Activas",
      value: "4",
      icon: <FaStore className="text-pink-400 text-5xl" />,
    },
    {
      title: "Producto Más Vendido",
      value: `${bestSellingProduct}`,
      icon: <FaBox className="text-orange-400 text-5xl" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-6 text-center tracking-wide">
        📊 Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl px-4 auto-rows-fr">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-xl flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 hover:shadow-2xl transform transition-all hover:scale-105 border border-gray-600 border-opacity-50 hover:ring-2 hover:ring-indigo-500 ${
              stat.className || ""
            }`}
          >
            <div className="mb-3 sm:mb-4">{stat.icon}</div>
            <h2 className="text-lg font-semibold text-gray-300">
              {stat.title}
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-white mt-2">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
