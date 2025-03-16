import clsx from 'clsx'
import React from 'react'

type StatCardProps = {
    type: "appointments" | "pending" | "cancelled",
    label: string,
    icon: React.ReactElement,
    count: number
}

const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  return (
    <div className={clsx('stat-card', {
        'bg-appointments': type === 'appointments',
        'bg-pending': type === 'pending',
        'bg-cancelled': type === 'cancelled'
    })}>
        <div className='flex items-center gap-4'>
            {icon}
            <h2 className='text-32-bold text-white'>{count}</h2>
        </div>

        <p className='text-14-regular'>{label}</p>
    </div>
  )
}

export default StatCard