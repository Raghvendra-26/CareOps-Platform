import { connectDB } from "@/lib/mongodb";
import Form from "@/models/Form";

// Delete form
export async function DELETE(req,{params}) {
    await connectDB()
    const {id} = await params
    await Form.findByIdAndDelete(id)
    return Response.json({message : "Form Deleted"})
}