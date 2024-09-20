import FruitModel from "../models/fruit.model.js";

export const getFruits = async (req, res) => {
  try {
    const fruits = await FruitModel.findAll();
    res.status(200).json({ success: true, data: fruits });
  } catch (error) {
    console.error("Error fetching fruits:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const createFruit = async (req, res) => {
  try {
    const { fruit_name, quantity } = req.body;

    // Check if the fruit already exists
    const existingFruit = await FruitModel.findOne({ where: { fruit_name } });
    if (existingFruit) {
      return res
        .status(409)
        .json({ success: false, message: "Fruit already exists" });
    }

    const fruit = await FruitModel.create({ fruit_name, quantity });
    res.status(201).json({ success: true, data: fruit });
  } catch (error) {
    console.error("Error creating fruit:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteFruit = async (req, res) => {
  try {
    const { id } = req.params;
    await FruitModel.destroy({ where: { fruit_id: id } });
    res
      .status(200)
      .json({ success: true, message: "Fruit deleted successfully" });
  } catch (error) {
    console.error("Error deleting fruit:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateFruit = async (req, res) => {
  try {
    const { id } = req.params;
    const { fruit_name, quantity } = req.body;
    await FruitModel.update(
      { fruit_name, quantity },
      { where: { fruit_id: id } }
    );

    res
      .status(200)
      .json({ success: true, message: "Fruit updated successfully" });
  } catch (error) {
    console.error("Error updating fruit:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
