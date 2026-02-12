"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertTriangle,PackageCheck, Trash2 } from "lucide-react";


export default function InventoryPage() {
  // Inventory State
  const [items, setItems] = useState([
    { id: 1, name: "Gloves Pack", quantity: 25, category: "Tools" },
    { id: 2, name: "Sanitizer Bottles", quantity: 5, category: "Medicines" },
    { id: 3, name: "Face Masks", quantity: 2, category: "Products" },
  ]);

  // Form State
  const [itemName, setItemName] = useState("");
  const [itemQty, setItemQty] = useState("");
  const [category, setCategory] = useState("");

  // ✅ Persistent Quantity Edit State (Fixes null bug)
  const [editQty, setEditQty] = useState(() => {
    const initial = {};
    items.forEach((i) => {
      initial[i.id] = i.quantity;
    });
    return initial;
  });

  // Threshold for low stock
  const LOW_STOCK_LIMIT = 5;

  // Add Inventory Item
  const addItem = () => {
    if (!itemName || !itemQty || !category) {
      toast.error("Missing fields ❌", {
        description: "Enter name and quantity.",
      });
      return;
    }

    const newItem = {
      id: Date.now(),
      name: itemName,
      quantity: Number(itemQty),
      category,
    };

    setItems((prev) => [newItem, ...prev]);

    // initialize edit qty for new item
    setEditQty((prev) => ({
      ...prev,
      [newItem.id]: newItem.quantity,
    }));

    toast.success("Item added ✅", {
      description: `${itemName} added to inventory.`,
    });

    // Reset form
    setItemQty("");
    setItemName("");
    setCategory("");
  };

  //   const delete item
  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));

    // remove from edit state
    setEditQty((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });

    toast.success("Item Deleted 🗑️", {
      description: "Inventory item removed successfully.",
    });
  };

  // Update quantity (on button click)
  const updateQty = (id, newQty) => {
    if (newQty === " " || isNaN(newQty)) {
      toast.error("Invalid Quantity ❌");
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Number(newQty) } : item,
      ),
    );

    toast.success("Stock Updated 🔄", {
      description: "Quantity updated successfully.",
    });
  };

  // Split inventory
  const availableItems = items.filter(
    (item) => item.quantity > LOW_STOCK_LIMIT,
  );
  const lowStockItems = items.filter(
    (item) => item.quantity <= LOW_STOCK_LIMIT,
  );

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

            <Button className="w-full sm:w-fit" onClick={addItem}>
              Add Item
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Stock */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-green-600" />
            Available Stock
          </h2>

          {availableItems.length === 0 ? (
            <p className="text-gray-500">No items in stock.</p>
          ) : (
            <InventoryTable
              items={availableItems}
              updateQty={updateQty}
              deleteItem={deleteItem}
              editQty={editQty}
              setEditQty={setEditQty}
            />
          )}
        </CardContent>
      </Card>

      {/* Low Stock Alerts*/}
      <Card className="shadow-md border-2 border-red-200">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Low Stock Alerts
          </h2>

          {lowStockItems.length === 0 ? (
            <p className="text-gray-500">No low stock items 🎉</p>
          ) : (
            <InventoryTable
              items={lowStockItems}
              updateQty={updateQty}
              deleteItem={deleteItem}
              editQty={editQty}
              setEditQty={setEditQty}
              lowStock={true}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function InventoryTable({
  items,
  updateQty,
  editQty,
  setEditQty,
  deleteItem,
  lowStock,
}) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-4">Item</th>
            <th className="p-4">Category</th>
            <th className="p-4">Quantity</th>
            <th className="p-4">Delete</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className={`border-t hover:bg-gray-50 ${lowStock ? "bg-red-50 text-gray-700" : ""}`}
            >
              <td className="p-4 font-medium">{item.name}</td>
              <td className="p-4 ">{item.category}</td>

              {/* Update quantity */}
              <td className="p-4 flex gap-2">
                <Input
                  type="number"
                  value={editQty[item.id] ?? item.quantity}
                  className="w-20"
                  onChange={(e) =>
                    setEditQty((prev) => ({
                      ...prev,
                      [item.id]: e.target.value,
                    }))
                  }
                />
                <Button
                  size="sm"
                  onClick={() => updateQty(item.id, editQty[item.id])}
                >
                  Update
                </Button>
              </td>

              {/* Delete button */}
              <td className="p-4">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteItem(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
