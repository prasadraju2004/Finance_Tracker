import mongoose from 'mongoose';

// Enum for categories
const categories = ['food', 'groceries', 'clothing', 'transport', 'health', 'repeated', 'others'];

// Schema for Expense Log
const expenseSchema = new mongoose.Schema(
  {
    log_id: {
      type: String,
      required: true,
      unique: true, // Ensuring that the log_id is unique
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming a User model is in place
      required: false,
    },
    user_name: {
      type: String,
      required: false,  // Optional: consider removing if you only want to store user_name in the User model
    },
    category: {
      type: String,
      enum: categories, // Restricting category to predefined values
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Avoid overwriting the model if it already exists
const Expense = mongoose.models.Expense || mongoose.model('Expense', expenseSchema, "expenses");

export default Expense;
