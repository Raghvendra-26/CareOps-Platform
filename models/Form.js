import mongoose from "mongoose";

const FormSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    questions: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.Form || mongoose.model("Form", FormSchema);
