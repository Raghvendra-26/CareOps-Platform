"use client";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Sidebar: Only visible on desktop (md and up) */}
      <div className="hidden md:block h-full">
        <Sidebar />
      </div>

      {/* Main Area: Takes up remaining space */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar: Only visible on mobile (hidden on md and up) */}
        <Topbar />

        {/* Content: Scrollable area for your cards/stats */}
        <main className="flex-1 overflow-y-auto p-4 md:p-10">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
