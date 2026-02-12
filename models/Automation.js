import mongoose from "mongoose";

const AutomationSchema = new mongoose.Schema(
  {
    trigger: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Automation", AutomationSchema);
