import { connectDB } from "@/lib/mongodb";
import Form from "@/models/Form";

// GET all forms
export async function GET() {
  await connectDB();
  const forms = await Form.find().sort({ created: -1 });
  return Response.json(forms);
}

// Post a new form
export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const newform = await Form.create({
    title: body.title,
    questions: body.questions,
  });
  return Response.json(newform);
}
