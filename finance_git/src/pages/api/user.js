import dbConnect from "@/lib/dbConnect"; // Ensure this file exists and correctly connects to the database
import User from "@/models/User"; // Ensure the User model is correctly defined

export default async function handler(req, res) {
  await dbConnect(); // Make sure this correctly establishes the DB connection

  // Handle GET request: Fetch user data
  if (req.method === "GET") {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    try {
      const user = await User.findOne({ user_name: username });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({
        income: user.income,
        sgoal: user.shorttermgoal,
        lgoal: user.longtermgoal,
        budget: user.budget,
        saving: user.saving,
        investment: user.investment, // Include investment data
      });
    } catch (error) {
      console.error("Database error:", error);
      return res.status(500).json({ error: "Failed to fetch user data" });
    }
  } 
  
  // Handle PUT request: Update user investment
  else if (req.method === "PUT") {
    const { username, investment } = req.body;

    if (!username || investment === undefined) {
      return res.status(400).json({ error: "Username and investment amount are required" });
    }

    try {
      // Find the user by username
      const user = await User.findOne({ user_name: username });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      console.log('user', user)

      // Update the investment field
      user.investment += investment;

      // Save the updated user document
      await user.save();

      return res.status(200).json({ message: "Investment updated successfully" });
    } catch (error) {
      console.error("Database error:", error);
      return res.status(500).json({ error: "Failed to update investment" });
    }
  } 
  
  // Handle invalid HTTP methods
  else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
