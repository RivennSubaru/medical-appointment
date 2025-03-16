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

export const getAppointment = async (appointmentId: string) => {
    try {
        const res = await fetch(`${baseUrl}/appointments?id=${appointmentId}`)

        const appointment = await res.json()

        return appointment[0]
    } catch (error) {
        console.log(error);
    }
}