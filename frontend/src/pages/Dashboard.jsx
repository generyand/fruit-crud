import React, { useState, useEffect } from "react";
import { FiRefreshCw, FiPlus } from "react-icons/fi";
import FruitTable from "../components/FruitTable";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { fetchFruits, createFruit, updateFruit, deleteFruit } from "../services/fruitService";

function Dashboard() {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFruit, setNewFruit] = useState({ fruit_name: "", quantity: "" });

  const handleFetchFruits = async () => {
    setLoading(true);
    try {
      const data = await fetchFruits();
      setFruits(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching fruits:", error);
      setError("Failed to fetch fruits. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddFruit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createFruit(newFruit);
      setShowAddModal(false);
      setNewFruit({ fruit_name: "", quantity: "" });
      await handleFetchFruits();
    } catch (error) {
      console.error("Error adding fruit:", error);
      setError("Failed to add fruit. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchFruits();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Fruit Dashboard</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-600"
          >
            <FiPlus className="mr-2" /> Add Fruit
          </button>
          <button
            onClick={handleFetchFruits}
            className="flex items-center px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            <FiRefreshCw className="mr-2" /> Refresh
          </button>
        </div>
      </div>
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center w-full h-full overflow-y-auto bg-gray-600 bg-opacity-50">
          <div className="p-5 bg-white rounded-lg shadow-xl">
            <h2 className="mb-4 text-xl font-bold">Add New Fruit</h2>
            <form onSubmit={handleAddFruit}>
              <input
                type="text"
                placeholder="Fruit Name"
                value={newFruit.fruit_name}
                onChange={(e) => setNewFruit({ ...newFruit, fruit_name: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                value={newFruit.quantity}
                onChange={(e) => setNewFruit({ ...newFruit, quantity: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                >
                  Add Fruit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {fruits.length > 0 ? (
        <FruitTable fruits={fruits} />
      ) : (
        <p className="mt-4 text-center text-gray-500">No fruits available.</p>
      )}
    </div>
  );
}

export default Dashboard;
