"use server"

import { baseUrl } from "@/lib/constant"
import { parseStringify } from "@/lib/utils"
import { Appointment } from "@/types/model.types"
import { revalidatePath } from "next/cache"
import twilio from 'twilio';

export const createAppointment = async (appointment: CreateAppointmentParams) => {
    try {
        const res = await fetch(`${baseUrl}/appointments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appointment),
        })

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'An unknown error occured')
        }

        const newAppointment = await res.json()

        console.log(newAppointment);
        return newAppointment
    } catch (error: any) {

        console.error(error);
    }
}

export const getAppointment = async (appointmentId: number | string) => {
    try {
        const res = await fetch(`${baseUrl}/appointments/${appointmentId}`)

        const appointment = await res.json()

        return appointment
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
        const res = await fetch(`${baseUrl}/appointments/${appointmentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appointment),
        })
        
        // TODO SMS notification

        revalidatePath('/admin')
        const updatedAppointment = await res.json();

        return parseStringify(updatedAppointment)
        

        /* console.log({ appointmentId, userId, appointment, type }); */
        
    } catch (error) {
        console.log(error);
    }
}

export const sendSMSNotification = async (content: string) => {
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    try {
        const message = await client.messages.create({
            body: content,
            from: '+18064294548', // Numéro Twilio
            to: '+261387373260' // Numéro de l'utilisateur
        });
        console.log('Message envoyé avec succès:', message.sid);
    } catch (error: any) {
        // Gestion des erreurs
        if (error.code) {
            console.error(`Erreur Twilio (${error.code}): ${error.message}`);
            switch (error.code) {
                case 20003:
                    console.error("Authentification échouée : vérifiez votre SID et Token.");
                    break;
                case 21608:
                    console.error("Vous essayez peut-être d'envoyer un SMS à un numéro non vérifié.");
                    break;
                case 21610:
                    console.error("Le destinataire a désactivé les messages Twilio.");
                    break;
                default:
                    console.error("Une erreur imprévue est survenue :", error.message);
            }
        } else {
            console.error('Erreur inconnue lors de l\'envoi du SMS:', error);
        }
    }
}