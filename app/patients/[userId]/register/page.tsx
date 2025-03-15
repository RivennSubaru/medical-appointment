import { getSingleUser } from '@/actions/patient.actions'
import RegisterForm from '@/components/RegisterForm'
import Image from 'next/image'
import React from 'react'

const Register = async ({ params }: SearchParamProps) => {
    const { userId } = await params
    const user = await getSingleUser(userId)

    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container">
                <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
                    <span className="mb-12 h-10 w-fit">Logo</span>
                    <RegisterForm user={user}/>

                    <p className="copyright py-12">
                        © copyright
                    </p>
                </div>
            </section>


            <Image
                src="/assets/images/register-img.png" alt="register img" 
                width={1000} height={1000} 
                className="side-img w-[390px] rounded-s-2xl"
            />
        </div>
    )
}

export default Register