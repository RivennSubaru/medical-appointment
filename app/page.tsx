import PasskeyModal from "@/components/PasskeyModal";
import PatientForm from "@/components/PatientForm";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const { admin } = await searchParams

  const isAdmin = admin === "true"
  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && (
        <PasskeyModal/>
      )}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[456px]">
          <span className="mb-12 h-10 w-fit">Logo</span>

          <PatientForm/>

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="text-dark-600 xl:text-left justify-items-end">
              © copyright
            </p>
            <Link href="/?admin=true" className="text-green-500">Admin</Link>
          </div>
        </div>
      </section>

      <Image 
        src="/assets/images/onboarding-img.png" alt="onboarding img" 
        width={1000} height={1000} 
        className="side-img w-[50%] rounded-s-2xl"/>
    </div>
  );
}
