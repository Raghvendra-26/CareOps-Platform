import { connectDB } from "@/lib/mongodb";
import InventoryItem from "@/models/InventoryItem";

// Patch update quantity
export async function PATCH(req, { params }) {
  await connectDB();
  const body = await req.json();
  const updated = await InventoryItem.findByIdAndUpdate(
    params.id,
    { quantity: params.quantity },
    { new: true },
  );
  return Response.json(updated);
}

// Delete item
export async function DELETE(req, { params }) {
  await connectDB();
  await InventoryItem.findByIdAndDelete(params.id);
  return Response.json({ message: "Item deleted" });
}
