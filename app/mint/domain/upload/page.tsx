'use client'
import NavbarMint from '@/components/NavbarMint'
import {useRouter} from 'next/navigation'
import React from 'react'

const UploadPage = () => {
  const router = useRouter()
  return (
    <div className='w-full h-screen bg-dark overflow-hidden'>
    <NavbarMint />

    <main className="container max-w-xl mx-auto mt-12">
      <div className='pt-32 text-center'> 

              <h1 className="text-4xl mb-12 font-bold  text-start">Link Content To Your Blockspace</h1>
              <div className="flex flex-col justify-center gap-8 max-w-md mx-auto">
            <button 
            //   onClick={}   kereme sor 
              className="w-full py-3 bg-secondary rounded-lg font-semibold text-black hover:bg-opacity-90 transition-colors text-center"
            >
            Select Content
            </button>
            <span className='text-gray-300 text-center'>OR</span>
            <button 
              className="w-full py-3 bg-white rounded-lg font-semibold text-black hover:bg-opacity-90 transition-colors text-center"
              onClick={() => router.push(`/mint/domain/upload/upload-html`)}
            >
           Upload New Content
            </button>
          </div>  
 


      </div>
    </main>
  </div>
  )
}

export default UploadPage