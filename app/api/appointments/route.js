import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

// Get all appointments
export async function GET(params) {
  await connectDB();
  const appointments = await Appointment.find()
    .populate("customerId")
    .sort({ created: -1 });

  return Response.json(appointments);
}

// Post new appointment
export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const appointment = await Appointment.create({
    customerId: body.customerId,
    service: body.service,
    date: body.date,
  });
  return Response.json(appointment);
}
