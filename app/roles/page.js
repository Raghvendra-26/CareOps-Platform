"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Shield, Trash2, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function RolesPage() {
  // Team member state
  const [members, setMembers] = useState([
    { id: 1, name: "Amit Singh", email: "amit@careops.com", role: "Admin" },
    { id: 2, name: "Priya Verma", email: "priya@careops.com", role: "Staff" },
    { id: 3, name: "Rahul Sharma", email: "rahul@careops.com", role: "Viewer" },
  ]);

  //   Invite form state
  const [name, setName] = useState("");
  const [role, setRole] = useState("Staff");
  const [email, setEmail] = useState("");

  //   Invite member
  const inviteMember = () => {
    if (!name || !email) {
      toast.error("Missing Fields ❌", {
        description: "Enter name and email to invite.",
      });
      return;
    }

    const newMember = {
      id: Date.now(),
      name,
      email,
      role,
    };

    setMembers((prev) => [newMember, ...prev]);

    toast.success("Member invited ✅", {
      description: `${name} added as ${role}`,
    });

    // reset form
    setEmail("");
    setName("");
    setRole("Staff");
  };

  //   Update role
  const updateRole = (id, newRole) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role: newRole } : m)),
    );

    toast.success("Role updated 🔃", {
      description: `Member role updated to ${newRole}`,
    });
  };

  //   Remove member
  const removeMember = (id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));

    toast.success("Member Removed 🗑️", {
      description: "Team member removed successfully.",
    });
  };

  return (
    <div className="space-y-10 px-2 sm:px-6 lg:px-10 py-6">
      {/* Heading */}
      <div>
        <h1 className="text-4xl font-bold flex items-center gap-2">
          Roles & Permissions <Shield className="w-7 h-7 text-blue-700" />
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your team members and access control.
        </p>
      </div>

      {/* Invite Member Form */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-green-600" />
            Invite New Member
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Input
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Role Dropdown */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
              <option value="Viewer">Viewer</option>
            </select>

            <Button onClick={inviteMember}>Invite</Button>
          </div>
        </CardContent>
      </Card>

      {/* Member table */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">👥 Team Member</h2>

          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Remove</th>
                </tr>
              </thead>

              <tbody>
                {members.map((m) => (
                  <tr key={m.id} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-medium">{m.name}</td>
                    <td className="p-4">{m.email}</td>

                    {/* Role Selector */}
                    <td className="p-4">
                      <select
                        value={m.role}
                        onChange={(e) => updateRole(m.id, e.target.value)}
                        className="border rounded-md px-2 py-1 text-sm"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Staff">Staff</option>
                        <option value="Viewer">Viewer</option>
                      </select>
                    </td>

                    {/* Remove Button */}
                    <td className="p-4">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeMember(m.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}

                {members.length === 0 && (
                  <tr>
                    <td colSpan="2" className="p-6 text-center text-gray-500">
                      No team members yet.
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
