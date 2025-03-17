import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useState } from "react"
import { Button } from "./ui/button"
import AppointmentForm from "./AppointmentForm"
import { Appointment } from "@/types/model.types"
  

const AppointmentModal = ({
    type,
    patientId,
    userId,
    appointment
}: { 
    type: "programmer" | "annuler",
    patientId: string,
    userId: string,
    appointment?: Appointment
 }) => {
    const [open, setOpen] = useState(false)
  return (
    
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant='ghost' className={`capitalize ${type === 'programmer' && 'text-green-500'}`}>
                {type}
            </Button>
        </DialogTrigger>
        <DialogContent className="shad-dialog sm:max-w-md">
            <DialogHeader className="space-y-3 mb-4">
                <DialogTitle className="capitalize">{type} rendez-vous</DialogTitle>
                <DialogDescription>
                    Veuillez remplire le formulaire pour {type} le rendez-vous
                </DialogDescription>
            </DialogHeader>

            <AppointmentForm
                userId={userId}
                patientId={patientId}
                type={type === "programmer" ? "schedule" : "cancel"}
                appointment={appointment}
                setOpen={setOpen}
            />
        </DialogContent>
    </Dialog>

  )
}

export default AppointmentModal