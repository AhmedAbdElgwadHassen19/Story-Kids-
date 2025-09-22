import { SignedIn,  SignedOut,  UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'


export default function Navbar() {
  return (
    <>
      <div className="shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">

        
        <h1 className="font-bold text2xl"><Image src="/logo.png" alt="Story Kids" width={100} height={30} /></h1>

          <div className="flex gap-6 item-center font-bold text-[#db8cb8]">
              <SignedIn>
                  <UserButton/>
                  <Link href="/dashboard" className='text-[#db8cb8] px-4 py-2 rounded-md bg-white shadow font-bold p-3'>Dashboard</Link>
              </SignedIn>
              <SignedOut>
                <Link href="/sign-in" className='text-[#db8cb8] bg-[#db8cb8] px-4 py-2 rounded-md bg-white shadow font-bold p-3'>Get Started </Link>
              </SignedOut>
          </div>
        </div>
      </div>
    </>
  )
}
