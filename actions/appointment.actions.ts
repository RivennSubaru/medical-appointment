import { baseUrl } from "@/lib/constant"

export const createAppointment = async (appointment: CreateAppointmentParams) => {
    try {
        const res = await fetch(`${baseUrl}/appointments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appointment),
        })

        const newAppointment = await res.json()

        return newAppointment
    } catch (error: any) {

        console.error(error);
    }
}