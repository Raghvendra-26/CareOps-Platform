"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function CRMPage() {
  // leads state
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "Raghvendra Singh",
      phone: "8442029426",
      status: "Contacted",
    },
    { id: 2, name: "Pulkit Vashishth", phone: "9772887939", status: "New" },
  ]);

  // customers state
  const [customers, setCustomers] = useState([
    { id: 101, name: "Amit Singh", phone: "9000111456" },
  ]);

  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Add Lead function
  const addLead = () => {
    if (!name || !phone){
      toast.error("Missing Fields ❌", {
        description: "Please fill all details.",
      });
      return
    };

    const newLead = {
      id: Date.now(),
      name,
      phone,
      status: "New",
    };

    setLeads([newLead, ...leads]);
    setName("");
    setPhone("");

    toast.success("Lead Added ✅", {
      description: `${newLead.name} was added successfully.`,
    });
  };

  //   update status dropdown
  const updateStatus = (id, newStatus) => {
    setLeads(
      leads.map((lead) =>
        lead.id === id ? { ...lead, status: newStatus } : lead,
      ),
    );
  };

  // convert Lead -> Customer
  const convertToCustomer = (lead) => {
    // remover from leads
    setLeads(leads.filter((l) => l.id !== lead.id));

    // Add to Customers
    setCustomers([
      { id: Date.now(), name: lead.name, phone: lead.phone },
      ...customers,
    ]);

    toast.success("Converted 🎉", {
      description: `${lead.name} is now a customer.`,
    });
  };

  // Status Badge colors
  const statusStyle = {
    New: "bg-blue-100 text-blue-700",
    Contacted: "bg-yellow-100 text-yellow-700",
    Qualified: "bg-purple-100 text-purple-700",
  };


  return (
    <div className="space-y-6 py-6 px-2 sm:px-6 lg:px-10">
      {/* Page Heading */}
      <div>
        <h1 className="text-4xl font-bold items-center gap-2">CRM 📋</h1>
        <p className="text-gray-500 mt-2">
          Manages leads and customers in one place.
        </p>
      </div>

      {/* Add lead Form*/}
      <Card className="shadow-md">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold">➕ Add New Lead</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              placeholder="Customer Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <Button onClick={addLead} className="w-full sm:w-fit">
            Add Lead
          </Button>
        </CardContent>
      </Card>


      {/* Leads Section */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">📌 Leads List</h2>

          <div className="overflow-x-auto rounded-lg border">
            <table className="text-sm w-full">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 border-t">
                    <td className="p-4 font-medium">{lead.name}</td>
                    <td className="p-4">{lead.phone}</td>

                    {/* Status Dropdown */}
                    <td className="p-4">
                      <div className="flex flex-col gap-2">
                        <Badge className={statusStyle[lead.status]}>
                          {lead.status}
                        </Badge>

                        <select
                          value={lead.status}
                          onChange={(e) =>
                            updateStatus(lead.id, e.target.value)
                          }
                          className="border rounded-md px-2 py-1 text-sm"
                        >
                          <option>New</option>
                          <option>Contacted</option>
                          <option>Qualified</option>
                        </select>
                      </div>
                    </td>

                    {/* Convert Button */}
                    <td className="p-4 text-center">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled = {lead.status !== "Qualified"}
                        onClick={()=>convertToCustomer(lead)}
                      >
                        Convert
                      </Button>
                    </td>
                  </tr>
                ))}

                {leads.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-gray-500">
                      No Leads available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Customers Section */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">✅ Customers List</h2>

          <div className="overflow-x-auto rounded-lg border">
            <table className="text-sm w-full">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-4">Customer Name</th>
                  <th className="p-4">Phone</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-medium">{customer.name}</td>
                    <td className="p-4">{customer.phone}</td>
                  </tr>
                ))}

                {customers.length === 0 && (
                  <tr>
                    <td colSpan="2" className="p-6 text-center text-gray-500">
                      No Customers yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
