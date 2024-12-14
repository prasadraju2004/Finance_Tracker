"use client";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#ffbb28",
  "#d0ed57",
  "#a4de6c",
];

const PredictionPage = () => {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [expenditures, setExpenditures] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    food: 3000,
    transport: 500,
    clothing: 1500,
    groceries: 1200,
    health: 700,
    personal: 100,
    miscellaneous: 300,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
  };

  useEffect(() => {
    const fetchExpenditureData = async () => {
      try {
        const storedUsername = localStorage.getItem("username");
        const response = await fetch(
          `/api/expenditures?username=${storedUsername}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch expenditures");
        }
        const data = await response.json();
        setExpenditures(data.expenditures);
      } catch (err) {
        console.error("Error fetching expenditures:", err);
        setError(err.message || "Failed to fetch expenditures");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenditureData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = formData;

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.error) {
        setError(result.error);
      } else {
        setPrediction(result);
        setError(null);
      }
    } catch (error) {
      setError("Error fetching prediction");
    }
  };

  const formatExpendituresForChart = () => {
    return expenditures.map((exp) => ({
      name: exp.user_name,
      food: exp.efood,
      transport: exp.etransport,
      clothing: exp.egroceriesclothing,
      groceries: exp.egroceriesclothing,
      health: exp.ehealth,
      personal: exp.erepeated,
      miscellaneous: exp.eothers,
    }));
  };

  const formatExpendituresForPieChart = () => {
    const totals = expenditures.reduce(
      (acc, exp) => {
        acc.food += exp.efood;
        acc.transport += exp.etransport;
        acc.clothing += exp.egroceriesclothing;
        acc.groceries += exp.egroceriesclothing;
        acc.health += exp.ehealth;
        acc.personal += exp.erepeated;
        acc.miscellaneous += exp.eothers;
        return acc;
      },
      {
        food: 0,
        transport: 0,
        clothing: 0,
        groceries: 0,
        health: 0,
        personal: 0,
        miscellaneous: 0,
      }
    );

    return Object.entries(totals).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value,
    }));
  };

  return (
    <div className="container bg-violet-50 p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl text-violet-600 mb-6">Predict Expenditure</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(formData).map(([key, value]) => (
          <input
            key={key}
            type="number"
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            name={key}
            value={value}
            onChange={handleInputChange}
            className="w-full p-2 border border-violet-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        ))}
        <button
          type="submit"
          className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700"
        >
          Predict
        </button>
      </form>

      {error && <div className="error text-red-500 mt-4">{error}</div>}

      {prediction && (
        <div className="prediction-result mt-6">
          <h3 className="text-xl text-violet-600">Prediction Results:</h3>
          <ul className="mt-4 space-y-2">
            {Object.entries(prediction).map(([category, amount]) => (
              <li key={category} className="text-violet-700">
                <strong>
                  {category.charAt(0).toUpperCase() + category.slice(1)}:
                </strong>{" "}
                {amount}
              </li>
            ))}
          </ul>
        </div>
      )}

      {loading ? (
        <div className="loading mt-6">Loading data...</div>
      ) : (
        <div className="mt-6">
          <h3 className="text-xl text-violet-600">Bar Chart:</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={formatExpendituresForChart()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="food" fill="#8884d8" />
              <Bar dataKey="transport" fill="#82ca9d" />
              <Bar dataKey="clothing" fill="#ffc658" />
              <Bar dataKey="groceries" fill="#ff8042" />
              <Bar dataKey="health" fill="#ffbb28" />
              <Bar dataKey="personal" fill="#8884d8" />
              <Bar dataKey="miscellaneous" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>

          <h3 className="text-xl text-violet-600 mt-6">Pie Chart:</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={formatExpendituresForPieChart()}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label={(entry) => `${entry.name}: ${entry.value}`}
              >
                {formatExpendituresForPieChart().map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default PredictionPage;
