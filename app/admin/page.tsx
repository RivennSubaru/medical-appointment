import { getRecentAppointmentList } from '@/actions/appointment.actions'
import StatCard from '@/components/StatCard'
import {columns} from '@/components/table/columns'
import {DataTable} from '@/components/table/DataTable'
import { CalendarCheck2, Hourglass, TriangleAlert } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Admin = async() => {
  const appointments = {
    totalCount: 2,
    scheduledCounts: 0,
    pendingCounts: 2,
    cancelledCount: 0,
    documents: [
      {
        "userId": "3",
        "patient": 1,
        "name":"Rakotoarivelo Andoniaina",
        "primaryPhysician": "David Livingston",
        "reason": "Dent",
        "note": "Dokotera vehivavy s'il vous plait",
        "schedule": "2025-03-04T00:50:01.000Z",
        "status": "en attente",
        "id": 1
      },
      {
        "userId": "3",
        "patient": 1,
        "name":"Rakotoarivelo Andoniaina",
        "primaryPhysician": "Leila Cameron",
        "reason": "marary nify",
        "note": "aprem satria mbola anao algrebre",
        "schedule": "2025-03-16T00:55:30.288Z",
        "status": "en attente",
        "id": 2
      }
    ]
}

  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
      <header className='admin-header'>
        <Link href="/">
          logo
        </Link>

        <p className='text-16-semibold'>Admin Dashboard</p>
      </header>

      <main className='admin-main'>
        <section className='w-full space-y-4'>
          <h1 className='header'>Bienvenu 👋</h1>
          <p className='text-dark-700'>Commencer la journé en gérant de nouveau rendez-vous</p>
        </section>

        <section className='admin-stat'>
          <StatCard
            type="appointments"
            count={appointments.scheduledCounts}
            label="Rendez-vous programmés"
            icon={<CalendarCheck2 size={32} color='yellow'/>}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCounts}
            label="Rendez-vous en attente"
            icon={<Hourglass size={32} color='blue'/>}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Rendez-vous annulés"
            icon={<TriangleAlert size={32} color='red'/>}
          />
        </section>

        <DataTable columns={columns} data={appointments.documents}/>
      </main>
    </div>
  )
}

export default Admin