import React from "react";
import {
  Users,
  Server,
  Activity,
  Wallet,
  FileText,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const platformStats = [
  { name: "Active Users", value: 3782 },
  { name: "New Signups", value: 215 },
  { name: "Total Servers", value: 12 },
  { name: "Revenue ($)", value: 12400 },
  { name: "Pending Requests", value: 32 },
  { name: "Avg Rating", value: 4.7 },
];

const dailyActivity = [
  { day: "Mon", users: 120 },
  { day: "Tue", users: 200 },
  { day: "Wed", users: 150 },
  { day: "Thu", users: 220 },
  { day: "Fri", users: 300 },
  { day: "Sat", users: 180 },
  { day: "Sun", users: 250 },
];

const totalUsers = [
  { name: "Free Users", value: 5000 },
  { name: "Premium Users", value: 2500 },
];

const revenueAnalytics = [
  { month: "Jan", value: 4000 },
  { month: "Feb", value: 3200 },
  { month: "Mar", value: 5000 },
  { month: "Apr", value: 4700 },
  { month: "May", value: 5200 },
];

const systemLogs = [
  "Server restarted at 03:45 AM",
  "New admin created: John Doe",
  "Database backup completed",
  "User 'alice' updated profile",
];

export default function AdminDashboard() {
  const stats = [
    {
      title: "Dashboard Overview",
      value: "",
      icon: <Server className="w-6 h-6" />,
      info: "Summary of system metrics",
    },
    {
      title: "Platform Stats",
      value: "",
      icon: <TrendingUp className="w-6 h-6" />,
      info: "Active users and servers",
    },
    {
      title: "Daily Activity",
      value: "",
      icon: <Activity className="w-6 h-6" />,
      info: "User activity trends",
    },
    {
      title: "Total Users",
      value: "",
      icon: <Users className="w-6 h-6" />,
      info: "Registered users breakdown",
    },
    {
      title: "Revenue Analytics",
      value: "",
      icon: <Wallet className="w-6 h-6" />,
      info: "Revenue trends",
    },
    {
      title: "System Logs",
      value: "",
      icon: <FileText className="w-6 h-6" />,
      info: "Recent system events",
    },
  ];

  return (
    <div className="w-full p-4 md:p-6 space-y-6">
      {/* Admin Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 shadow flex flex-col hover:shadow-md transition-all"
          >
            <div className="p-3 bg-gray-100 rounded-xl w-fit">{item.icon}</div>
            <p className="text-gray-600 mt-4 font-semibold">{item.title}</p>
            <p className="text-sm text-gray-500 mt-1">{item.info}</p>
          </div>
        ))}
      </div>

      {/* Platform Stats */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Platform Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {platformStats.map((stat, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-gray-500">{stat.name}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Activity Chart */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Daily Activity</h2>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#4C6EF5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Total Users */}
      <div className="bg-white p-6 rounded-2xl shadow grid grid-cols-2 gap-4">
        {totalUsers.map((user, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl p-4 text-center flex flex-col justify-center"
          >
            <p className="text-gray-500">{user.name}</p>
            <p className="text-2xl font-bold">{user.value}</p>
          </div>
        ))}
      </div>

      {/* Revenue Analytics */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Revenue Analytics</h2>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueAnalytics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#4C6EF5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* System Logs */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">System Logs</h2>
        <ul className="text-gray-700 text-sm space-y-2">
          {systemLogs.map((log, index) => (
            <li key={index}>• {log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
