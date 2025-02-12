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

export default function Dashboard() {
  const stats = [
    {
      title: "Ganancias Último Mes",
      value: "$45,320",
      icon: <FaMoneyBillWave className="text-green-400 text-5xl" />,
      className: "lg:col-span-2",
    },
    {
      title: "Total de Gastos",
      value: "$12,580",
      icon: <FaShoppingCart className="text-red-400 text-5xl" />,
    },
    {
      title: "Número de Ventas",
      value: "384",
      icon: <FaBox className="text-blue-400 text-5xl" />,
    },
    {
      title: "Clientes Totales",
      value: "1,250",
      icon: <FaUsers className="text-yellow-400 text-5xl" />,
      className: "lg:row-span-2",
    },
    {
      title: "Clientes con Deuda",
      value: "34",
      icon: <FaUserTimes className="text-purple-400 text-5xl" />,
    },
    {
      title: "Producto Más Vendido",
      value: "Laptop Gaming",
      icon: <FaBox className="text-orange-400 text-5xl" />,
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
      title: "Ingresos Totales",
      value: "$320,000",
      icon: <FaDollarSign className="text-green-500 text-5xl" />,
      className: "lg:col-span-2",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-6 text-center tracking-wide">
        📊 Dashboard
      </h1>

      {/* Grid adaptable */}
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
