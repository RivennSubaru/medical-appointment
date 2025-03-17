"use server"

import { baseUrl } from "@/lib/constant"
import { parseStringify } from "@/lib/utils"
import { Appointment } from "@/types/model.types"
import { revalidatePath } from "next/cache"

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

export const getRecentAppointmentList = async () => {
    try {
        const res = await fetch(`${baseUrl}/appointments`)

        const appointments: Appointment[] = await res.json()

        const initialCounts = {
            scheduledCounts: 0,
            pendingCounts: 0,
            cancelledCount: 0
        }

        const counts = (appointments as Appointment[]).reduce((acc, appointment) => {
            if (appointment.status === 'programmé') {
                acc.scheduledCounts += 1;
            } else if (appointment.status === 'en attente') {
                acc.pendingCounts += 1;
            } else if (appointment.status === 'annulé') {
                acc.cancelledCount += 1;
            }

            return acc
        }, initialCounts)

        const data = {
            totalCount: appointments.length,
            ...counts,
            documents: appointments
        }

        return parseStringify(data)

    } catch (error) {
        console.log(error);
    }
}

export const updateAppointment = async ({ appointmentId, userId, appointment, type }: UpdateAppointmentParams) => {
    try {
        const res = await fetch(`${baseUrl}/appointment/${appointmentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appointment),
        })
        
        // TODO SMS notification

        revalidatePath('/admin')
        return parseStringify(updateAppointment)

        /* console.log({ appointmentId, userId, appointment, type }); */
        
    } catch (error) {
        
    }
}