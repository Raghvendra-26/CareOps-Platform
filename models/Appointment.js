import mongoose from "mongoose";
import Customer from "./Customer";

const AppointmentSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);
