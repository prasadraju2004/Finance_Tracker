"use client"
import React, { useState } from 'react'
import { Bell, Gift, Flame, Plus, ShoppingCart, CreditCard, Coffee, TrendingUp, Wallet, DollarSign } from 'lucide-react'
import { IndianRupee } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function AttractiveDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const storedUsername = localStorage.getItem("username");
  console.log("Stored Username:", storedUsername);

  return (
    <div className="min-h-screen bg-white dark:bg-white p-4 sm:p-6 lg:p-8">

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Finance Tracker</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" className="relative hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors">
              <Gift className="h-5 w-5 text-purple-600" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] text-white">2</span>
            </Button>
            <Button variant="outline" size="icon" className="relative hover:bg-orange-100 dark:hover:bg-orange-900 transition-colors">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] text-white">10</span>
            </Button>
            <Avatar className="h-10 w-10 border-2 border-purple-300 dark:border-purple-700">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">JD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px] bg-purple-100 dark:bg-purple-900 rounded-lg p-1">
            <TabsTrigger value="overview" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-purple-800 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-100 transition-all">Overview</TabsTrigger>
            <TabsTrigger value="details" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-purple-800 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-100 transition-all">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="flex justify-between space-x-6">
              <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">Income</CardTitle>
                  <TrendingUp className="h-5 w-5 opacity-70" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">Rs.4,250</div>
                  <p className="text-xs mt-1 opacity-70">+5.2% from last month</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">Expenses</CardTitle>
                  <IndianRupee className="h-5 w-5 opacity-70" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">Rs.2,150</div>
                  <p className="text-xs mt-1 opacity-70">-1.8% from last month</p>
                </CardContent>
              </Card>
              </div>
            </div>

            {/* Expo Meter */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Expo Meter</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-blue-500" 
                    style={{ width: '75%', transition: 'width 0.5s ease-in-out' }}
                  />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  You've used <span className="font-medium text-blue-600 dark:text-blue-400">75%</span> of your monthly budget
                </p>
              </CardContent>
            </Card>

            {/* Saving Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Saving Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Short Term</span>
                    <span className="text-sm text-muted-foreground">85%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500" 
                      style={{ width: '85%', transition: 'width 0.5s ease-in-out' }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Long Term</span>
                    <span className="text-sm text-muted-foreground">25%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" 
                      style={{ width: '25%', transition: 'width 0.5s ease-in-out' }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Expenditure Logs */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-medium">Expenditure Logs</CardTitle>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">Today</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { icon: ShoppingCart, color: 'orange', title: 'Shopping', desc: 'Buy some grocery', amount: -120, time: '10:00 AM' },
                  { icon: CreditCard, color: 'purple', title: 'Subscription', desc: 'Disney+ Annual', amount: -80, time: '03:30 PM' },
                  { icon: Coffee, color: 'pink', title: 'Food', desc: 'Buy a ramen', amount: -32, time: '07:30 PM' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`rounded-full bg-${item.color}-100 p-2 dark:bg-${item.color}-900`}>
                        <item.icon className={`h-4 w-4 text-${item.color}-500`} />
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-500">${item.amount}</p>
                      <p className="text-sm text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Add Button */}
            <Button className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all">
              <Plus className="h-6 w-6" />
            </Button>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Detailed Financial Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  This section will contain in-depth financial reports and analytics. We're working on bringing you the most insightful data visualization and analysis tools.
                </p>
                <div className="flex justify-center">
                  <img src="/placeholder.svg" alt="Placeholder for detailed analytics" className="rounded-lg shadow-md" width={600} height={400} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}




