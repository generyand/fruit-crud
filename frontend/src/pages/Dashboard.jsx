import React, { useState, useEffect, useCallback } from "react";
import {
  FiRefreshCw,
  FiPlus,
  FiMoon,
  FiSun,
  FiCheck,
  FiAlertTriangle,
  FiSearch,
} from "react-icons/fi";
import { toast } from "sonner";
import FruitTable from "../components/FruitTable";
import LoadingSpinner from "../components/LoadingSpinner";
import FruitModal from "../components/FruitModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [filteredFruits, setFilteredFruits] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fruitToDelete, setFruitToDelete] = useState(null);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const handleFetchFruits = useCallback(async (search = "") => {
    setLoading(true);
    try {
      const data = await fetchFruits(search);
      setFruits(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching fruits:", error);
      setError("Failed to fetch fruits. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleFetchFruits();
  }, [handleFetchFruits]);

  useEffect(() => {
    const filtered = fruits.filter((fruit) =>
      fruit.fruit_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFruits(filtered);
  }, [fruits, searchTerm]);

  const getToastStyle = (type) => {
    const baseStyle = {
      color: isDarkMode ? "#f2f2f2" : "#1c1c1c",
      // border: `1px solid ${isDarkMode ? "#4B5563" : "#E5E7EB"}`,
    };

    switch (type) {
      case "add":
        return {
          ...baseStyle,
          background: isDarkMode ? "#10b981" : "#D1FAE5",
          color: isDarkMode ? "#ffffff" : "#065F46",
        };
      case "update":
        return {
          ...baseStyle,
          background: isDarkMode ? "#3b82f6" : "#DBEAFE",
          color: isDarkMode ? "#ffffff" : "#1E40AF",
        };
      case "delete":
        return {
          ...baseStyle,
          background: isDarkMode ? "#ef4444" : "#FEE2E2",
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
        setFruits((prevFruits) => [...prevFruits, newFruit]); // Changed this line
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

  const handleDeleteFruit = async () => {
    try {
      await deleteFruit(fruitToDelete.fruit_id);
      setFruits(fruits.filter((f) => f.fruit_id !== fruitToDelete.fruit_id));
      toast.success(`Fruit "${fruitToDelete.fruit_name}" deleted successfully`, {
        icon: <FiCheck />,
        style: getToastStyle("delete"),
      });
      setShowDeleteModal(false);
      setFruitToDelete(null);
    } catch (error) {
      console.error("Error deleting fruit:", error);
      setError("Failed to delete fruit. Please try again later.");
      toast.error(`Failed to delete fruit: ${error.message}`, {
        icon: <FiAlertTriangle />,
        style: getToastStyle("error"),
      });
    }
  };

  const confirmDeleteFruit = (fruit) => {
    setFruitToDelete(fruit);
    setShowDeleteModal(true);
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    handleFetchFruits(searchTerm);
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
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        handleSearchSubmit={handleSearchSubmit}
      />
      <FruitModal
        showModal={showModal}
        setShowModal={handleCloseModal}
        fruit={editingFruit || { fruit_name: "", quantity: "" }}
        onSubmit={handleFruitAction}
        isEditing={!!editingFruit}
        existingFruits={fruits} // Pass the existing fruits to the modal
      />
      <FruitTable
        fruits={fruits}
        handleDeleteFruit={confirmDeleteFruit}
        handleEditFruit={handleEditFruit}
      />
      <DeleteConfirmationModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        onConfirm={handleDeleteFruit}
        fruitName={fruitToDelete ? fruitToDelete.fruit_name : ""}
      />
    </div>
  );
}

function DashboardHeader({
  onAddFruit,
  handleFetchFruits,
  isDarkMode,
  toggleTheme,
  searchTerm,
  handleSearch,
  handleSearchSubmit,
}) {
  return (
    <div className="flex flex-col justify-between items-center mb-6 space-y-4 sm:flex-row sm:space-y-0">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Proots 🍒
      </h1>
      <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        <button
          onClick={onAddFruit}
          className="flex items-center px-4 py-2 font-semibold text-white bg-emerald-500 rounded hover:bg-emerald-600"
        >
          <FiPlus className="mr-2" /> Add Fruit
        </button>
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            placeholder="Search fruits..."
            value={searchTerm}
            onChange={handleSearch}
            className="py-2 pr-4 pl-10 rounded-md border transition-all duration-200 ease-in-out outline-none focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <FiSearch className="absolute left-3 top-1/2 text-gray-400 transform -translate-y-1/2" />
        </form>
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
