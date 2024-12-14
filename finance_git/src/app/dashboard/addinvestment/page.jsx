"use client";
import { useState, useEffect } from "react";

const UpdateInvestmentForm = () => {
  const [investment, setInvestment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [username, setUsername] = useState("");
  const storedUsername = localStorage.getItem("username");

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!investment) {
      setError("Investment amount is required");
      return;
    }

    try {
      const response = await fetch(`/api/user/${username}`, { // Change API endpoint to include username in the URL
        method: "PUT", // Use PUT instead of POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: storedUsername,
          investment,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Investment updated successfully");
        setInvestment("");
      } else {
        setError(data.error || "Failed to update investment");
      }
    } catch (error) {
      setError("An error occurred while updating investment");
      console.error("Error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Update Investment</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputContainer}>
          <label htmlFor="investment" style={styles.label}>Investment Amount:</label>
          <input
            type="number"
            id="investment"
            name="investment"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
        <button type="submit" style={styles.button}>Update</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  error: {
    color: "red",
    fontSize: "14px",
    textAlign: "center",
  },
  success: {
    color: "green",
    fontSize: "14px",
    textAlign: "center",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default UpdateInvestmentForm;
