"use client";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUsername = localStorage.getItem("username");
 // Replace with actual username or dynamic input
        const response = await fetch(`/api/user?username=${storedUsername}`);

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="text-center text-purple-600">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-purple-700 bg-purple-100 p-4 rounded-lg shadow">
        Error: {error}
      </div>
    );

  return (
    <div className="max-w-md mx-auto p-6 bg-purple-50 rounded-lg shadow-md font-sans text-purple-900">
      <h1 className="text-center text-purple-800 text-2xl font-semibold mb-6">User Profile</h1>

      {userData?.profile_picture && (
        <div className="flex justify-center mb-6">
          <img
            src={userData.profile_picture}
            alt="Profile Picture"
            className="rounded-full w-36 h-36 object-cover border-4 border-purple-500 shadow-md"
          />
        </div>
      )}

      <table className="w-full border-collapse">
        <tbody>
          {profileFields.map((field) => (
            <tr key={field.label} className="border-b border-purple-200">
              <td className="p-2 font-bold text-right text-purple-700 w-1/3 bg-purple-100">
                {field.label}:
              </td>
              <td className="p-2 text-left">{field.value(userData)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const profileFields = [
  { label: "Username", value: (data) => data?.user_name || "N/A" },
  { label: "Email", value: (data) => data?.email || "N/A" },
  { label: "Income", value: (data) => data?.income || "N/A" },
  { label: "Short-Term Goal", value: (data) => data?.shorttermgoal || "N/A" },
  { label: "Long-Term Goal", value: (data) => data?.longtermgoal || "N/A" },
  { label: "Budget", value: (data) => data?.budget || "N/A" },
  { label: "Saving", value: (data) => data?.saving || "N/A" },
  { label: "Investment", value: (data) => data?.investment || "N/A" },
  { label: "Member Since", value: (data) => new Date(data?.created_at).toLocaleDateString() },
];

export default ProfilePage;
