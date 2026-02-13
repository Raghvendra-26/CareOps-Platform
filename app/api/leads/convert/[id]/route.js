import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";
import Lead from "@/models/Lead";

// Convert lead => Customer

export async function POST(req, { params }) {
  await connectDB();

  const {id} = await params

  // find lead
  const lead = await Lead.findById(id);
  if (!lead) {
    return Response.json({ error: "Lead not found" }, { status: 404 });
  }

  // Create customer
  const customer = await Customer.create({
    name: lead.name,
    phone: lead.phone,
  });

  // Remove lead
  await Lead.findByIdAndDelete(id);

  return Response.json({
    message: "Lead converted successfully",
    customer,
  });
}
