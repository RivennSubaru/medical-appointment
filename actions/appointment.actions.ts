"use server"

import { baseUrl } from "@/lib/constant"
import { formatDateTime, parseStringify } from "@/lib/utils"
import { Appointment } from "@/types/model.types"
import { revalidatePath } from "next/cache"
import twilio from 'twilio';
import { getUserById } from "./patient.actions"

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

        console.log("rendez-vous créé: ",newAppointment);
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

        const smsMessage = `
            Bonjour, c'est Health care.
            ${type === "schedule"
                ? `Votre rendez-vous a été programmé pour ${formatDateTime(appointment.schedule!).dateTime} avec le Dr. ${appointment.primaryPhysician}`
                : `Nous somme navré de vous annoncer que votre rendez-vous a été annulé pour ces raisons spécifiques: ${appointment.cancellationReason}`
            }
        `
        
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'An unknown error occured')
        }


        revalidatePath('/admin')
        const updatedAppointment = await res.json();

        await sendSMSNotification(userId, smsMessage)

        return parseStringify(updatedAppointment)
        

        /* console.log({ appointmentId, userId, appointment, type }); */
        
    } catch (error) {
        console.log(error);
    }
}

export const sendSMSNotification = async (userId: string | number, content: string) => {
    
    /* const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN); */
    

     try {
        const user = await getUserById(userId);

        console.log("simulation d'envoie de message...");
        console.log("Chargement...");
        console.log(`Message envoyé à ${user.name}(${user.phone}), message: `, content);

       /*  const message = await client.messages.create({
            body: content,
            from: '+18064294548', // Numéro Twilio
            to: user.phone // Numéro de l'utilisateur
        });
        console.log('Message envoyé avec succès:', message.sid); */
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