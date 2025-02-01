const DeleteModalExpense = ({ onClose, onDelete }: any) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80">
      <div className="bg-white rounded-lg text-black p-10 w-[700px]">
        <p className="mb-4">
          Are you sure you want to delete the expense <strong></strong>?
        </p>
        <div className="flex justify-center gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModalExpense;
