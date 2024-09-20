import React, { useState, useEffect } from "react";
import { FiRefreshCw, FiPlus, FiMoon, FiSun } from "react-icons/fi";
import FruitTable from "../components/FruitTable";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import AddFruitModal from "../components/AddFruitModal";
import {
  fetchFruits,
  createFruit,
  deleteFruit,
} from "../services/fruitService";
import { useTheme } from "../contexts/ThemeContext";

function Dashboard() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFruit, setNewFruit] = useState({ fruit_name: "", quantity: "" });

  useEffect(() => {
    handleFetchFruits();
  }, []);

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

  const handleDeleteFruit = async (id) => {
    try {
      await deleteFruit(id);
      await handleFetchFruits();
    } catch (error) {
      console.error("Error deleting fruit:", error);
      setError("Failed to delete fruit. Please try again later.");
    }
  };

  const handleEditFruit = async (id) => {
    console.log("Editing fruit with id:", id);
    // Implement edit logic here
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-screen-xl px-4 py-8 mx-auto">
      <DashboardHeader
        setShowAddModal={setShowAddModal}
        handleFetchFruits={handleFetchFruits}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <AddFruitModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        newFruit={newFruit}
        setNewFruit={setNewFruit}
        handleAddFruit={handleAddFruit}
      />
      {fruits.length > 0 ? (
        <FruitTable
          fruits={fruits}
          handleDeleteFruit={handleDeleteFruit}
          handleEditFruit={handleEditFruit}
        />
      ) : (
        <p className="mt-4 text-center text-gray-500">No fruits available.</p>
      )}
    </div>
  );
}

function DashboardHeader({
  setShowAddModal,
  handleFetchFruits,
  isDarkMode,
  toggleTheme,
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Fruit Dashboard
      </h1>
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
        <button
          onClick={toggleTheme}
          className="flex items-center px-4 py-2 font-semibold text-yellow-500 rounded dark:text-gray-400"
        >
          {isDarkMode ? (
            <FiMoon className="mr-2" />
          ) : (
            <FiSun className="mr-2" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
