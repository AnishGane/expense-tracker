import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    icon: { type: String },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be positive"],
    },
    category: { type: String, required: true }, //E.g: Food, Entertainment, etc.
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const expenseModel =
  mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);
export default expenseModel;
