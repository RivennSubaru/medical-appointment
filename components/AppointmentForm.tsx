"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form
} from "@/components/ui/form"
import CustomFormField from "./CustomFormField"
import { Mail, User } from "lucide-react"
import { CreateAppointmentSchema, userFormValidation } from "@/lib/validations"
import SubmitButton from "./SubmitButton"
import { useState } from "react"
import { createUser } from "@/actions/patient.actions"
import { useRouter } from "next/navigation"
import { FormfieldType } from "./PatientForm"
import { baseUrl, Doctors } from "@/lib/constant"
import { SelectItem } from "./ui/select"
import Image from "next/image"
import { createAppointment, updateAppointment } from "@/actions/appointment.actions"
import { Appointment } from "@/types/model.types"
 
export function AppointmentForm({userId, patientId, type, appointment, setOpen}: {
    userId: number | string, 
    patientId: number | string,
    type: "cancel" | "schedule" | "create",
    appointment?: Appointment,
    setOpen?: (open: boolean) => void
}) {
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  
  const form = useForm<z.infer<typeof CreateAppointmentSchema>>({
    resolver: zodResolver(CreateAppointmentSchema),
    defaultValues: {
        primaryPhysician: appointment ? appointment.primaryPhysician : "",
        reason: appointment ? appointment.reason : "",
        note: appointment?.note || "",
        schedule: appointment ? new Date(appointment.schedule) : new Date(Date.now()),
        cancellationReason: appointment?.cancellationReason || ""
    },
  })
 
  async function onSubmit(values: z.infer<typeof CreateAppointmentSchema>) {
    setLoading(true)

    let status
    switch (type) {
        case "schedule":
            status = "programmé"
            break;
        case "cancel":
            status = "annulé"
            break;
    
        default:
            status = "en attente"
            break;
    }

    try {
        if (type === "create" && patientId) {
            const appointmentData = {
                patient: patientId,
                primaryPhysician: values.primaryPhysician,
                reason: values.reason,
                note: values.note,
                schedule: new Date(values.schedule).toISOString().slice(0, 19).replace('T', ' '),
                status: status as Status
            }

            const appointment = await createAppointment(appointmentData);

            if (appointment) {
                form.reset()
                router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.id}`)
            }
        } else {
            const appointmentToUpdate = {
                userId,
                appointmentId: appointment?.id!,
                appointment: {
                    patient: patientId,
                    schedule: new Date(values?.schedule).toISOString().slice(0, 19).replace('T', ' '),
                    status: status as Status,
                    primaryPhysician: values?.primaryPhysician,
                    reason: values?.reason,
                    note: values?.note,
                    cancellationReason: values?.cancellationReason
                },
                type
            }

            const updatedAppointment = await updateAppointment(appointmentToUpdate);

            if(updatedAppointment) {
                setOpen && setOpen(false);
                form.reset()
            }
        }
    } catch (error) {

      console.log(error);
    }

    setLoading(false)
  }

  let buttonLabel

  switch (type) {
    case "cancel":
        buttonLabel = "Annuler Rendez-vous"
        break;
    case "schedule":
        buttonLabel = "Valider Rendez-vous"
        break;
    case "create":
        buttonLabel = "Créer Rendez-vous"
        break;
  
    default:
        break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form-1 space-y-8">
        {type === "create" && (
            <section className="mb-12 space-y-4">
                <h1 className="header">Nouveau rendez-vous</h1>
                <span className="text-dark-700">Demander un rendez-vous en 10 secondes</span>
            </section>
        )}
        
        {type !== "cancel" && (
            <>
                <CustomFormField
                    control={form.control}
                    fieldType={FormfieldType.SELECT}
                    name="primaryPhysician"
                    label= "Médecin"
                    placeholder="Choisisser un médecin"
                >
                    {Doctors.map((doctor) => (
                        <SelectItem key={doctor.name} value={doctor.name}>
                            <div className="flex cursor-pointer items-center gap-2">
                                <Image
                                    src={doctor.image}
                                    width={32}
                                    height={32}
                                    alt={doctor.name}
                                    className="rounded-full border border-dark-500"    
                                />
                                <p>{doctor.name}</p>
                            </div>
                        </SelectItem>
                    ))}
                </CustomFormField>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldType={FormfieldType.TEXTAREA}
                        name="reason"
                        label= "Raison du rendez-vous"
                        placeholder="Analyse de sang"
                    />

                    <CustomFormField
                        control={form.control}
                        fieldType={FormfieldType.TEXTAREA}
                        name="note"
                        label= "Note additionel"
                        placeholder="Après-midi si possible"
                    />
                </div>

                <CustomFormField
                    control={form.control}
                    fieldType={FormfieldType.DATE_PICKER}
                    name="schedule"
                    label= "Date de rendez-vous"
                    placeholder="Votre date de rendez-vous"
                    showTimeSelect={true}
                    dateFormat="MM/dd/yyyy - h:mm aa"
                />
            </>
        )}

        {type === "cancel" && (
            <CustomFormField
                control={form.control}
                fieldType={FormfieldType.TEXTAREA}
                name="cancellationReason"
                label= "Raison de l'annulation"
                placeholder="Entrer la raison de l'annulation"
            />
        )}

        <SubmitButton loading={loading} className={`${type === 'cancel' ? "shad-danger-btn" : "shad-primary-btn"} w-full`}>
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  )
}

export default AppointmentForm