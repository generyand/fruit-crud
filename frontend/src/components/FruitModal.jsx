import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function FruitModal({ showModal, setShowModal, fruit, onSubmit, isEditing }) {
  const [formData, setFormData] = useState({ fruit_name: "", quantity: "" });

  useEffect(() => {
    if (fruit) {
      setFormData({ fruit_name: fruit.fruit_name, quantity: fruit.quantity });
    }
  }, [fruit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(isEditing ? { ...fruit, ...formData } : formData);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
            delay: 0,
            duration: 0.1,
          }}
          className="fixed inset-0 flex items-center justify-center w-full h-full overflow-y-auto bg-black bg-opacity-40"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
              delay: 0,
              duration: 0.1,
            }}
            className="p-5 bg-white rounded-lg shadow-xl dark:bg-gray-800"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {isEditing ? "Edit Fruit" : "Add New Fruit"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Fruit Name"
                value={formData.fruit_name}
                onChange={(e) =>
                  setFormData({ ...formData, fruit_name: e.target.value })
                }
                className="w-full p-2 mb-4 text-gray-800 bg-white border border-gray-300 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                className="w-full p-2 mb-4 text-gray-800 bg-white border border-gray-300 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
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
