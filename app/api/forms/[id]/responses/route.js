import { connectDB } from "@/lib/mongodb";
import ResponseModel from "@/models/Response";

// get responses for a form
export async function GET(req, { params }) {
  await connectDB();
  const {id} = await params
  const responses = await ResponseModel.find({
    formId: id,
  }).sort({ created: -1 });
  return Response.json(responses);
}

// Post a submit response
export async function POST(req, { params }) {
  await connectDB();
  const {id} = await params
  const body = await req.json();
  const response = await ResponseModel.create({
    formId: id,
    customerName: body.customerName,
    answers: body.answers,
  });
  return Response.json(response);
}
