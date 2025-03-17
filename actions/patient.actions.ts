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
                return existingUser; // Retourne l'utilisateur existant
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

export const getUserById = async (userId: string) => {
    try {
        const res = await fetch(`${baseUrl}/users?id=${userId}`)
        
        const users = await res.json()

        return users[0]
    } catch (error) {

        console.log(error);
    }
}

export const getPatientByUserId = async (userId: string) => {
    try {
        const res = await fetch(`${baseUrl}/patients?userId=${userId}`)

        const patients = await res.json()

        return patients[0]
    } catch (error) {
        console.log(error);
    }
}

export const registerPatient = async ({identificationDocument, ...patient}: RegisterUserParams) => {
    let file
    try {
        if (identificationDocument) {
            file = identificationDocument.get('blobFile')
            const fileName = identificationDocument.get('fileName')

            console.log('importation du fichier: ', fileName);
            // importing file logic

            file = `uploads/${fileName}`
        }

        const res = await fetch(`${baseUrl}/patients`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({file, ...patient}),
        })

        const newPatient = await res.json()

        return newPatient
    } catch (error) {
        console.log(error)
    }
}