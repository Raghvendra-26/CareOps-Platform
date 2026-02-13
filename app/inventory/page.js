"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertTriangle, PackageCheck, Trash2 } from "lucide-react";

import {
  getInventory,
  createInventoryItem,
  updateInventory,
  deleteInventoryItem,
} from "@/lib/api";
import { Badge } from "@/components/ui/badge";

export default function InventoryPage() {
  // Inventory State
  const [items, setItems] = useState([]);

  // Form State
  const [itemName, setItemName] = useState("");
  const [itemQty, setItemQty] = useState("");
  const [category, setCategory] = useState("");

  // ✅ Persistent Quantity Edit State (Fixes null bug)
  const [editQty, setEditQty] = useState({});

  // fetch inventory
  const fetchInventory = async () => {
    try {
      const data = await getInventory();
      setItems(data);
    } catch (error) {
      toast.error("Failed to load inventory ❌");
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // Add Inventory Item
  const handleAddItem = async () => {
    if (!itemName || !itemQty || !category) {
      toast.error("Missing fields ❌");
      return;
    }

    try {
      const newItem = await createInventoryItem({
        name: itemName,
        category,
        quantity: Number(itemQty),
      });

      setItems((prev) => [newItem, ...prev]);

      toast.success("Item Added ✅");

      setItemName("");
      setItemQty("");
      setCategory("");
    } catch (error) {
      toast.error("Failed to add item ❌");
    }
  };

  // update item
  const handleUpdateQty = async (id) => {
    const newQty = Number(editQty[id]);

    if (isNaN(newQty)) return;

    try {
      await updateInventory(id, newQty);

      // update local instantly
      setItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, quantity: newQty } : item,
        ),
      );
      toast.success("Quantity updated 🔃");
    } catch (error) {
      toast.error("Update Failed ❌");
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    try {
      await deleteInventoryItem(id);

      // remove instantly
      setItems((prev) => prev.filter((item) => item._id !== id));

      toast.success("Item Deleted 🗑️");
    } catch (error) {
      toast.error("Delete Failed ❌");
    }
  };

  // Split inventory
  const availableStock = items.filter(
    (item) => item.quantity > item.lowStockLimit,
  );
  const lowStock = items.filter((item) => item.quantity <= item.lowStockLimit);

  return (
    <div className="space-y-10 px-2 sm:px-6 lg:px-10 py-6">
      {/* Heading */}
      <div>
        <h1 className="text-4xl font-bold">Inventory 📦</h1>
        <p className="text-gray-500 mt-2">
          Track supplies, products and low-stock alerts.
        </p>
      </div>

      {/* Add Item Form */}
      <Card className="shadow-md">
        <CardContent className="space-y-4 p-6">
          <h2 className="text-2xl font-semibold">➕ Add Inventory Item</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Input
              placeholder="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Quantity"
              value={itemQty}
              onChange={(e) => setItemQty(e.target.value)}
            />
            <Input
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <Button className="w-full sm:w-fit" onClick={handleAddItem}>
              Add Item
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Stock */}
      <StockTable
        title="✅ Available Stock"
        data={availableStock}
        badge="bg-green-100 text-green-700"
        editQty={editQty}
        setEditQty={setEditQty}
        onUpdate={handleUpdateQty}
        onDelete={handleDelete}
      />
      {/* Low Stock Alerts*/}
      <StockTable
        title="⚠️ Low Stock"
        data={lowStock}
        badge="bg-red-100 text-red-700"
        editQty={editQty}
        setEditQty={setEditQty}
        onUpdate={handleUpdateQty}
        onDelete={handleDelete}
      />
    </div>
  );
}

function StockTable({
  title,
  data,
  badge,
  editQty,
  setEditQty,
  onUpdate,
  onDelete,
}) {
  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4">
          {title} ({data.length})
        </h2>

        {data.length === 0 ? (
          <p className="text-gray-500">No items here.</p>
        ) : (
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-4">Item</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Update</th>
                  <th className="p-4 text-center">Delete</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item) => (
                  <tr key={item._id} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-medium">{item.name}</td>

                    <td className="p-4">
                      <Badge className="bg-gray-200 text-gray-700">
                        {item.category}
                      </Badge>
                    </td>

                    <td className="p-4">
                      <Badge className={badge}>{item.quantity}</Badge>
                    </td>

                    {/* Update Qty */}
                    <td className="p-4 flex gap-2">
                      <Input
                        type="number"
                        className="w-20"
                        value={editQty[item._id] ?? item.quantity}
                        onChange={(e) =>
                          setEditQty((prev) => ({
                            ...prev,
                            [item._id]: e.target.value,
                          }))
                        }
                      />

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onUpdate(item._id)}
                      >
                        Update
                      </Button>
                    </td>

                    {/* Delete */}
                    <td className="p-4 text-center">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(item._id)}
                      >
                        Delete
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
  );
}
