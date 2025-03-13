"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import CustomFormField from "./CustomFormField"
import { Mail, User } from "lucide-react"

export enum FormfieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
}
 
const formSchema = z.object({
  fullName: z.string().min(5, {
    message: "Nom complet devrait au moins avoir 5 caractères",
  }),
})
 
export function PatientForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
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
          name="fullName"
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
          label= "Telephone"
        />

        <Button type="submit" className="w-full bg-green-500">Commencer</Button>
      </form>
    </Form>
  )
}

export default PatientForm