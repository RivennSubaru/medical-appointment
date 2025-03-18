"use client"

import { sendSMSNotification } from '@/actions/appointment.actions'
import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
    const send = () => {
        sendSMSNotification("Test from Steven")
    }
  return (
    <Button onClick={send} className='cursor-pointer bg-white text-black'>
        Click me
    </Button>
  )
}

export default page