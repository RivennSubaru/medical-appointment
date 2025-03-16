import StatCard from '@/components/StatCard'
import { CalendarCheck2, Hourglass, TriangleAlert } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Admin = () => {
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
            count={5}
            label="Rendez-vous programmés"
            icon={<CalendarCheck2 size={32} color='yellow'/>}
          />
          <StatCard
            type="pending"
            count={10}
            label="Rendez-vous en attente"
            icon={<Hourglass size={32} color='blue'/>}
          />
          <StatCard
            type="cancelled"
            count={2}
            label="Rendez-vous annulés"
            icon={<TriangleAlert size={32} color='red'/>}
          />
        </section>
      </main>
    </div>
  )
}

export default Admin