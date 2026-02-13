"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  // Business settings state
  const [businessName, setBusinessName] = useState("CareOps Demo Clinic");
  const [ownerEmail, setOwnerEmail] = useState("admin@careops.com");
  const [industry, setIndustry] = useState("Healthcare");

  // Preferences
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setsmsAlerts] = useState(false);

  // Save settings
  const saveSettings = () => {
    toast.success("Settings Saved ✅", {
      description: "Your business preferences have been updated.",
    });
  };

  return (
    <div className="space-y-10 px-2 sm:px-6 lg:px-10 py-6">
      {/* Heading */}
      <div>
        <h1 className="text-4xl font-bold">Settings ⚙️</h1>
        <p className="text-gray-500 mt-2">
          Manage your business profile and preferences.
        </p>
      </div>

      {/* Business Profile */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold">🏢 Business Profile</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Business Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">
                Business Name
              </label>
              <Input
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>

            {/* Owner Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">
                Owner Email
              </label>
              <Input
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
              />
            </div>

            {/* Industry Dropdown*/}
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium text-gray-600">
                Industry Type
              </label>

              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm"
              >
                <option value="Healthcare">Healthcare</option>
                <option value="Consulting">Consulting</option>
                <option value="Sports">Sports</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification preferences */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold">
            🔔 Notification Preferences
          </h2>

          {/* Email Alerts */}
          <div className="flex items-center justify-between">
            <p className="text-gray-700 font-medium">
              Email Alerts (Low Stock, Bookings)
            </p>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={() => setEmailAlerts(!emailAlerts)}
              className="w-5 h-5"
            />
          </div>

          {/* SMS Alerts */}
          <div className="flex items-center justify-between">
            <p className="text-gray-700 font-medium">
              SMS Alerts (Future Upgrades)
            </p>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={() => setsmsAlerts(!smsAlerts)}
              className="w-5 h-5"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={saveSettings} className="px-6">
          Save
        </Button>
      </div>
    </div>
  );
}
