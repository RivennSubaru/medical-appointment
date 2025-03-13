import { z } from "zod";

export const userFormValidation = z.object({
    fullName: z.string()
        .min(2, {message: "Ce champ doit contenir au moins 2 caractères",})
        .max(50, {message: "Ce champ doit contenir au plus 50 caractères"}),
    email: z.string().email("Email invalide"),
    phone: z.string().refine((phone) => /^(\+261|0)(20\d{7}|3[2-49]\d{7})$/.test(phone), "Format de numéros de téléphone incorect")
})