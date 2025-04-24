import { useEffect, useRef } from 'react';

const DeleteAccountModal = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText,
  confirmClass,
}) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
      // Disable background scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      // Re-enable scroll on unmount
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-white p-6 shadow-lg"
      onCancel={onCancel}
    >
      <form method="dialog">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="mt-2 text-gray-600">{message}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => {
              dialogRef.current?.close();
              onCancel();
            }}
            className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              dialogRef.current?.close();
              onConfirm();
            }}
            className={`rounded-md px-4 py-2 text-white ${confirmClass || 'bg-red-600 hover:bg-red-700'}`}
          >
            {confirmText || 'Confirm'}
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default DeleteAccountModal;
