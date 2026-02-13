"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Users,
  ClipboardList,
  CalendarDays,
  CheckCircle,
  XCircle,
  Package,
  AlertTriangle,
  FileText,
  MessageSquare,
} from "lucide-react";

import { getDashboardStats } from "@/lib/api";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch {
      toast.error("Failed to load dashboard stats ❌");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) {
    return <p className="p-6 text-gray-500">Loading Dashboard...</p>;
  }

  return (
    <div className="px-4 sm:px-8 py-6 space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          Dashboard 🚀
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Quick overview of your CareOps system
        </p>
      </div>

      {/* Compact Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* CRM */}
        <MiniStat
          icon={<ClipboardList size={18} />}
          title="Total Leads"
          value={stats.leads}
        />
        <MiniStat
          icon={<Users size={18} />}
          title="Customers"
          value={stats.customers}
        />
        <MiniStat
          icon={<CheckCircle size={18} />}
          title="Qualified Leads"
          value={stats.qualifiedLeads}
        />

        {/* Booking */}
        <MiniStat
          icon={<CalendarDays size={18} />}
          title="Scheduled"
          value={stats.scheduled}
        />
        <MiniStat
          icon={<CheckCircle size={18} />}
          title="Completed"
          value={stats.completed}
        />
        <MiniStat
          icon={<XCircle size={18} />}
          title="Cancelled"
          value={stats.cancelled}
        />

        {/* Inventory */}
        <MiniStat
          icon={<Package size={18} />}
          title="Inventory Items"
          value={stats.totalItems}
        />
        <MiniStat
          icon={<AlertTriangle size={18} />}
          title="Low Stock Alerts"
          value={stats.lowStock}
          danger
        />

        {/* Forms */}
        <MiniStat
          icon={<FileText size={18} />}
          title="Total Forms"
          value={stats.forms}
        />
        <MiniStat
          icon={<MessageSquare size={18} />}
          title="Responses"
          value={stats.responses}
        />
      </div>
    </div>
  );
}

/* ---------------------------- */
/* Mini Stat Card */
/* ---------------------------- */
function MiniStat({ icon, title, value, danger }) {
  return (
    <Card
      className={`shadow-sm border rounded-xl hover:shadow-md transition ${
        danger ? "border-red-200" : ""
      }`}
    >
      <CardContent className="p-4 flex items-center gap-3">
        {/* Icon */}
        <div
          className={`p-2 rounded-lg ${
            danger ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-700"
          }`}
        >
          {icon}
        </div>

        {/* Text */}
        <div>
          <p className="text-xs text-gray-500">{title}</p>
          <h2 className="text-xl font-bold">{value}</h2>
        </div>
      </CardContent>
    </Card>
  );
}
