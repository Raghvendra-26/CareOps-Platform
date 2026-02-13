import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

// update lead status
export async function PATCH(req,{params}){
    await connectDB()
    const {id} = await params
    const body = await req.json()
    const updatedLead = await Lead.findByIdAndUpdate(
        id,
        {status : body.status},
        {returnDocument : "after"}
    )
    return Response.json(updatedLead)
}

// Delete lead 
export async function DELETE(req,{params}) {
    await connectDB()
    const { id } = await params;
    await Lead.findByIdAndDelete(id)
    return Response.json({message : "Lead deleted"})
}