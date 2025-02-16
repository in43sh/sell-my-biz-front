const DeleteAccountModal = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText,
  confirmClass,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="mt-2 text-gray-600">{message}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`cursor-pointer rounded-md px-4 py-2 text-white ${confirmClass || 'bg-red-600 hover:bg-red-700'}`}
          >
            {confirmText || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
