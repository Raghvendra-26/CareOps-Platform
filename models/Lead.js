import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified"],
      default: "New",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Lead ||
  mongoose.model("Lead", LeadSchema);