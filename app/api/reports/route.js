import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import Customer from "@/models/Customer";
import Form from "@/models/Form";
import InventoryItem from "@/models/InventoryItem";
import Lead from "@/models/Lead";
import ResponseModel from "@/models/Response";

export async function GET() {
  await connectDB();

  const leads = await Lead.countDocuments();
  const customers = await Customer.countDocuments();

  const scheduled = await Appointment.countDocuments({ status: "Scheduled" });
  const cancelled = await Appointment.countDocuments({ status: "Cancelled" });
  const completed = await Appointment.countDocuments({ status: "Completed" });

  const lowStock = await InventoryItem.countDocuments({
    quantity: { $lte: 5 },
  });

  const forms = await Form.countDocuments();
  const responses = await ResponseModel.countDocuments();

  return Response.json({
    leads,
    customers,
    appointments: { scheduled, cancelled, completed },
    lowStock,
    forms,
    responses,
  });
}
