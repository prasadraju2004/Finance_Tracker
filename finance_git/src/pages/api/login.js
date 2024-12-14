import dbConnect from "@/lib/dbConnect.js"; // Ensure your dbConnect function is correct
import User from "@/models/User"; // Your user model

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Connect to the database
      await dbConnect();
      
      // Destructure name and password from the request body
      const { name, password } = req.body;
      console.log('name', name); // Log name for debugging

      // Find the user by username and password (plaintext comparison for now)
      const user = await User.findOne({
        user_name: name, // Match with the user_name field in your database
        password: password, // Assuming passwords are stored as plain text
      });

      // If the user is not found, return an error
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }

      // Send back user data (user_id and role_id) if found
      res.status(200).json({
        success: true,
        user: { user_id: user.user_id },
        message: "Successfully fetched details",
      });
    } catch (error) {
      // Handle server error
      res.status(500).json({ success: false, message: "Server error" });
      console.error(error); // Log error for debugging
    }
  } else {
    // If method is not POST, return 405 Method Not Allowed
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
