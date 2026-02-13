import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

// Get all leads

export async function GET() {
  await connectDB();
  const leads = await Lead.find().sort({ created: -1 });
  return Response.json(leads);
}

// Post new lead

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const newLead = await Lead.create({
    name: body.name,
    phone: body.phone,
  });
  return Response.json(newLead);
}
