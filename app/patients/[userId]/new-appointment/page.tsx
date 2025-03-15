import AppointmentForm from "@/components/AppointmentForm";
import PatientForm from "@/components/PatientForm";
import Image from "next/image";
import Link from "next/link";

export default function NewAppointment() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <span className="mb-12 h-10 w-fit">Logo</span>

          <AppointmentForm/>

          <p className="text-dark-600 xl:text-left justify-items-end">
            © copyright
          </p>
        </div>
      </section>

      <Image 
        src="/assets/images/appointment-img.png" 
        alt="appointment" 
        width={1000} height={1000} 
        className="side-img w-[390px] bg-bottom rounded-s-2xl"
      />
    </div>
  );
}
