"use client"
import NavbarMint from '@/components/NavbarMint'
import { RootState } from '@/store/store'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import Union from '@/assets/Union (1).svg'
import ChangeModal from '@/components/ChangeModal'
import simpleIcon from '@/assets/Ellipse.svg'

const LinkBlockspacePage = () => {

    const { selectedBlockspace , selectedContent} = useSelector((state: RootState) => state.wallet)
    const networkFee = 0.0003
    const [openChangeModal, setOpenChangeModal] = useState(false)
    const [modalType, setModalType] = useState<'blockspace' | 'content'>('blockspace')

    const handleOpenModal = (type: 'blockspace' | 'content') => {
        setModalType(type)
        setOpenChangeModal(true)
    }
    return (
        <div className='w-full min-h-screen bg-dark overflow-hidden '>
      <NavbarMint />
      
      <main className="container max-w-5xl mx-auto mt-8">
        <div className='pt-24 text-center'> 
          <h1 className="text-5xl font-bold mb-6">Your Are Ready!</h1>
          <p className="text-gray-300 mb-6 text-lg mt-8">Once you link it, your content will be visible on your blockspace</p>

          <div className="flex items-center justify-center gap-8 mb-10">

            <div className="flex flex-col items-center">
            {selectedBlockspace && selectedBlockspace ? (
                                <div className="w-40 h-40 rounded-full overflow-hidden">
                                    <Image 
                                        src={simpleIcon} 
                                        alt="icon"  
                                        width={160}
                                        height={160}
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                            ) : (
                                <div className="w-40 h-40 bg-primary rounded-full"></div>
                            )}
              <span className="text-white underline text-2xl">{selectedBlockspace?.name}</span>
              <button 
                                className="px-3 py-1 bg-white text-black rounded-md hover:bg-opacity-90 transition-colors mt-3 text-sm font-semibold" 
                                onClick={() => handleOpenModal('blockspace')}
                            >
                                Change
                            </button>
            </div>

            <div className="w-20 h-[4px] bg-white mt-[-20px] rounded-full"></div>

            <div className="flex flex-col items-center ">
              <div className="w-40 h-40 flex items-center justify-center">
              <Image src={Union} alt="icon"  className='object-cover' />
              </div>
              <span className="text-white underline text-2xl">{selectedContent?.name}</span>
              <button className="px-3 py-1 bg-white text-black rounded-md hover:bg-opacity-90 transition-colors text-sm font-semibold mt-3" onClick={() => handleOpenModal('content')}>
                                Change
                            </button>
            </div>
          </div>
          <div className="max-w-md mx-auto">
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
            <Link 
              href={`/`} //TODOO
              className="w-1/3 py-3 bg-secondary text-black rounded-lg hover:bg-opacity-90 transition-colors font-semibold"
            >
             Link
            </Link>
          </div>
        </div>
      </main>
      <ChangeModal 
                isOpen={openChangeModal}
                onClose={() => setOpenChangeModal(false)}
                type={modalType}
        
      />
    </div>
    )
}

export default LinkBlockspacePage