"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FileText,
  Package,
  Shield,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    { name: "CRM", href: "/crm", icon: <Users className="w-5 h-5" /> },
    {
      name: "Bookings",
      href: "/bookings",
      icon: <CalendarDays className="w-5 h-5" />,
    },
    { name: "Forms", href: "/forms", icon: <FileText className="w-5 h-5" /> },
    {
      name: "Inventory",
      href: "/inventory",
      icon: <Package className="w-5 h-5" />,
    },
    {
      name: "Roles & Access",
      href: "/roles",
      icon: <Shield className="w-5 h-5" />,
    },
  ];

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-white p-6">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600 mb-10">CareOps</div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-2 flex-1">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-50 text-blue-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Settings at bottom */}
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
