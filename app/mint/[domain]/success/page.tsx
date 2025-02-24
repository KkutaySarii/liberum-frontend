'use client'
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import NavbarMint from '@/components/NavbarMint'
import EditIcon from "@/assets/Edit_fill.svg"

const MintSuccessPage = () => {
  const params = useParams()
  const domain = params.domain as string
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleEditClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
    //   if (file.size > 2 * 1024 * 1024) {
    //     alert('Dosya boyutu 2MB\'dan küçük olmalıdır.')
    //     return
    //   }
      if (!file.type.startsWith('image/')) {
        alert('Lütfen bir resim dosyası seçin.')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className='w-full h-screen bg-dark overflow-hidden'>
      <NavbarMint />

      <main className="container max-w-5xl mx-auto mt-12">
        <div className='pt-32 text-center'> 
          <h1 className="text-5xl font-bold mb-6">Your New Blockspace</h1>
          <p className="text-gray-300 mb-16 text-lg mt-8">
            You can customize your blockspace view. Set a favicon!
          </p>

          <div 
            className="relative w-36 h-36 mx-auto mb-8 cursor-pointer group"
            onClick={handleEditClick}
          >
            <div className={`${!selectedImage ? "bg-primary" : "bg-none"} w-full h-full rounded-full flex items-center justify-center overflow-hidden transition-all duration-300`}>
              {selectedImage ? (
                <>
                  <Image 
                    src={selectedImage}
                    alt="Selected" 
                    fill
                    className="object-cover rounded-full"
                  />
                  <div className="absolute inset-0 bg-white bg-opacity-50 opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center rounded-full">
                    <Image 
                      src={EditIcon} 
                      alt="Edit" 
                      width={32} 
                      height={32} 
                      className="opacity-80"
                    />
                  </div>
                </>
              ) : (
                <Image 
                  src={EditIcon} 
                  alt="Edit" 
                  width={32} 
                  height={32} 
                  className="opacity-80"
                />
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <p className="text-3xl font-semibold mb-12">
            {domain}
          </p>

          <div className="flex justify-center gap-6">
            <Link 
              href={`/mint/${domain}/upload-html`} 
              className="px-6 py-3 bg-secondary rounded-lg font-semibold text-black hover:bg-opacity-90 transition-colors flex justify-items-center gap-2"
            >
                <p className='font-normal'> Next Step:</p>
             <p className='font-semibold'> Link Your Content</p>
            </Link>

            <Link 
              href={`/dashboard`}
              className="px-6 py-3 bg-white rounded-lg font-semibold text-black hover:bg-opacity-90 transition-colors"
            >
              Go To Your Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MintSuccessPage 