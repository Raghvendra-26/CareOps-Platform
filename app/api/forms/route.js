import { connectDB } from "@/lib/mongodb";
import Form from "@/models/Form";
import ResponseModel from "@/models/Response";

// GET all forms
export async function GET() {
  await connectDB();
  const forms = await Form.find().sort({ created: -1 });

  // attach responses for each form
  const formsWithCounts = await Promise.all(
    forms.map(async (form)=>{
      const count = await ResponseModel.countDocuments({formId: form._id})

      return {
        ...form.toObject(),
        responseCount : count
      }
    })
  )
  return Response.json(formsWithCounts);
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
