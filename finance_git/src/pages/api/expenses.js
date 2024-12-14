// /pages/api/expenses.js
import dbConnect from "@/lib/dbConnect.js";
import Expense from "@/models/Expense";
import User from "@/models/User";
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating unique log_id

export default async function handler(req, res) {
  await dbConnect();

  // GET request: Retrieve user expenses
  if (req.method === "GET") {
    const { username } = req.headers; // Retrieve username from the request headers

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    console.log("Username from headers:", username);

    try {
      const user = await User.findOne({ user_name: username });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const expenses = await Expense.find({ user_name: username }) // Filter expenses based on username
        .sort({ createdAt: -1 }) // Sort expenses by date (newest first)
        .limit(10); // Limit to the latest 10 expenses

      res.status(200).json({ expenses }); // Return the expenses to the client
    } catch (error) {
      console.error("Error fetching expenses:", error);
      res.status(500).json({ error: "Failed to fetch expenditure logs" });
    }

  // POST request: Add a new expense
  } else if (req.method === "POST") {
    const { username, category, amount } = req.body;
    console.log('username', username)
    // Validate inputs
    if (!username || !category || !amount) {
      return res.status(400).json({ error: "Username, category, and amount are required" });
    }

    // Check if the category is valid
    const validCategories = ['food', 'groceries', 'clothing', 'transport', 'health', 'repeated', 'others'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    try {
      // Fetch the user by username
      const user = await User.findOne({ user_name: username });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Create a new expense entry
      const newExpense = new Expense({
        log_id: uuidv4(), // Generate a unique log_id using UUID
        user_id: user._id, // Link to the user
        user_name: username,
        category,
        amount,
      });

      await newExpense.save(); // Save the new expense to the database

      res.status(201).json({ message: "Expense added successfully", expense: newExpense });
    } catch (error) {
      console.error("Error adding expense:", error);
      res.status(500).json({ error: "Failed to add new expense" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
