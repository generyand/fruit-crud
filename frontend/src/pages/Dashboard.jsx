import React, { useState, useEffect } from "react";
import {
  FiRefreshCw,
  FiPlus,
  FiMoon,
  FiSun,
  FiCheck,
  FiAlertTriangle,
} from "react-icons/fi";
import { toast } from "sonner";
import FruitTable from "../components/FruitTable";
import LoadingSpinner from "../components/LoadingSpinner";
import FruitModal from "../components/FruitModal";
import {
  fetchFruits,
  createFruit,
  deleteFruit,
  updateFruit,
} from "../services/fruitService";
import { useTheme } from "../contexts/ThemeContext";

function Dashboard() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingFruit, setEditingFruit] = useState(null);

  useEffect(() => {
    handleFetchFruits();
  }, []);

  const getToastStyle = (type) => {
    const baseStyle = {
      color: isDarkMode ? "#ffffff" : "#000000",
      border: `1px solid ${isDarkMode ? "#4B5563" : "#E5E7EB"}`,
    };

    switch (type) {
      case "add":
        return {
          ...baseStyle,
          background: isDarkMode ? "#065F46" : "#D1FAE5",
          color: isDarkMode ? "#ffffff" : "#065F46",
        };
      case "update":
        return {
          ...baseStyle,
          background: isDarkMode ? "#1E40AF" : "#DBEAFE",
          color: isDarkMode ? "#ffffff" : "#1E40AF",
        };
      case "delete":
        return {
          ...baseStyle,
          background: isDarkMode ? "#991B1B" : "#FEE2E2",
          color: isDarkMode ? "#ffffff" : "#991B1B",
        };
      case "error":
        return {
          ...baseStyle,
          background: isDarkMode ? "#7F1D1D" : "#FEE2E2",
          color: isDarkMode ? "#ffffff" : "#991B1B",
        };
      default:
        return baseStyle;
    }
  };

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

  const handleFruitAction = async (fruitData) => {
    setLoading(true);
    try {
      let newFruit;
      if (editingFruit) {
        newFruit = await updateFruit(fruitData);
        setFruits(
          fruits.map((f) => (f.fruit_id === newFruit.fruit_id ? newFruit : f))
        );
        toast.success(`Fruit "${newFruit.fruit_name}" updated successfully`, {
          icon: <FiCheck />,
          style: getToastStyle("update"),
        });
      } else {
        newFruit = await createFruit(fruitData);
        setFruits((prevFruits) => [newFruit, ...prevFruits]);
        toast.success(`New fruit "${newFruit.fruit_name}" added successfully`, {
          icon: <FiCheck />,
          style: getToastStyle("add"),
        });
      }
      handleCloseModal();
    } catch (error) {
      console.error(
        `Error ${editingFruit ? "updating" : "adding"} fruit:`,
        error
      );
      setError(
        `Failed to ${
          editingFruit ? "update" : "add"
        } fruit. Please try again later.`
      );
      toast.error(
        `Failed to ${editingFruit ? "update" : "add"} fruit: ${error.message}`,
        {
          icon: <FiAlertTriangle />,
          style: getToastStyle("error"),
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFruit = async (id) => {
    try {
      await deleteFruit(id);
      const deletedFruit = fruits.find((f) => f.fruit_id === id);
      setFruits(fruits.filter((f) => f.fruit_id !== id));
      toast.success(`Fruit "${deletedFruit.fruit_name}" deleted successfully`, {
        icon: <FiCheck />,
        style: getToastStyle("delete"),
      });
    } catch (error) {
      console.error("Error deleting fruit:", error);
      setError("Failed to delete fruit. Please try again later.");
      toast.error(`Failed to delete fruit: ${error.message}`, {
        icon: <FiAlertTriangle />,
        style: getToastStyle("error"),
      });
    }
  };

  const handleEditFruit = (fruit) => {
    setEditingFruit(fruit);
    setShowModal(true);
  };

  const handleAddFruit = () => {
    setEditingFruit(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingFruit(null);
  };

  if (loading) return <LoadingSpinner />;
  // if (error) return <ErrorMessage message={error} />;

  return (
    <div className="px-4 py-8 mx-auto max-w-screen-xl">
      <DashboardHeader
        onAddFruit={handleAddFruit}
        handleFetchFruits={handleFetchFruits}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <FruitModal
        showModal={showModal}
        setShowModal={handleCloseModal}
        fruit={editingFruit || { fruit_name: "", quantity: "" }}
        onSubmit={handleFruitAction}
        isEditing={!!editingFruit}
        existingFruits={fruits} // Pass the existing fruits to the modal
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
  onAddFruit,
  handleFetchFruits,
  isDarkMode,
  toggleTheme,
}) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Fruit Dashboard
      </h1>
      <div className="flex space-x-2">
        <button
          onClick={onAddFruit}
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
