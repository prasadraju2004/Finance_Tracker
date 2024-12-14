import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId, // Automatically generates a unique identifier
      default: () => new mongoose.Types.ObjectId(),
      required: true,
      unique: true,
    }, // Primary Key
    user_name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
      trim: true,
      lowercase: true, // Ensure consistency for email addresses
    },
    password: {
      type: String,
      required: true,
    },
    profile_picture: {
      type: String, // URL to the profile picture (optional)
      default: null,
    },
    income: {
      type: Number, // User's income
      required: true,
    },
    
    longtermgoal: {
      type: Number, // Long-term financial goal
      required: true,
    },
    shorttermgoal: {
      type: Number, // Short-term financial goal
      required: true,
    },
    budget: {
      type: Number, // The budget (spending limit)
      required: true,
    },
    saving: {
      type: Number, // Current savings amount
      required: true,
    },
    investment: {
      type: Number, // Current investment amount
      required:false,
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
export default mongoose.models.User || mongoose.model("User", UserSchema, "users");
