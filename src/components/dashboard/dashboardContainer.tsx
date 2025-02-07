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
  // Datos simulados
  const stats = [
    {
      title: "Ganancias Último Mes",
      value: "$45,320",
      icon: <FaMoneyBillWave className="text-green-400 text-5xl" />,
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
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-center tracking-wide">
        📊 Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-8 w-full max-w-full px-4 relative">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-xl flex flex-col items-center justify-center p-10 hover:shadow-2xl transform transition-all hover:scale-105 border border-gray-600 border-opacity-50 hover:ring-2 hover:ring-indigo-500 animate-fadeIn w-full ${
              index === 4 ? "invisible" : ""
            }`}
          >
            <div className="mb-4">{stat.icon}</div>
            <h2 className="text-lg font-semibold text-gray-300">
              {stat.title}
            </h2>
            <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
          </div>
        ))}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-2xl text-2xl font-bold uppercase tracking-wide text-white transition-transform duration-500 hover:rotate-180 hover:scale-110 border-4 border-indigo-300 border-opacity-50">
          EAP
        </div>
      </div>
    </div>
  );
}
