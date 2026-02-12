import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique : true,
      required : true
    },
    passwordHash : String,
    role: {
      type: String,
      enum : ["Admin","Staff","Viewer"],
      default : "Staff"
    },
  },
  { timestamps: true },
);

export default mongoose.model("User",UserSchema)