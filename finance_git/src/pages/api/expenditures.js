import dbConnect from "@/lib/dbConnect.js";
import Expenditure from "@/models/Expenditure";
import User from "@/models/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    // Extract the username from query parameters
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    try {
      // Fetch the user by username
      const user = await User.findOne({ user_name: username });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Fetch expenditures for the user
      const expenditures = await Expenditure.find({ user_name: username }).sort({ created_at: -1 });

      res.status(200).json({ expenditures });
    } catch (error) {
      console.error("Error fetching expenditures:", error);
      res.status(500).json({ error: "Failed to fetch expenditures" });
    }
  } else if (req.method === "POST") {
    // Extract data from the request body
    const { username, efood, egroceriesclothing, etransport, ehealth, erepeated, eothers } = req.body;

    if (!username || efood === undefined || egroceriesclothing === undefined || etransport === undefined || ehealth === undefined || erepeated === undefined || eothers === undefined) {
      return res.status(400).json({ error: "Username and all expenditure fields are required" });
    }

    try {
      // Fetch the user by username
      const user = await User.findOne({ user_name: username });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Create a new expenditure entry
      const expenditure = new Expenditure({
        user_id: user._id, // Reference the user's unique ID
        user_name: user.user_name,
        efood,
        egroceriesclothing,
        etransport,
        ehealth,
        erepeated,
        eothers,
      });

      await expenditure.save(); // Save the new expenditure to the database

      res.status(201).json({ message: "Expenditure added successfully", expenditure });
    } catch (error) {
      console.error("Error adding expenditure:", error);
      res.status(500).json({ error: "Failed to add new expenditure" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
