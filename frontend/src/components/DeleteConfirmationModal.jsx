import React, { useEffect } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence from framer-motion

function DeleteConfirmationModal({
  showModal,
  setShowModal,
  onConfirm,
  fruitName,
}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShowModal]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          key="overlay" // Add a unique key
          initial={{ opacity: 0 }} // Initial state for overlay
          animate={{ opacity: 1 }} // Animate to
          exit={{ opacity: 0 }} // Exit state
          //   transition={{ duration: 0.3 }} // Animation duration
          className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50"
          onClick={handleOverlayClick} // Handle click outside modal
        >
          <motion.div
            key="modal" // Add a unique key
            initial={{ opacity: 0, scale: 0.8 }} // Initial state for modal
            animate={{ opacity: 1, scale: 1 }} // Animate to
            exit={{ opacity: 0, scale: 0.8 }} // Exit state
            // transition={{ duration: 0.3 }} // Animation duration
            className="p-6 w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-800"
          >
            <div className="flex items-center mb-4">
              <FiAlertTriangle className="mr-2 text-red-500" size={24} />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Confirm Deletion
              </h2>
            </div>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Are you sure you want to delete the fruit "{fruitName}"? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DeleteConfirmationModal;
