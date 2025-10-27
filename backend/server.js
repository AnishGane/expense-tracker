import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";

import authRouter from "./routes/auth.route.js";
import incomeRouter from "./routes/income.route.js";
import expenseRouter from "./routes/expense.route.js";
import dashboardRouter from "./routes/dashboard.route.js";
import insightRouter from "./routes/insight.route.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: [
    process.env.CLIENT_URL, // deployed frontend
    "http://localhost:5173", // local dev
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions)); // Must come before routes
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/income", incomeRouter);
app.use("/api/v1/expense", expenseRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/insight", insightRouter);

// Serve uploads folder
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.get("/", (req, res) => {
  res.send("Hello World from Expense Tracker backend!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
