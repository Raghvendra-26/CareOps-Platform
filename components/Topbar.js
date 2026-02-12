"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const menu = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "CRM", path: "/crm" },
  { name: "Bookings", path: "/bookings" },
  { name: "Forms", path: "/forms" },
  { name: "Inventory", path: "/inventory" },
];

export default function Topbar() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-4 py-3 md:hidden">
      <h1 className="text-xl font-bold text-blue-600">CareOps</h1>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Menu</Button>
        </SheetTrigger>

        <SheetContent side="left" className="p-6">
          <nav className="space-y-6">
            {menu.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="block rounded-lg px-3 py-2 hover:bg-gray-100"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
