export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 animate-fadeIn">
      <div className="relative flex justify-center items-center">
        <div className="absolute w-16 h-16 border-4 border-transparent border-t-emerald-400 border-r-emerald-500 rounded-full animate-spin-fast"></div>

        <div className="w-12 h-12 border-4 border-transparent border-t-emerald-300 border-r-emerald-400 rounded-full animate-spin-slow"></div>
      </div>

      <p className="text-gray-300 text-lg font-semibold mt-4 animate-pulse">
        Cargando...
      </p>
    </div>
  );
}
