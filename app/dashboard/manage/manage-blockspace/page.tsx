"use client"
import React, { useEffect } from 'react'
import {useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import NavbarMint from '@/components/NavbarMint'
import Union from '@/assets/Union (1).svg'
// import EditIcon from "@/assets/Edit_fill.svg"
// import { useImageUpload } from '@/hooks/useImageUpload'
import { storage, StorageKeys } from '@/utils/storage'


const ManageBlockspacePage = () => {
  const router = useRouter()
  const selectedDomain = storage.get(StorageKeys.SELECTED_DOMAIN)
  const selectedFile = storage.get(StorageKeys.SELECTED_FILE)
  // const { selectedImage, fileInputRef, handleImageChange, handleEditClick } = useImageUpload(selectedBlockspace)
  const linkedContent = selectedDomain?.linkedContent
  const owner = selectedDomain?.owner
  const expiry = "26.04.2001" //TODOO contractten al


  const handleUnlink = () => {
    if (selectedFile) {
      //TODO: Unlink Content
      storage.set(StorageKeys.SELECTED_FILE, null)
    }
  }
  useEffect(() => {
    if (linkedContent) {
      storage.set(StorageKeys.SELECTED_FILE, linkedContent)
    }else{
      storage.set(StorageKeys.SELECTED_FILE, null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='w-full h-screen bg-dark overflow-hidden'>
    <NavbarMint />
    
    <main className="container max-w-3xl mx-auto mt-12 pb-20">
      <div className='pt-32 text-start'>
        <h1 className="text-5xl font-bold mb-8">Manage Your Blockspace</h1>
        
    
          <div className="flex items-center gap-3 mb-6">
            {/* <div 
              className="relative w-12 h-12 cursor-pointer group"
              onClick={handleEditClick}
            >
              <div className={`${!selectedImage ? "bg-primary" : ""} w-full h-full rounded-full flex items-center justify-center overflow-hidden`}>
                {selectedImage ? (
                  <Image 
                    src={selectedImage}
                    alt="Selected" 
                    fill
                    className="object-cover rounded-full"
                  />
                ) : (
                  <Image 
                    src={EditIcon} 
                    alt="Edit" 
                    width={20} 
                    height={20} 
                    className="opacity-80"
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full flex items-center justify-center">
                  <Image 
                    src={EditIcon} 
                    alt="Edit" 
                    width={20} 
                    height={20} 
                    className="opacity-80"
                  />
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div> */}
            <span className="text-2xl text-white">{selectedDomain?.name}</span>
          </div>

          <div className="mb-16 container max-w-lg mx-auto">
            <h2 className="text-2xl text-white mb-6 text-center font-semibold">Linked Content</h2>
            
            {linkedContent ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    {linkedContent.image ? (
                    <Image
                      src={linkedContent.image}
                      alt={linkedContent.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    ) : (
                      <Image
                        src={Union}
                        alt={linkedContent.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    )}
                    <span className="text-white text-lg">{linkedContent.name}</span>
                  </div>
                  <button 
                    className="px-4 py-1.5 bg-white text-black rounded-md hover:bg-opacity-90 transition-colors"
                    onClick={handleUnlink}
                  >
                    Unlink
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-400 mb-8">Currently, there is no linked content</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className='text-center'>
              <h2 className="text-2xl text-white mb-4">Owner</h2>
              <p className="text-gray-400 break-all">{owner}</p>
            </div>
            <div className='text-center flex items-end justify-center gap-2'>
            <div className='flex-col items-center justify-center gap-4'>
              <h2 className="text-2xl text-white mb-4">Expiry</h2>
                <p className="text-gray-400">{expiry}</p>
                </div>
                <button className="px-2 py-1 font-semibold text-xs bg-secondary text-black rounded hover:bg-opacity-90 transition-colors" onClick={() => router.push(`/mint/${selectedDomain?.name}`)}>
                  Extend
                </button>
         
            </div>
          </div>
   
          <div className="flex justify-center gap-4">
          {linkedContent && (
            <Link 
            href={`/`} //TODO: Visit Site
              className="w-1/3 px-6 py-3 mt-4 bg-secondary text-black rounded-lg hover:bg-opacity-90 transition-colors font-semibold flex items-center justify-center" 
            >
              Visit Site
            </Link>
            )}
            {!linkedContent && (
            <Link 
            href={`/dashboard/manage/select-content`}
              className="w-1/3 px-6 py-3 mt-4 bg-secondary text-black rounded-lg hover:bg-opacity-90 transition-colors font-semibold flex items-center justify-center"
            >
              Link Content
            </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default ManageBlockspacePage