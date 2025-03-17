"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { MoreHorizontal } from "lucide-react"
import StatusBadge from "../StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/lib/constant"
import Image from "next/image"
import AppointmentModal from "../AppointmentModal"
import { Appointment } from "@/types/model.types"


export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({row}) => <p className="text-14-medium">{row.index + 1}</p>
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({row}) => <p>{row.original.name}</p>
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({row}) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status}/>
      </div>
    )
  },
  {
    accessorKey: "schedule",
    header: "Rendez-vous",
    cell: ({row}) => (
      <div className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </div>
    )
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({row}) => {
      const doctor = Doctors.find((doc) => doc.name === row.original.primaryPhysician)

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image!}
            alt={doctor?.name!}
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">
            Dr. {doctor?.name}
          </p>
        </div>
      )
    }
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: {original: data} }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="programmer"
            patientId={data.patient}
            userId={data.userId}
            appointment={data}
          />
          <AppointmentModal
            type="annuler"
            patientId={data.patient}
            userId={data.userId}
            appointment={data}
          />
        </div>
      )
    },
  }
]
