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

dotenv.config(); // should come first
const app = express();

const corsOptions = {
  origin: [(process.env.CLIENT_URL, "http://localhost:8000")] || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Config
connectDB();

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/income", incomeRouter);
app.use("/api/v1/expense", expenseRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/insight", insightRouter);

// Serve uploads folder
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
