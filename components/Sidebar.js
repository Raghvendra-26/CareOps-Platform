"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FileText,
  Package,
  BarChart3,
  Settings,
  Shield,
} from "lucide-react";

export default function Sidebar() {

  const pathname = usePathname()
  
  // Sidebar links
  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "CRM",
      href: "/crm",
      icon: <Users className="w-5 h-5" />,
    },
    {
      name: "Bookings",
      href: "/bookings",
      icon: <CalendarDays className="w-5 h-5" />,
    },
    {
      name: "Forms",
      href: "/forms",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      name: "Inventory",
      href: "/inventory",
      icon: <Package className="w-5 h-5" />,
    },
    {
      name: "Reports",
      href: "/reports",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      name: "Roles & Acsess",
      href: "/roles",
      icon: <Shield className="w-5 h-5" />,
    },
  ];

  return (
    <aside className="h-screen w-64 flex flex-col border-r bg-white p-6">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600 mb-10">CareOps</div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"}`}
            >
              {link.icon}
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer Setting placeholder */}
      <div className="mt-auto pt-6 border-t">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
