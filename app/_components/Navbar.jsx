import { SignedIn,  SignedOut,  UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'


export default function Navbar() {
  return (
    <>
      <nav className='flex justify-between items-center px-8 py-4  text-[#db8cb8] shadow-lg'>
        <h1 className="font-bold text2xl"><Image src="/logo.png" alt="Story Kids" width={100} height={30} /></h1>

        <div className="flex gap-6 item-center font-bold text-[#db8cb8]">
            <Link href="/Home" >Home</Link>
            <Link href="/explore-stories">Explore Stories</Link>
            <Link href="/contact">Contact</Link>
            <SignedIn>
                <UserButton/>
                <Link href="/dashboard" className='text-[#db8cb8] px-4 py-2 rounded-md bg-white shadow font-bold p-3'>Dashboard</Link>
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" className='text-[#db8cb8] px-4 py-2 rounded-md bg-white shadow font-bold p-3'>Get Started </Link>
            </SignedOut>
        </div>
      </nav>
    </>
  )
}
