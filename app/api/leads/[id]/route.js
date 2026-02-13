import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";


// update lead status
export async function PATCH(req,{params}){
    await connectDB()
    const body = await req.json()
    const updatedLead = await Lead.findByIdAndUpdate(
        params.id,
        {status : body.status},
        {new : true}
    )
    return Response.json(updatedLead)
}

// Delete lead 
export async function DELETE(req,{params}) {
    await connectDB()
    await Lead.findByIdAndDelete(params.id)
    return Response.json({message : "Lead deleted"})
}