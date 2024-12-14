"use client";

import { Router } from 'lucide-react';
import React, { useState } from 'react';
import { useRouter } from "next/navigation"; 


const AddExpenseForm = () => {
  const router = useRouter();
  const storedUsername = localStorage.getItem("username");
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [username, setUsername] = useState(storedUsername); // Corrected to fetch the 'username' from localStorage
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!category || !amount || !username) {
      setError('All fields are required');
      return;
    }

    // Clear previous errors
    setError('');
    
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, category, amount }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Expense added successfully!');
        // Reset form
        setCategory('');
        setAmount('');
        router.push("/dashboard")
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (error) {
      setError('Failed to add expense');
      console.error(error);
    }
    
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Add New Expense</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-500 mb-2">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="groceries">Groceries</option>
            <option value="clothing">Clothing</option>
            <option value="transport">Transport</option>
            <option value="health">Health</option>
            <option value="repeated">Repeated</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Amount"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
