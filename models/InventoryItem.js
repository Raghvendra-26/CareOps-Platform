import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    lowStockLimit: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Inventory ||
  mongoose.model("Inventory", InventorySchema);
