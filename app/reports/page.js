"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, Package, FileText } from "lucide-react";

export default function ReportsPage() {
  // Dummy data later connected to DB
  const stats = [
    {
      title: "Total Leads",
      value: 12,
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Total Customers",
      value: 5,
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Scheduled Appointments",
      value: 8,
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      title: "Completed Appointments",
      value: 4,
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      title: "Cancelled Appointments",
      value: 2,
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      title: "Low Stock Items",
      value: 3,
      icon: <Package className="w-6 h-6" />,
    },
    {
      title: "Forms Created",
      value: 6,
      icon: <FileText className="w-6 h-6" />,
    },
    {
      title: "Responses Collected",
      value: 18,
      icon: <FileText className="w-6 h-6" />,
    },
  ];

  return (
    <div className="space-y-10 px-2 sm:px-6 lg:px-10 py-6">
      {/* Heading */}
      <div>
        <h1 className="text-4xl font-bold">Reports 📊</h1>
        <p className="text-gray-500 mt-2">
          Overview of your CareOps business performance.
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="shadow-md hover:shadow-lg transition rounded-2xl"
          >
            <CardContent className="p-6 flex items-center gap-4">
              {/* Icon */}
              <div className="p-3 rounded-xl bg-gray-100">{stat.icon}</div>

              {/* Text */}
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h2 className="text-2xl font-bold">{stat.value}</h2>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Placeholder Charts Section */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-6 space-y-3">
          <h2 className="text-2xl font-semibold">
            📈 Analytics Charts (Coming Next)
          </h2>
          <p className="text-gray-500">
            In the next upgrade, we will add Charts for:{" "}
          </p>

          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>Appointments per day</li>
            <li>Lead conversion rate</li>
            <li>Inventory usage trends</li>
            <li>Form response insights</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
