import axios from "axios";

export const fetchFruits = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/fruits/get-fruits"
    );
    if (response.data.success && Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      console.error("Received unexpected data structure:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching fruits:", error);
    throw error;
  }
};

export const createFruit = async (fruit) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/fruits/create-fruit",
      fruit
    );
    if (response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("Failed to create fruit");
    }
  } catch (error) {
    console.error("Error creating fruit:", error);
    throw error;
  }
};

export const updateFruit = async (fruit) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/fruits/update-fruit/${fruit.fruit_id}`,
      fruit
    );
    if (response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("Failed to update fruit");
    }
  } catch (error) {
    console.error("Error updating fruit:", error);
    throw error;
  }
};

export const deleteFruit = async (fruitId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/fruits/delete-fruit/${fruitId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting fruit:", error);
    throw error;
  }
};
