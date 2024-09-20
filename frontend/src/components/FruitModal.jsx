import React, { useState, useEffect, useCallback } from "react";
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function FruitModal({
  showModal,
  setShowModal,
  fruit,
  onSubmit,
  isEditing,
  existingFruits,
}) {
  const [formData, setFormData] = useState({ fruit_name: "", quantity: "" });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (fruit) {
      setFormData({ fruit_name: fruit.fruit_name, quantity: fruit.quantity });
    }
    setErrorMessage(""); // Clear error message when modal opens
  }, [fruit, showModal]);

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (showModal) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showModal, handleClose]);

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the fruit already exists
    const fruitExists = existingFruits.some(
      (f) =>
        f.fruit_name.toLowerCase() === formData.fruit_name.toLowerCase() &&
        (!isEditing || f.fruit_id !== fruit.fruit_id)
    );

    if (fruitExists) {
      setErrorMessage("This fruit already exists in the database.");
    } else {
      setErrorMessage("");
      try {
        await onSubmit(isEditing ? { ...fruit, ...formData } : formData);
        handleClose();
      } catch (error) {
        setErrorMessage("Failed to save fruit. Please try again.");
      }
    }
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex overflow-y-auto fixed inset-0 justify-center items-center w-full h-full bg-black bg-opacity-40"
          onClick={handleOutsideClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="p-5 w-full max-w-md bg-white rounded-lg shadow-xl dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2
                id="modal-title"
                className="text-xl font-bold text-gray-800 dark:text-white"
              >
                {isEditing ? "Edit Fruit" : "Add New Fruit"}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close modal"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="fruit-name"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Fruit Name
              </label>
              <input
                autocomplete="off"
                id="fruit-name"
                type="text"
                value={formData.fruit_name}
                onChange={(e) =>
                  setFormData({ ...formData, fruit_name: e.target.value })
                }
                autoFocus
                className="p-2 mb-4 w-full text-gray-800 bg-white rounded border border-gray-300 transition-all duration-200 ease-in-out appearance-none outline-none focus:border-transparent focus:ring-blue-500 focus:ring-2 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
              <label
                htmlFor="quantity"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Quantity
              </label>
              <input
                autocomplete="off"
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                className="p-2 mb-4 w-full text-gray-800 bg-white rounded border border-gray-300 transition-all duration-200 ease-in-out appearance-none outline-none focus:border-transparent focus:ring-blue-500 focus:ring-2 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
              {errorMessage && (
                <div
                  className="p-2 mb-4 text-red-500 bg-red-100 rounded dark:bg-red-900 dark:text-red-200"
                  role="alert"
                >
                  {errorMessage}
                </div>
              )}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-emerald-500 rounded hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                >
                  {isEditing ? "Update Fruit" : "Add Fruit"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FruitModal;
