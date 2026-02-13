"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

import {
  getAppointments,
  createAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  getCustomers,
} from "@/lib/api";

export default function BookingsPage() {
  // Appointments state
  const [appointments, setAppointments] = useState([]);

  // Customers for dropdown
  const [customers, setCustomers] = useState([]);

  // Form state
  const [customerId, setCustomerId] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");

  // Load data once
  const fetchData = async () => {
    try {
      const apptData = await getAppointments();
      const custData = await getCustomers();

      setAppointments(apptData);
      setCustomers(custData);
    } catch (err) {
      toast.error("Failed to load bookings ❌");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ----------------------------
  // Add Appointment
  // ----------------------------
  const handleAddBooking = async () => {
    if (!customerId || !service || !date) {
      toast.error("Fill all fields ❌");
      return;
    }

    try {
      const newBooking = await createAppointment({
        customerId,
        service,
        date,
      });

      // ✅ Update local state instantly
      setAppointments((prev) => [newBooking, ...prev]);

      toast.success("Booking Created ✅");

      // Reset form
      setCustomerId("");
      setService("");
      setDate("");
    } catch (err) {
      toast.error("Failed to create booking ❌");
    }
  };

  // ----------------------------
  // Update Status (Gemini Style)
  // ----------------------------
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateAppointmentStatus(id, newStatus);

      // ✅ Update local state instantly
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: newStatus } : appt,
        ),
      );

      toast.success("Status Updated 🔄");
    } catch (err) {
      toast.error("Status update failed ❌");
    }
  };

  // ----------------------------
  // Delete Booking
  // ----------------------------
  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);

      // ✅ Remove instantly
      setAppointments((prev) => prev.filter((a) => a._id !== id));

      toast.success("Booking Deleted 🗑️");
    } catch (err) {
      toast.error("Delete failed ❌");
    }
  };

  // Badge colors
  const statusStyle = {
    Scheduled: "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
    Cancelled: "bg-gray-200 text-gray-600",
  };

  const scheduled = appointments.filter((a) => a.status === "Scheduled");
  const completed = appointments.filter((a) => a.status === "Completed");
  const cancelled = appointments.filter((a) => a.status === "Cancelled");

  return (
    <div className="space-y-10 px-2 sm:px-6 lg:px-10 py-6">
      {/* Heading */}
      <div>
        <h1 className="text-4xl font-bold">Bookings 📅</h1>
        <p className="text-gray-500 mt-2">
          Manage customer appointments in CareOps.
        </p>
      </div>

      {/* Create Booking */}
      <Card className="shadow-md">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold">➕ Create Booking</h2>

          <div className="grid gap-3 sm:grid-cols-3">
            {/* Customer Dropdown */}
            <select
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select Customer</option>
              {customers.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name} ({c.phone})
                </option>
              ))}
            </select>

            {/* Service */}
            <Input
              placeholder="Service (e.g. Consultation)"
              value={service}
              onChange={(e) => setService(e.target.value)}
            />

            {/* Date */}
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <Button onClick={handleAddBooking} className="w-full sm:w-fit">
            Add Booking
          </Button>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">📌 Appointments</h2>

          {appointments.length === 0 ? (
            <p className="text-gray-500">No appointments yet.</p>
          ) : (
            <div className="space-y-8">
              <AppointmentTable
                title="📌 Scheduled Appointments"
                data={scheduled}
                badgeColor="bg-blue-100 text-blue-700"
                handleStatusChange={handleStatusChange}
              />

              <AppointmentTable
                title="✅ Completed Appointments"
                data={completed}
                badgeColor="bg-green-100 text-green-700"
              />

              <AppointmentTable
                title="❌ Cancelled Appointments"
                data={cancelled}
                badgeColor="bg-gray-200 text-gray-600"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function AppointmentTable({ title, data, badgeColor,handleStatusChange }) {
  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4">
          {title} ({data.length})
        </h2>

        {data.length === 0 ? (
          <p className="text-gray-500">No appointments.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {data.map((appt) => (
                  <tr
                    key={appt._id}
                    className={`border-t ${appt.status === "Cancelled"
                        ? "opacity-50"
                        : "hover:bg-gray-50"}`}
                  >
                    <td className="p-4 font-medium">{appt.customerId?.name}</td>
                    <td className="p-4">{appt.service}</td>
                    <td className="p-4">{appt.date}</td>

                    <td className="p-4 space-y-2">
                      {/* Badge always visible */}
                      <Badge className={badgeColor}>{appt.status}</Badge>

                      {/* Dropdown only if Scheduled */}
                      {appt.status === "Scheduled" && (
                        <select
                          value={appt.status}
                          onChange={(e) =>
                            handleStatusChange(appt._id, e.target.value)
                          }
                          className="border rounded-md px-2 py-1 text-sm"
                        >
                          <option value="Scheduled">Scheduled</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
