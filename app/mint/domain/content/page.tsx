"use client"
import React from 'react'
import Image from 'next/image'

import NavbarMint from '@/components/NavbarMint'
import Union from '@/assets/Union (1).svg'
import { useRouter } from 'next/navigation'
import { useHtmlContract } from '@/hooks/useHtmlContract'
import { storage, StorageKeys } from '@/utils/storage'
const LinkPage = () => {
  const router = useRouter()
    const selectedDomain = storage.get(StorageKeys.SELECTED_DOMAIN)
    const selectedFile = storage.get(StorageKeys.SELECTED_FILE)
    const { callContractMethod } = useHtmlContract()
    const networkFee = 0.003

    const handleLink = async () => {
      try {
        if (!selectedDomain?.name) {
          throw new Error('Domain name is required')
        }
        if (!selectedFile?.name) {
          throw new Error('HTML content is required')
        }
  
        const tx = await callContractMethod(
          'linkDomain',
          //event'ten aldığımız page address'i
        )
        
        console.log('Upload transaction:', tx)
        router.push(`/mint/domain/content/success`)
      } catch (err) {
        console.error('Upload error:', err)
      }
    }

    const handleDoItLater = () => {
      storage.set(StorageKeys.SELECTED_DOMAIN, null)
      storage.set(StorageKeys.SELECTED_FILE, null)
      router.push(`/dashboard`)
    }

  return (
    <div className='w-full h-screen bg-dark overflow-hidden'>
    <NavbarMint />
    
    <main className="container max-w-3xl mx-auto mt-12 pb-20">
      <div className='pt-32 text-start'>
        <h1 className="text-5xl font-bold mb-8">Link with your blockspace</h1>
        
        <div className="flex items-center justify-between mb-12">
          <div className='flex items-center gap-4'>
            <div className="w-11 h-11 bg-primary rounded-full"></div>
            <span className="text-2xl">{selectedDomain?.name}</span>
          </div>
        </div>
<div className='max-w-lg mx-auto flex justify-between items-center'>
        <div className=" flex justify-center items-center gap-6 mb-8">
        <Image src={Union} alt="icon" width={120} height={120} />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-4xl underline">{selectedFile?.name}</h3>
            </div>
            <div className="text-gray-400 mb-1 text-xl">CA : <span className="underline">0x897asfda0fsa0af8as..</span></div>
            <div className="text-gray-400 text-xl">Linked with : N/A</div>
          </div>
        </div>
        </div>

        <div className="max-w-md mx-auto mt-2">
          <div className="flex justify-between items-center mb-4 text-gray-400">
            <span>Link Fee</span>
            <span className='text-[#82E14B]'>Free</span>
          </div>
          <div className="flex justify-between items-center mb-4 text-gray-400">
            <span>Est. Network Fee</span>
            <span>{networkFee} ETH</span>
          </div>
          <div className="flex justify-between items-center mb-8 pt-2">
            <span>Estimated Total</span>
            <span>{networkFee} ETH</span>
          </div>
  
        </div>
        <div className="flex justify-center gap-8 max-w-xl mx-auto">
            <button 
              className="w-full py-3 bg-secondary rounded-lg font-semibold text-black hover:bg-opacity-90 transition-colors text-center"
              onClick={() => {
                handleLink()
              }}
            >
              Link
            </button>
            <button 
              onClick={handleDoItLater}
              className="w-full py-3 bg-white rounded-lg font-semibold text-black hover:bg-opacity-90 transition-colors text-center"
            >
              Do It Later
            </button>
          </div>
      </div>
    </main>
  </div>
  )
}

export default LinkPage