import express from "express";
import cors from "cors";
import axios from "axios";
import { movieRoutes } from "./router/movieRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api/movies", movieRoutes);

// Example route to fetch movies
const API_KEY = "b6e0d783";
const BASE_URL = "http://www.omdbapi.com";

app.get("/movies", async (req, res) => {
  const { search } = req.query; // Expecting a query like ?search=movieName
  try {
    const { data } = await axios.get(`${BASE_URL}`, {
      params: {
        apikey: API_KEY,
        s: search || "default", // Default search if none is provided
      },
    });
    res.json(data);
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    res.status(500).json({ message: "Unable to fetch movies." });
  }
});

// Error handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export { app };
