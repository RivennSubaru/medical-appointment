"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form
} from "@/components/ui/form"
import CustomFormField from "./CustomFormField"
import { Mail, User } from "lucide-react"
import { userFormValidation } from "@/lib/validations"
import SubmitButton from "./SubmitButton"
import { useState } from "react"
import { createUser } from "@/actions/patient.actions"
import { useRouter } from "next/navigation"

export enum FormfieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
}
 
export function PatientForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  
  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    },
  })
 
  async function onSubmit({name, email, phone}: z.infer<typeof userFormValidation>) {
    setLoading(true)

    try {
      const userData = {name, email, phone}

      const data = await createUser(userData)

      if (data) router.push(`/patients/${data.user.id}/register`)
    } catch (error) {

      console.log(error);
    }

    setLoading(false)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form-1 space-y-8">
        <section className="mb-12 space-y-4">
            <h1 className="header">Bienvenu 👋</h1>
            <span className="text-dark-700">Prennez votre premier rendez-vous</span>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormfieldType.INPUT}
          name="name"
          label= "Nom complet"
          placeholder="Rokoto Ben"
          icon= {<User className="ml-2"/>}
        />
        <CustomFormField
          control={form.control}
          fieldType={FormfieldType.INPUT}
          name="email"
          label= "Email"
          placeholder="exemple@gmail.com"
          icon= {<Mail className="ml-2"/>}
        />
        <CustomFormField
          control={form.control}
          fieldType={FormfieldType.PHONE_INPUT}
          name="phone"
          label= "Téléphone"
        />

        <SubmitButton loading={loading}>
          Commencer
        </SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm