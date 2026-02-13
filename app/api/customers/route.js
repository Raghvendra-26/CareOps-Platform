import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";

// Get all customers
export async function GET() {
    await connectDB()
    const customers = await Customer.find().sort({created : -1})
    return Response.json(customers)
}