"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import Union from '@/assets/Union (1).svg'
import NavbarMint from '@/components/NavbarMint'

const LinkSuccessPage = () => {
  const params = useParams()
  const domain = params.domain as string
  const fileName = params.fileName as string

  return (
    <div className='w-full min-h-screen bg-dark overflow-hidden '>
      <NavbarMint />
      
      <main className="container max-w-5xl mx-auto mt-12">
        <div className='pt-32 text-center'> 
          <h1 className="text-5xl font-bold mb-6">Your Are Ready!</h1>
          <p className="text-gray-300 mb-16 text-lg mt-8">Your content is now live on your blockspace.</p>

          <div className="flex items-center justify-center gap-8 mb-16">

            <div className="flex flex-col items-center">
              <div className="w-40 h-40 bg-primary rounded-full mb-3"></div>
              <span className="text-white underline text-2xl">{domain}</span>
            </div>

            <div className="w-20 h-[4px] bg-white mt-[-20px] rounded-full"></div>

            <div className="flex flex-col items-center ">
              <div className="w-40 h-40 flex items-center justify-center">
              <Image src={Union} alt="icon"  className='object-cover' />
              </div>
              <span className="text-white underline text-2xl">{fileName}</span>
            </div>
          </div>

          <div className="flex justify-center gap-8 max-w-xl mx-auto">
            <Link 
              href={`/visit/${domain}/${fileName}`}
              className="w-1/2 py-3 bg-secondary text-black rounded-lg hover:bg-opacity-90 transition-colors font-semibold"
            >
              Visit Site
            </Link>
            <Link 
              href={`/dashboard`}
              className="w-1/2 py-3 bg-white text-black rounded-lg hover:bg-opacity-90 transition-colors font-semibold"
            >
              Go To Your Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LinkSuccessPage