import { getAppointment } from '@/actions/appointment.actions'
import { Button } from '@/components/ui/button'
import { Doctors } from '@/lib/constant'
import { formatDateTime } from '@/lib/utils'
import { Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Success = async ({ params, searchParams }: SearchParamProps) => {
    const {userId} = await params
    const { appointmentId } = await searchParams

    // @ts-ignore
    const appointment = await getAppointment(appointmentId)

    const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician)

    return (
        <div className='flex h-screen max-h-screen px-[5%]'>
            <div className='success-img'>
                <Link href="/">
                    logo
                </Link>

                <section className='flex flex-col items-center'>
                    <Image
                        src="/assets/gifs/success.gif"
                        height={300}
                        width={280}
                        alt='success'
                        unoptimized
                    />
                    <h2 className='header mb-6 max-w-[600px] text-center'>
                        Votre <span className='text-green-500'>demande de rendez-vous</span> a été soumise avec succès
                    </h2>
                    <p>Nous vous contacterons sous peu pour confirmer</p>
                </section>
                <section className='request-details'>
                    <p>Détails du rendez-vous demandé:</p>
                    <div className='flex items-center gap-3'>
                        <Image
                            src={doctor?.image!}
                            alt='doctor'
                            width={100}
                            height={100}
                            className='size-6'
                        />
                        <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
                    </div>
                    <div className='flex gap-2'>
                        <Calendar/>
                        <p>{formatDateTime(appointment.schedule).dateTime}</p>
                    </div>
                </section>

                <Button variant='outline' className='shad-primary-btn' asChild>
                    <Link href={`/patients/${userId}/new-appointment`}>
                        Nouveau rendez-vous
                    </Link>
                </Button>

                <p className="copyright">
                    © 2025
                </p>
            </div>
        </div>
    )
}

export default Success