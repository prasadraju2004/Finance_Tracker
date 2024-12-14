"use client";
import React, { useState, useEffect } from "react";
import {
  Bell,
  Gift,
  Flame,
  TrendingUp,
  Wallet,
  DollarSign,
  IndianRupee,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

export default function AttractiveDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [sgoal, setSgoal] = useState(0);
  const [lgoal, setLgoal] = useState(0);
  const [saving, setSaving] = useState(0);
  const [streak, setStreak] = useState(0);
  const [budget, setBudget] = useState(0);
  const [reward , setReward]= useState(0);
  const router = useRouter();

  const storedUsername = localStorage.getItem("username");
  console.log("Stored Username:", storedUsername);

  useEffect(() => {
    if (storedUsername) {
      fetch(`/api/user?username=${storedUsername}`)
        .then((response) => response.json())
        .then((data) => {
          if (
            data.income &&
            data.sgoal &&
            data.lgoal &&
            data.budget &&
            data.saving
          ) {
            setIncome(data.income);
            setSgoal(data.sgoal);
            setLgoal(data.lgoal);
            setBudget(data.budget);
            setSaving(data.saving);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
        });
    }
  }, [storedUsername]);

  // Fetch expenses data and calculate streak
  useEffect(() => {
    if (storedUsername) {
      fetch(`/api/expenses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          username: storedUsername,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.expenses) {
            setExpenses(data.expenses);
            calculateStreak(data.expenses); // Call the streak calculation
          }
        })
        .catch((error) => {
          console.error("Failed to fetch expenses data:", error);
        });
    }
  }, [storedUsername]);

  // Calculate streak based on consecutive days of expenses
  const calculateStreak = (expenses) => {
    // Sort expenses by timestamp
    const sortedExpenses = expenses.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    let streakCount = 0;
    let prevDate = null;

    for (const expense of sortedExpenses) {
      const expenseDate = new Date(expense.timestamp).toDateString();

      if (!prevDate) {
        // First expense in the list
        streakCount = 1;
      } else if (new Date(prevDate).getTime() - new Date(expenseDate).getTime() === 24 * 60 * 60 * 1000) {
        // Consecutive day
        streakCount++;
      } else if (new Date(prevDate).getTime() - new Date(expenseDate).getTime() > 24 * 60 * 60 * 1000) {
        // Break in the streak
        break;
      }

      prevDate = expenseDate;
    }

    setStreak(streakCount);
  };

  if(streak>10){
    setReward(streak/10);
  }

  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );
  const handleAddClick = () => {
    router.push("/dashboard/addpage");
  };
  const handleprofile=()=>{
    router.push("/profile")

  }
  const handlereports = ()=>{
    router.push("/report")
  }
  useEffect(() => {
    if ((totalExpenses / budget) * 100 > 100) {
      alert("Warning: Your expenditures have exceeded your budget!");
    }
  }, [totalExpenses, budget]);

  return (
    <div className="min-h-screen bg-violet-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-violet-800">
            Finance Tracker
          </h1>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="relative hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
            >
              <Gift className="h-5 w-5 text-purple-600" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-violet-500 text-[10px] text-white">
                {reward}
              </span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="relative hover:bg-violet-100 dark:hover:bg-violet-900 transition-colors"
            >
              <Flame className="h-5 w-5 text-violet-500" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] text-white">
                {streak}
              </span>
            </Button>
            <Avatar className="h-10 w-10 border-2 border-violet-300">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback onClick={handleprofile} className="bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
                P 
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px] bg-purple-100 dark:bg-purple-900 rounded-lg p-1">
            <TabsTrigger
              value="overview"
              className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-purple-800 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-100 transition-all"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="details"
              onClick={handlereports}
              className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-purple-800 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-100 transition-all"
            >
              Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex justify-between space-x-6">
                <Card className="bg-gradient-to-br from-violet-500 to-violet-500 text-white">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">
                      Income
                    </CardTitle>
                    <TrendingUp className="h-5 w-5 opacity-70" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {income ? `Rs.${income}` : "Loading..."}
                    </div>
                    <p className="text-xs mt-1 opacity-70">
                      +5.2% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-violet-600 to-violet-800 text-white">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">
                      Expenses
                    </CardTitle>
                    <IndianRupee className="h-5 w-5 opacity-70" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{`Rs. ${totalExpenses}`}</div>
                    <p className="text-xs mt-1 opacity-70">
                      -1.8% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Expo Meter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      (totalExpenses / budget) * 100 > 100
                        ? "bg-red-600"
                        : (totalExpenses / budget) * 100 > 80
                        ? "bg-yellow-500"
                        : "bg-gradient-to-r from-violet-400 to-violet-600"
                    }`}
                    style={{
                      width: `${Math.min(
                        (totalExpenses / budget) * 100,
                        100
                      )}%`,
                      transition: "width 0.5s ease-in-out",
                    }}
                  />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  You've used{" "}
                  <span
                    className={`font-medium ${
                      (totalExpenses / budget) * 100 > 100
                        ? "text-red-600"
                        : (totalExpenses / budget) * 100 > 80
                        ? "text-yellow-500"
                        : "text-blue-600 dark:text-blue-400"
                    }`}
                  >
                    {`${(totalExpenses / budget) * 100}%`}
                  </span>{" "}
                  of your monthly budget
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Saving Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-violet-600">Short Term</span>
                    <span className="text-sm text-violet-500">{`${
                      (saving / sgoal) * 100
                    }%`}</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-violet-700"
                      style={{
                        width: `${(saving / sgoal) * 100}%`,
                        transition: "width 0.5s ease-in-out",
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-violet-600">Long Term</span>
                    <span className="text-sm text-violet-500">{`${
                      (saving / lgoal) * 100
                    }%`}</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-400 to-violet-600"
                      style={{
                        width: `${(saving / lgoal) * 100}%`,
                        transition: "width 0.5s ease-in-out",
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <button
                onClick={handleAddClick}
                className="w-64 h-12  bg-violet-600 text-white  font-semibold rounded-lg shadow-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200 justify-center space-x-20"
              >
                <span className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                  <span>Add Expense</span>
                </span>
              </button>
              <div><span> </span></div>
              <div className="h-5"><span></span></div>
              <button
                onClick={() => router.push("/dashboard/addinvestment")}
                className="w-64 h-12 bg-violet-500 text-white font-semibold rounded-lg shadow-md hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all duration-200"
              >
                <span className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                  <span>Investment</span>
                </span>
              </button>

              <CardHeader>
                <CardTitle className="text-lg font-medium text-violet-600">
                  Expenditure Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                {expenses.map((expense) => (
                  <div
                    key={expense._id}
                    className="flex justify-between items-center py-2 border-b"
                  >
                    <div className="text-sm text-black-700">{expense.category}</div>
                    <div className="text-sm text-red-500">
                      - Rs.{expense.amount}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            {/* Details content */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
