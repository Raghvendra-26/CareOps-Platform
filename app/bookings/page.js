"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";

export default function BookingPage() {
  // Customers (later will come from db)
  const [customers] = useState([
    { id: 1, name: "Raghvendra Singh" },
    { id: 2, name: "Parvendra Singh" },
    { id: 3, name: "Vikram Singh" },
  ]);

  // Bookings State
  const [bookings, setBookings] = useState([
    {
      id: 101,
      customer: "Amit Singh",
      service: "Consultation",
      date: "2026-02-15",
      status: "Scheduled",
    },
    {
      id: 102,
      customer: "Priya Verma",
      service: "Follow-up",
      date: "2026-02-16",
      status: "Completed",
    },
    {
      id: 103,
      customer: "Rahul Sharma",
      service: "Demo Meeting",
      date: "2026-02-18",
      status: "Cancelled",
    },
  ]);

  // Form State
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [date, setDate] = useState("");
  const [service, setService] = useState("");

  // Add Booking Function
  const addBooking = () => {
    if (!selectedCustomer || !date || !service) {
      toast.error("Missing Fields ❌", {
        description: "Please fill all booking details.",
      });
      return;
    }

    const newBooking = {
      id: Date.now(),
      customer: selectedCustomer,
      service,
      date,
      status: "Scheduled",
    };

    setBookings((prev) => [newBooking, ...prev]);

    toast.success("Booking Created ✅", {
      description: `Appointment scheduled for ${selectedCustomer}`,
    });

    // Reset form
    setSelectedCustomer("");
    setService("");
    setDate("");
  };

  // Booking status style
  const statusStyle = {
    Scheduled: "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  // Update booking status
  const updateStatus = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (!b) return b; // keep safe

        if (b.id === id) {
          return {
            ...b,
            status: newStatus,
          };
        }

        return b; // IMPORTANT: return unchanged booking
      }),
    );

    if (newStatus == "Cancelled") {
      toast.error("Booking Cancelled ❌");
    } else {
      toast.success("Booking Completed ✅");
    }
  };

  // split bookings into separate lists
  const scheduledBookings = bookings.filter((b) => b.status === "Scheduled");
  const completedBookings = bookings.filter((b) => b.status === "Completed");
  const cancelledBookings = bookings.filter((b) => b.status === "Cancelled");

  return (
    <div className="space-y-10 px-2 sm:px-6 lg:px-10 py-6">
      {/* Heading */}
      <div>
        <h1 className="text-4xl font-bold">Bookings 📅</h1>
        <p className="text-gray-500 mt-2">
          Schedule and manage customer appointments.
        </p>
      </div>

      {/* Add Booking Form */}
      <Card className="shadow-md">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold">➕ Create Appointment</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Customer Dropdown */}
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="">select customer</option>
              {customers.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Service Input */}
            <Input
              placeholder="Service (e.g. Consultation)"
              value={service}
              onChange={(e) => setService(e.target.value)}
            />

            {/* Date Picker */}
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <Button className="w-full sm:w-fit" onClick={addBooking}>
            Add Booking
          </Button>
        </CardContent>
      </Card>

      {/* Scheduled Appointments */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            📌 Scheduled Appointments
          </h2>
          {scheduledBookings.length === 0 ? (
            <p className="text-gray-500">No Scheduled bookings.</p>
          ) : (
            <BookingTable
              bookings={scheduledBookings}
              updateStatus={updateStatus}
              editable={true}
            />
          )}
        </CardContent>
      </Card>

      {/* Completed Appointments */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            ✅ Completed Appointments
          </h2>
          {completedBookings.length === 0 ? (
            <p className="text-gray-500">No Completed bookings.</p>
          ) : (
            <BookingTable bookings={completedBookings} editable={false} />
          )}
        </CardContent>
      </Card>

      {/* Cancelled Appointments */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            ❌ Cancelled Appointments
          </h2>
          {cancelledBookings.length === 0 ? (
            <p className="text-gray-500">No Cancelled bookings.</p>
          ) : (
            <BookingTable bookings={cancelledBookings} editable={false} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Reusable table component
function BookingTable({ bookings, updateStatus, editable }) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-4">Customer</th>
            <th className="p-4">Service</th>
            <th className="p-4">Date</th>
            {/* only show action column if editable */}
            {editable && <th className="p-4">Move To</th>}
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => {
            const isCompleted = b.status === "Completed";
            const isCancelled = b.status === "Cancelled";

            return (
              <tr
                key={b.id}
                className={`border-t hover:bg-gray-50 ${
                  isCancelled ? "bg-gray-50 text-gray-400" : ""
                }`}
              >
                {/* Customer */}
                <td className="p-4 font-medium flex items-center gap-2">
                  {/* Completed Icon */}
                  {isCompleted && (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}

                  {/* Cancelled Icon */}
                  {isCancelled && <XCircle className="w-4 h-4 text-red-500" />}

                  {b.customer}
                </td>

                {/* Service */}
                <td className="p-4">{b.service}</td>

                {/* Date */}
                <td className="p-4">{b.date}</td>

                {/* Dropdown only for Scheduled */}
                {editable && (
                  <td className="p-4">
                    <select
                      value={b.status}
                      onChange={(e) => updateStatus(b.id, e.target.value)}
                      className="border rounded-md px-2 py-1 text-sm"
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
