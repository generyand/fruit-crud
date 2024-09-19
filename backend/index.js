import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import cors from "cors";
import { fruitsRouter } from "./routes/fruits.route.js";
import Fruit from "./models/fruit.model.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Update the CORS configuration
app.use(cors("*"));

app.use(express.json());
app.use("/api/fruits", fruitsRouter);

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);

  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Sync the model with the database
    await Fruit.sync();
    console.log("Fruits table has been synchronized");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
