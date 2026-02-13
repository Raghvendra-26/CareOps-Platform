import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

// patch status update
export async function PATCH(req,{params}) {
    await connectDB()
    const body = req.json()
    const updatedAppointment = await Appointment.findByIdAndUpdate(
        params.id,
        {status : body.status},
        {new : true}
    )
    return Response.json(updatedAppointment)
}

// Delete appointment
export async function DELETE(req,{params}) {
    await connectDB()
    await Appointment.findByIdAndDelete(params.id)
    return Response.json({message : "Appointment deleted"})
}