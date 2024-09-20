import React from 'react';
import { FiX } from 'react-icons/fi';

function AddFruitModal({ showModal, setShowModal, newFruit, setNewFruit, handleAddFruit }) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full h-full overflow-y-auto bg-black bg-opacity-40">
      <div className="p-5 bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Add New Fruit</h2>
          <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <FiX size={24} />
          </button>
        </div>
        <form onSubmit={handleAddFruit}>
          <input
            type="text"
            placeholder="Fruit Name"
            value={newFruit.fruit_name}
            onChange={(e) => setNewFruit({ ...newFruit, fruit_name: e.target.value })}
            className="w-full p-2 mb-4 text-gray-800 bg-white border border-gray-300 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newFruit.quantity}
            onChange={(e) => setNewFruit({ ...newFruit, quantity: e.target.value })}
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
              Add Fruit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFruitModal;