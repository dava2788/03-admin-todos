import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {

  redirect('/dashboard')
  return (
    <>
    <div className="text-5xl">HOLA MUNDO</div>
    </>
  )
}
