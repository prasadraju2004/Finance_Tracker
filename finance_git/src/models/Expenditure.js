import mongoose from "mongoose";

const ExpenditureSchema = new mongoose.Schema(
  {
    user_id: {
      type: String, // Automatically generates a unique identifier
      required: true,
      ref: 'User', // Reference to the User model (assuming you want to link to the User model)
    },
    user_name: {
      type: String,
      required: true,
      trim: true,
    },
    efood: {
      type: Number, // Expenditure on food
      required: true,
    },
    egroceriesclothing: {
      type: Number, // Expenditure on groceries and clothing
      required: true,
    },
    etransport: {
      type: Number, // Expenditure on transport
      required: true,
    },
    ehealth: {
      type: Number, // Expenditure on health
      required: true,
    },
    erepeated: {
      type: Number, // Expenditure on repeated expenses
      required: true,
    },
    eothers: {
      type: Number, // Expenditure on other categories
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
      immutable: true, // Prevents updates after initial creation
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, // Automatic timestamp management
  }
);

// Check for existing model to prevent overwriting during hot reload
export default mongoose.models.Expenditure || mongoose.model("Expenditure", ExpenditureSchema, "expenditures");
