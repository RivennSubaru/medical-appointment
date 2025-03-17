"use client"

import React, { useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
  
import { X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { decryptKey, encryptKey } from '@/lib/utils'
  

const PasskeyModal = () => {
    const router = useRouter()
    const path = usePathname()
    const [open, setOpen] = useState(true)
    const [passkey, setPasskey] = useState('')
    const [error, setError] = useState("")

    const closeModal = () => {
        setOpen(false)
        router.push('/')
    }

    const encryptedKey = typeof window !== 'undefined' ? window.localStorage.getItem('accessKey') : null

    useEffect(() => {
        const accessKey = encryptedKey && decryptKey(encryptedKey)
      if (path) {
        if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            setOpen(false)
            router.push("/admin")
        } else {
            setOpen(true)
        }
      }
    }, [encryptKey])

    const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            const encryptedKey = encryptKey(passkey)

            localStorage.setItem('accessKey', encryptedKey)

            setOpen(false)
            router.push("/admin")
        } else {
            setError("Mot de passe invalide. Veuillez réessayer")
        }
    }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className='shad-alert-dialog'>
            <AlertDialogHeader>
                <AlertDialogTitle className='flex items-start justify-between'>
                    Vérification accès admin
                    <X
                        onClick={closeModal}
                        className='cursor-pointer'
                    />
                </AlertDialogTitle>
                <AlertDialogDescription>
                    Entrer le mot de passe pour acceder la page admin
                </AlertDialogDescription>
            </AlertDialogHeader>
            <div>
                <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
                    <InputOTPGroup className='shad-otp'>
                        <InputOTPSlot index={0} className='shad-otp-slot'/>
                        <InputOTPSlot index={1} className='shad-otp-slot'/>
                        <InputOTPSlot index={2} className='shad-otp-slot'/>
                        <InputOTPSlot index={3} className='shad-otp-slot'/>
                        <InputOTPSlot index={4} className='shad-otp-slot'/>
                        <InputOTPSlot index={5} className='shad-otp-slot'/>
                    </InputOTPGroup>
                </InputOTP>
                {error && (
                    <p className='shad-error text-14-regular mt-4 flex justify-center'>
                        {error}
                    </p>
                )}
            </div>
            <AlertDialogFooter>
                <AlertDialogAction className='shad-primary-btn w-full' onClick={(e) => validatePasskey(e)}>
                    Entrer le mot de passe admin
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>

  )
}

export default PasskeyModal