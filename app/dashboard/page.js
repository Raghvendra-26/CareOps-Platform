import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  const stats = [
    { title: "Total Leads", value: 24 },
    { title: "Bookings This Week", value: 12 },
    { title: "Pending Tasks", value: 5 },
    { title: "Inventory Alerts", value: 2 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard 🚀</h1>

      <p className="text-gray-500">
        Welcome to CareOps - Unified Operations Platform
      </p>

      {/* Responsive grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.title}>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">{item.title}</p>
              <h2 className="text-2xl font-bold">{item.value}</h2>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
