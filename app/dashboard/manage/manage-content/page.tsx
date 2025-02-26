"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import NavbarMint from '@/components/NavbarMint'
import Union from '@/assets/Union (1).svg'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { unlinkBlockspace } from '@/store/features/walletSlice'


const ManageContentPage = () => {
  const { selectedContent } = useSelector((state: RootState) => state.wallet)
  const linkedBlockspace = selectedContent?.linkedBlockspace
  const owner = selectedContent?.owner
  const contractAddress = selectedContent?.contractAddress
  const dispatch = useDispatch()

  useEffect(() => {
console.log(selectedContent)

  }, [selectedContent])

  const handleUnlink = () => {
    if (selectedContent) {
      dispatch(unlinkBlockspace(selectedContent.name))
    }
  }

  return (
    <div className='w-full h-screen bg-dark overflow-hidden'>
    <NavbarMint />
    
    <main className="container max-w-3xl mx-auto mt-12 pb-20">
      <div className='pt-32 text-start'>
        <h1 className="text-5xl font-bold mb-8">Manage Your Content</h1>
        
    
          <div className="flex items-center gap-3 mb-6">
          <Image src={Union} alt="icon" width={40} height={40} className='object-cover' />
            <span className="text-2xl text-white">{selectedContent?.name}</span>
          </div>

          <div className="mb-16 container max-w-lg mx-auto">
            <h2 className="text-2xl text-white mb-6 text-center font-semibold">Linked Blockspace</h2>
            
            {linkedBlockspace ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    {linkedBlockspace.image ? (
                    <Image
                                src={linkedBlockspace.image}
                      alt={linkedBlockspace.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    ) : (
                      <Image
                        src={Union}
                        alt={linkedBlockspace.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    )}
                    <span className="text-white text-lg">{linkedBlockspace.name}</span>
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
              <p className="text-center text-gray-400 mb-8">Currently, there is no linked blockspace</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className='text-center'>
              <h2 className="text-2xl text-white mb-4">Owner</h2>
              <p className="text-gray-400 break-all">{owner}</p>
            </div>
            <div className='text-center flex items-end justify-center gap-2'>
            <div className='flex-col items-center justify-center gap-4'>
              <h2 className="text-2xl text-white mb-4">Contract Address</h2>
                <p className="text-gray-400">{contractAddress}</p>
                </div>
         
            </div>
          </div>
   
          <div className="flex justify-center gap-4">
          {linkedBlockspace && (
            <Link 
            href={`/`} //TODO: Visit Site
              className="w-1/3 px-6 py-3 mt-4 bg-secondary text-black rounded-lg hover:bg-opacity-90 transition-colors font-semibold flex items-center justify-center" 
            >
              Visit Site
            </Link>
            )}
            {!linkedBlockspace && (
            <Link 
            href={`/dashboard/manage/select-blockspace`}
              className="w-1/3 px-6 py-3 mt-4 bg-secondary text-black rounded-lg hover:bg-opacity-90 transition-colors font-semibold flex items-center justify-center"
            >
              Link Blockspace
            </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default ManageContentPage