import React from "react";
import {
  Building2,
  Users,
  Wallet,
  CalendarDays,
  Wrench,
  Star,
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
  RadialBar,
  RadialBarChart,
} from "recharts";

const monthlySales = [
  { name: "Jan", value: 150 },
  { name: "Feb", value: 380 },
  { name: "Mar", value: 200 },
  { name: "Apr", value: 280 },
  { name: "May", value: 170 },
  { name: "Jun", value: 190 },
  { name: "Jul", value: 250 },
  { name: "Aug", value: 100 },
  { name: "Sep", value: 200 },
  { name: "Oct", value: 360 },
  { name: "Nov", value: 240 },
  { name: "Dec", value: 120 },
];

const revenueData = [
  { month: "Jan", value: 4000 },
  { month: "Feb", value: 3200 },
  { month: "Mar", value: 5000 },
  { month: "Apr", value: 4700 },
  { month: "May", value: 5200 },
];

export default function SellerDashboardHero() {
  const stats = [
    {
      title: "Total Properties",
      value: "12",
      icon: <Building2 className="w-6 h-6" />,
      info: "2 pending approval",
    },
    {
      title: "Total Customers",
      value: "3,782",
      icon: <Users className="w-6 h-6" />,
      info: "215 new this month",
    },
    {
      title: "Monthly Revenue",
      value: "$12,400",
      icon: <Wallet className="w-6 h-6" />,
      info: "+12% from last month",
    },
    {
      title: "Bookings",
      value: "87",
      icon: <CalendarDays className="w-6 h-6" />,
      info: "14 pending visits",
    },
    {
      title: "Service Requests",
      value: "32",
      icon: <Wrench className="w-6 h-6" />,
      info: "5 urgent",
    },
    {
      title: "Avg Rating",
      value: "4.7",
      icon: <Star className="w-6 h-6" />,
      info: "980 reviews",
    },
  ];

  return (
    <div className="w-full p-4 md:p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT SIDE → 6 CARDS (2 rows × 3 columns) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:col-span-3">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 shadow flex flex-col hover:shadow-md transition-all"
            >
              <div className="p-4 bg-gray-100 rounded-xl w-fit">
                {item.icon}
              </div>

              <p className="text-gray-600 mt-4">{item.title}</p>
              <h2 className="text-3xl font-bold">{item.value}</h2>

              <div
                className={`mt-2 px-3 py-1 rounded-full text-sm w-fit ${
                  item.info.includes("-")
                    ? "text-red-600 bg-red-100"
                    : "text-green-600 bg-green-100"
                }`}
              >
                {item.info}
              </div>
            </div>
          ))}
        </div>

        {/* ===================== RIGHT SIDE → MONTHLY TARGET ===================== */}
        <div className="bg-white rounded-2xl p-6 shadow flex flex-col">
          <h2 className="text-xl font-semibold">Monthly Target</h2>
          <p className="text-gray-500 text-sm">
            Target you’ve set for each month
          </p>

          <div className="flex justify-center mt-6">
            <ResponsiveContainer width={250} height={180}>
              <RadialBarChart
                innerRadius="80%"
                outerRadius="100%"
                data={[{ name: "Progress", value: 75.55, fill: "#4C6EF5" }]}
                startAngle={180}
                endAngle={0}
              >
                <RadialBar dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>

          <h1 className="text-center text-3xl font-bold -mt-10">75.55%</h1>
          <div className="text-center mt-1 text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm w-fit mx-auto">
            +10%
          </div>

          <p className="mt-4 text-center text-gray-600 text-sm">
            You earned $3287 today, it's higher than last month.
          </p>

          <div className="grid grid-cols-3 text-center mt-6 border-t pt-4">
            <div>
              <p className="text-gray-500 text-sm">Target</p>
              <p className="font-bold">$20K</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Revenue</p>
              <p className="font-bold">$15K</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Today</p>
              <p className="font-bold">$3K</p>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Sales chart */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ✅ YOUR ORIGINAL DASHBOARD BELOW */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl p-4 bg-white shadow hover:shadow-md transition-all flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <div className="text-gray-700 font-medium text-sm">
                {item.title}
              </div>
              <span className="text-blue-600">{item.icon}</span>
            </div>
            <div className="text-2xl font-bold">{item.value}</div>
            <div className="text-xs text-gray-500">{item.info}</div>
          </div>
        ))}
      </div>

      {/* Revenue */}
      <div className="rounded-2xl p-6 shadow bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Monthly Revenue Overview</h2>
          <TrendingUp className="w-5 h-5 text-green-600" />
        </div>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#4C6EF5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          "Add New Property",
          "View Bookings",
          "Withdraw Earnings",
          "Manage Tenants",
        ].map((action, index) => (
          <button
            key={index}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            {action}
          </button>
        ))}
      </div>

      {/* Insights */}
      <div className="rounded-2xl p-6 shadow bg-white">
        <h3 className="text-lg font-semibold mb-3">Insights</h3>
        <ul className="text-gray-700 text-sm space-y-2">
          <li>
            • Your most viewed property this week: <b>Kings Residency</b>
          </li>
          <li>• Occupancy rate increased by 12% this month</li>
          <li>• 2 properties need updated pricing</li>
        </ul>
      </div>
    </div>
  );
}
