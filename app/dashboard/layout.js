import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar desktop */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Topbar mobile */}
        <Topbar />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
  