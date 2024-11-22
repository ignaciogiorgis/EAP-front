type PaginationProps = {
  currentPage: number; // Página actual
  totalPages: number; // Total de páginas
  onPageChange: (page: number) => void; // Función para cambiar de página
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-2 mt-4 mb-4 rounded-md bg-slate-50 mx-5  py-3">
      <button
        className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-800 rounded disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Anterior
      </button>

      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-800 disabled:opacity-50 "
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Siguiente
      </button>
      <span className="text-black items-center">
        Página {currentPage} de {totalPages}
      </span>
    </div>
  );
}
