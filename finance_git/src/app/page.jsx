"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Correct hook for Next.js App Directory

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize the router

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, password }), // Sending 'name' instead of 'username'
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("username", username);
        router.push("/dashboard"); 
       // Redirect to the Home page after successful login
      } else {
        setError(data.message || "Something went wrong!");
      }
    } catch (err) {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-violet-100">
      
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold text-violet-600 mb-6">Finance Tracker</h1> 
        <h2 className="text-2xl font-bold text-center mb-6 text-violet-500">Login</h2>
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-violet-300 text-white font-medium rounded-md hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
