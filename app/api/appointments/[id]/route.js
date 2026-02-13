import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

// patch status update
export async function PATCH(req,{params}) {
    await connectDB()
    const {id} = await params
    const body = await req.json()
    const updatedAppointment = await Appointment.findByIdAndUpdate(
        id,
        {status : body.status},
        {returnDocument : "after"}
    )
    return Response.json(updatedAppointment)
}

// Delete appointment
export async function DELETE(req,{params}) {
    await connectDB()
    const {id} = await params
    await Appointment.findByIdAndDelete(id)
    return Response.json({message : "Appointment deleted"})
}