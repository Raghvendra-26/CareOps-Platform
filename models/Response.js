import mongoose from "mongoose";

const ResponseSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    answers: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Response", ResponseSchema);
