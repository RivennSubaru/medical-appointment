import { z } from "zod";

export const userFormValidation = z.object({
    name: z.string()
        .min(2, {message: "Ce champ doit contenir au moins 2 caractères",})
        .max(50, {message: "Ce champ doit contenir au plus 50 caractères"}),
    email: z.string().email("Email invalide"),
    phone: z.string().refine((phone) => /^(\+261|0)(20\d{7}|3[2-49]\d{7})$/.test(phone), "Format de numéros de téléphone incorect")
})

export const PatientFormValidation = z.object({
    name: z.string()
        .min(2, {message: "Ce champ doit contenir au moins 2 caractères",})
        .max(50, {message: "Ce champ doit contenir au plus 50 caractères"}),
    email: z.string().email("Email invalide"),
    phone: z.string().refine((phone) => /^(\+261|0)(20\d{7}|3[2-49]\d{7})$/.test(phone), "Format de numéros de téléphone incorect"),
    birthDate: z.coerce.date(),
    gender: z.enum(["Masculin", "Féminin", "Autre"]),
    address: z
      .string()
      .min(5, "Adresse doit au moins contenir 5 caractères")
      .max(500, "Adresse doit contenir au plus 500 caractères"),
    occupation: z
      .string()
      .min(2, "Profession doit au moins contenir 2 caractères")
      .max(500, "Profession doit contenir au plus 500 caractères"),
    emergencyContactName: z
      .string()
      .min(2, "Nom doit au moins contenir 2 caractères")
      .max(50, "Nom doit contenir au plus 50 caractères"),
    emergencyContactNumber: z
        .string()
        .refine(
            (phone) => /^(\+261|0)(20\d{7}|3[2-49]\d{7})$/
            .test(phone), "Format de numéros de téléphone incorect"
        ),
    primaryPhysician: z.string().min(2, "Choisisser au moins un médecin"),
    allergies: z.string().optional(),
    currentMedication: z.string().optional(),
    familyMedicalHistory: z.string().optional(),
    pastMedicalHistory: z.string().optional(),
    identificationType: z.string().optional(),
    identificationDocument: z.custom<File[]>().optional(),
  });