import { DeleteModal } from "@/components/index";

const DeleteModalClient = ({ onClose, onDelete }: DeleteModal) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity">
      <div className="bg-gray-900 text-white rounded-lg shadow-xl p-8 w-[500px] transform transition-transform scale-100 hover:scale-[1.02]">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-2">⚠️</div>
          <h2 className="text-xl font-semibold">Delete Client</h2>
          <p className="text-gray-300 mt-2">
            Are you sure you want to delete this client? This action cannot be
            undone.
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-800 transition duration-300"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModalClient;
