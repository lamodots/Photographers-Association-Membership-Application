interface ConfirmationModalProps {
  onCancel?: () => void;
  onConfirm?: () => void;
}

function ConfirmationModal({ onCancel, onConfirm }: ConfirmationModalProps) {
  return (
    <div className="fixed inset-0 z-50 px-4 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xs p-6">
        <h3 className="text-center">Do you want to continue?</h3>
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
