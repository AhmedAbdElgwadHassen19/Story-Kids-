import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function LandingPage() {
  return (
    <section className='flex flex-col-reverse lg:flex-row items-center justify-between px-10 lg:px-32 py-16 bg-[#efd5e2] mt-5'>
        <div className="max-w-lg space-y-6 ">
            <h1 className="text-4xl font-extrabold text-[#c9749d]">Generate Your Favourite Story With The Power of Ai</h1>

            <p className="text-gray-600">
                Generate unique and personalized kids Stories powered by Ai MKE STORY TIME Magical and exciting for your child
            </p>
            <Link className="bg-[#c9749d] px-6 py-3 hover:bg-[#db8cb8] transition" href="/">Create Your Story</Link>
        </div>
        <div className="relative w-full h-[300px]">
                <Image src="/hero.png" alt="hero" fill className="object-contain" />
            </div>
    </section>
  )
}
