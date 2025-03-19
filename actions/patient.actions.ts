import { baseUrl } from "@/lib/constant"

export const createUser = async (newUser: CreateUserParams) => {
    try {
        const res = await fetch(`${baseUrl}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        })

        if (!res.ok) {
            if (res.status === 422) {
                // L'email existe déjà, récupérer l'utilisateur existant
                const existingUserRes = await fetch(`${baseUrl}/users/email/${newUser.email}`);
                
                if (!existingUserRes.ok) {
                    throw new Error("Erreur lors de la récupération de l'utilisateur existant");
                }

                const existingUser = await existingUserRes.json();
                return {isExist: true, ...existingUser}; // Retourne l'utilisateur existant
            }

            throw new Error(`Erreur API: ${res.statusText}`);
        }

        const user = await res.json()

        return user
    } catch (error: any) {
        console.error("Erreur lors de la création de l'utilisateur:", error);
        throw error; // Renvoyer l'erreur pour être gérée ailleurs
    }
}

export const getUserById = async (userId: string | number) => {
    try {
        const res = await fetch(`${baseUrl}/users/${userId}`)
        
        const user = await res.json()

        return user
    } catch (error) {

        console.log(error);
    }
}

export const getPatientByUserId = async (userId: number | string) => {
    try {
        const res = await fetch(`${baseUrl}/patients/userId/${userId}`)

        const patients = await res.json()

        return patients
    } catch (error) {
        console.log(error);
    }
}

export const registerPatient = async (formData: FormData) => {
    try {
        const res = await fetch(`${baseUrl}/patients`, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json", // Ne pas mettre "Content-Type"
            },
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error(`Erreur HTTP: ${res.status}`);
        }

        const newPatient = await res.json();
        console.log(newPatient);
        
        return newPatient;
    } catch (error) {
        console.log(error);
    }
}