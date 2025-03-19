"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl
} from "@/components/ui/form"
import CustomFormField from "./CustomFormField"
import { Mail, User } from "lucide-react"
import { PatientFormValidation, userFormValidation } from "@/lib/validations"
import SubmitButton from "./SubmitButton"
import { useState } from "react"
import { createUser, registerPatient } from "@/actions/patient.actions"
import { useRouter } from "next/navigation"
import { FormfieldType } from "./PatientForm"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/lib/constant"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { SelectItem } from "./ui/select"
import Image from "next/image"
import FileUploader from "./FileUploader"

function RegisterForm({ user }: {user: User}) {
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
        ...PatientFormDefaultValues,
        name: user?.name,
        email: user?.email,
        phone: user?.phone
    },
  })
 
async function onSubmit(values: z.infer<typeof PatientFormValidation>) {

    const birthDate = new Date(values.birthDate);
    const formattedDate = birthDate.toISOString().split('T')[0];

    console.log(formattedDate); // Affichera : 2025-03-17
    setLoading(true);

    const formData = new FormData();
    formData.append("userId", user.id.toString());
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone || "");
    formData.append("birthDate", formattedDate);
    formData.append("gender", values.gender);
    formData.append("address", values.address);
    formData.append("occupation", values.occupation);
    formData.append("emergencyContactName", values.emergencyContactName);
    formData.append("emergencyContactNumber", values.emergencyContactNumber);
    formData.append("primaryPhysician", values.primaryPhysician);
    formData.append("allergies", values.allergies || "");
    formData.append("currentMedication", values.currentMedication || "");
    formData.append("familyMedicalHistory", values.familyMedicalHistory || "");
    formData.append("pastMedicalHistory", values.pastMedicalHistory || "");
    formData.append("identificationType", values.identificationType || "");

    if (values.identificationDocument && values.identificationDocument.length > 0) {
        formData.append("identificationDocument", values.identificationDocument[0]); // Ajoute le fichier
    }

    try {
        // @ts-ignore
        const patient = await registerPatient(formData);

        if (patient) router.push(`/patients/${user.id}/new-appointment`);
    } catch (error) {
        console.log(error);
    }

    setLoading(false);
}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form-1 space-y-12">
        <section className="space-y-4">
            <h1 className="header">Bienvenu 👋</h1>
            <span className="text-dark-700">Permettez-nous d'en savoir plus sur vous</span>
        </section>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Information personnelle</h2>
            </div>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormfieldType.INPUT}
          name="name"
          label= "Nom complet"
          placeholder="Rokoto Ben"
          icon= {<User className="ml-2"/>}
        />

        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                control={form.control}
                fieldType={FormfieldType.DATE_PICKER}
                name="birthDate"
                label= "Date de naissance"
                placeholder="Votre date de naissance"
            />
            <CustomFormField
                control={form.control}
                fieldType={FormfieldType.SKELETON}
                name="gender"
                label= "Genre"
                renderSkeleton={(field) => (
                    <FormControl>
                        <RadioGroup
                            className="flex h-11 gap-6 xl:justify-between"
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            {GenderOptions.map((option) => (
                                <div key={option} className="radio-group">
                                    <RadioGroupItem value={option} id={option}/>
                                    <Label htmlFor={option} className="cursor-pointer">
                                        {option}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </FormControl>
                )}
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                control={form.control}
                fieldType={FormfieldType.INPUT}
                name="address"
                label= "Adresse"
                placeholder="ex: Andrainjato"
            />

            <CustomFormField
                control={form.control}
                fieldType={FormfieldType.INPUT}
                name="occupation"
                label= "Profession"
                placeholder="Ingénieur"
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                control={form.control}
                fieldType={FormfieldType.INPUT}
                name="emergencyContactName"
                label= "Nom contact d'urgence"
                placeholder="ex: Nom frère/sœur/parent"
            />

            <CustomFormField
                control={form.control}
                fieldType={FormfieldType.PHONE_INPUT}
                name="emergencyContactNumber"
                label= "Téléphone contact d'urgence"
            />
        </div>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Information médicale</h2>
            </div>
        </section>

        <CustomFormField
            control={form.control}
            fieldType={FormfieldType.SELECT}
            name="primaryPhysician"
            label= "Médecin de premier secours"
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
                name="allergies"
                label= "Allergies (si vous en avez)"
                placeholder="ex: noix, Pollen"
            />

            <CustomFormField
                control={form.control}
                fieldType={FormfieldType.TEXTAREA}
                name="currentMedication"
                label= "Médicament actuel"
                placeholder="ex: Ibuprofen 200mg"
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                control={form.control}
                fieldType={FormfieldType.TEXTAREA}
                name="familyMedicalHistory"
                label= "Antécédents médicaux familiaux (si pertinent)"
                placeholder="ex: Mère avait un cancer du sein "
            />

            <CustomFormField
                control={form.control}
                fieldType={FormfieldType.TEXTAREA}
                name="pastMedicalHistory"
                label= "Antécédents médicaux"
                placeholder="ex: Diagnostic de l'asthme à l'enfance "
            />
        </div>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Identification et vérification</h2>
            </div>
        </section>

        <CustomFormField
            control={form.control}
            fieldType={FormfieldType.SELECT}
            name="identificationType"
            label= "Type d'identification"
            placeholder="Choisisser un type d'identification"
        >
            {IdentificationTypes.map((type) => (
                <SelectItem key={type} value={type}>
                    {<div className="flex cursor-pointer items-center gap-2">
                        {type}
                    </div>}
                </SelectItem>
            ))}
        </CustomFormField>

        <CustomFormField
            control={form.control}
            fieldType={FormfieldType.SKELETON}
            name="identificationDocument"
            label= "Copie du documment scanné"
            renderSkeleton={(field) => (
                <FormControl>
                    <FileUploader files={field.value} onChange={field.onChange}/>
                </FormControl>
            )}
        />

        <SubmitButton loading={loading}>
          Commencer
        </SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm