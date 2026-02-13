import { connectDB } from "@/lib/mongodb";
import Form from "@/models/Form";

// Delete form
export async function DELETE(req,{params}) {
    await connectDB()
    await Form.findByIdAndDelete(params.id)
    return Response.json({message : "Form Deleted"})
}