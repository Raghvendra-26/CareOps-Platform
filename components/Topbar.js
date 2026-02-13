"use client";

import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-4 py-3 md:hidden">
      <h1 className="text-xl font-bold text-blue-600">CareOps</h1>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Menu className="w-4 h-4" />
            Menu
          </Button>
        </SheetTrigger>

        {/* side="left" makes it feel like a real sidebar sliding out */}
        <SheetContent side="left" className="p-0 w-64">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <Sidebar />
        </SheetContent>
      </Sheet>
    </header>
  );
}
