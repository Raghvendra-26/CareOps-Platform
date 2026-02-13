"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// import api key helpers
import {
  getLeads,
  convertLead,
  createLead,
  updateLeadStatus,
  getCustomers,
} from "@/lib/api";

export default function CRMPage() {
  // leads state
  const [leads, setLeads] = useState([]);
  // customers state
  const [customers, setCustomers] = useState([]);

  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // loading state
  const [loading, setLoading] = useState(true);

  // fetch crm data
  const fetchData = async () => {
    try {
      setLoading(true);

      const leadsData = await getLeads();
      const customerData = await getCustomers();

      setLeads(leadsData);
      setCustomers(customerData);
    } catch (error) {
      toast.error("Failed to load CRM data ❌");
    } finally {
      setLoading(false);
    }
  };

  // load on page start
  useEffect(() => {
    fetchData();
  }, []);


  // Add Lead function
  const handleAddLead = async () => {
    if (!name || !phone) {
      toast.error("Missing Name or Phone ❌");
      return;
    }
    try {
      await createLead({ name, phone });

      toast.success("Lead Added ✅");

      setName("");
      setPhone("");

      await fetchData();
    } catch (error) {
      toast.error("Error adding lead ❌");
    }
  };

  //   update lead status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateLeadStatus(id, newStatus);

      // ✅ Update local state immediately
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead._id === id ? { ...lead, status: newStatus } : lead,
        ),
      );

      toast.success("Lead Status updated 🔃");
    } catch (error) {
      toast.error("Failed to update Status ❌");
    }
  };

  // convert Lead -> Customer
  const handleConvertLead = async (id) => {
  try {
    await convertLead(id);
    
    // ✅ Manually move the item in local state
    const convertedLead = leads.find(l => l._id === id);
    if (convertedLead) {
      setLeads(prev => prev.filter(l => l._id !== id));
      setCustomers(prev => [...prev, convertedLead]);
    }

    toast.success("Lead Converted ✅");
  } catch (error) {
    toast.error("Conversion Failed ❌");
  }
};

  // Status Badge colors
  const statusStyle = {
    New: "bg-blue-100 text-blue-700",
    Contacted: "bg-yellow-100 text-yellow-700",
    Qualified: "bg-green-100 text-green-700",
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

      {/* Add lead*/}
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

          <Button onClick={handleAddLead} className="w-full sm:w-fit">
            Add Lead
          </Button>
        </CardContent>
      </Card>

      {/* Leads List */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">📌 Leads</h2>

          {loading ? (
            <p className="text-gray-500">Loading leads...</p>
          ) : leads.length === 0 ? (
            <p className="text-gray-500">No Leads available.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border">
              <table className="text-sm w-full">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Convert</th>
                  </tr>
                </thead>

                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-gray-50 border-t">
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
                              handleStatusChange(lead._id, e.target.value)
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
                          disabled={lead.status !== "Qualified"}
                          onClick={() => handleConvertLead(lead._id)}
                        >
                          Convert
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Customers Section */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">✅ Customers</h2>

          {customers.length === 0 ? (
            <p className="text-gray-500">No customers yet.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border">
              <table className="text-sm w-full">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Phone</th>
                  </tr>
                </thead>

                <tbody>
                  {customers.map((customer) => (
                    <tr
                      key={customer._id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-4 font-medium">{customer.name}</td>
                      <td className="p-4">{customer.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
