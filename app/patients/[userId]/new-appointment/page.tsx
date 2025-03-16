import { getPatientByUserId } from "@/actions/patient.actions";
import AppointmentForm from "@/components/AppointmentForm";
import PatientForm from "@/components/PatientForm";
import Image from "next/image";
import Link from "next/link";

export default async function NewAppointment({ params }: SearchParamProps) {
  const {userId} = await params
  const patient = await getPatientByUserId(userId)

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <span className="mb-12 h-10 w-fit">Logo</span>

          <AppointmentForm
            userId={userId}
            patientId={patient.id}
            type="create"  
          />

          <p className="copyright mt-10 py-12">
            © copyright
          </p>
        </div>
      </section>

      <Image 
        src="/assets/images/appointment-img.png" 
        alt="appointment" 
        width={1000} height={1000} 
        className="side-img w-[390px] bg-bottom"
      />
    </div>
  );
}
