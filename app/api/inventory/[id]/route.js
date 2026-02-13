import { connectDB } from "@/lib/mongodb";
import InventoryItem from "@/models/InventoryItem";

// Patch update quantity
export async function PATCH(req, { params }) {
  await connectDB();
  const {id} = await params
  const body = await req.json();
  const updated = await InventoryItem.findByIdAndUpdate(
    id,
    { quantity: body.quantity },
    { returnDocument: "after" },
  );
  return Response.json(updated);
}

// Delete item
export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;
  await InventoryItem.findByIdAndDelete(id);
  return Response.json({ message: "Item deleted" });
}
