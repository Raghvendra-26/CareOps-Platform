import { connectDB } from "@/lib/mongodb";
import InventoryItem from "@/models/InventoryItem";

// GET all inventory items
export async function GET() {
  await connectDB();
  const items = await InventoryItem.find().sort({ created: -1 });
  return Response.json(items);
}

// Post new inventory item
export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const newItem = await InventoryItem.create({
    name: body.name,
    category: body.category,
    quantity: body.quantity,
  });
  return Response.json(newItem);
}
