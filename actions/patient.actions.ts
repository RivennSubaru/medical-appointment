import { baseUrl } from "@/lib/constant"

export const createUser = async (newUser: CreateUserParams) => {
    try {
        const res = await fetch(`${baseUrl}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({...newUser, password: "123456"}),
        })

        const data = await res.json()

        return data
    } catch (error: any) {
        if (error && error?.code === 409) {

            const res = await fetch(`${baseUrl}/users?email=${newUser.email}`)

            const users = await res.json()

            return users[0]
        }

        console.error(error);
    }
}

export const getSingleUser = async (userId: string) => {
    try {
        const res = await fetch(`${baseUrl}/users?id=${userId}`)
        
        const users = await res.json()

        return users[0]
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