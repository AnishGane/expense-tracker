import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

const app = express();

dotenv.config();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
