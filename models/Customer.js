import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },

    // optional business notes
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Customer ||
  mongoose.model("Customer", CustomerSchema);
