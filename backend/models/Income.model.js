import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be positive"],
    },
    icon: { type: String },
    source: { type: String, required: true }, //E.g: Salary, Freelancing, etc.
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const incomeModel =
  mongoose.models.Income || mongoose.model("Income", IncomeSchema);
export default incomeModel;
