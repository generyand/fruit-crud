import axios from "axios";

export const fetchFruits = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/fruits/get-fruits");
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
    const response = await axios.post("http://localhost:3000/api/fruits/create-fruit", fruit);
    return response.data;
  } catch (error) {
    console.error("Error creating fruit:", error);
    throw error;
  }
};