"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import Union from '@/assets/Union (1).svg'
import NavbarMint from '@/components/NavbarMint'
import ChangeModal from '@/components/ChangeModal'
import simpleIcon from '@/assets/Ellipse.svg'
import { storage, StorageKeys } from '@/utils/storage'
const SelectBlockspacePage = () => {
    const [openChangeModal, setOpenChangeModal] = useState(false)
    const [modalType, setModalType] = useState<'blockspace' | 'content'>('blockspace')

    const router = useRouter()
const selectedDomain = storage.get(StorageKeys.SELECTED_DOMAIN)
const selectedFile = storage.get(StorageKeys.SELECTED_FILE)
    const handleOpenModal = (type: 'blockspace' | 'content') => {
        setModalType(type)
        setOpenChangeModal(true)
    }

    return (
        <div className='w-full min-h-screen bg-dark overflow-hidden '>
            <NavbarMint />
            
            <main className="container max-w-5xl mx-auto mt-12">
                <div className='pt-32 text-center'> 
                    <h1 className="text-5xl font-bold mb-6">Select A Content</h1>
                    <p className="text-gray-300 mb-16 text-lg mt-8">You must select a content to proceed</p>
                    <div className="flex items-center justify-center gap-8 mb-16">

                        <div className="flex flex-col items-center">
                            {selectedDomain && selectedDomain ? (
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
                            <span className="text-white text-2xl mt-3">{selectedDomain === null ? <div className='font-thin'>Not selected</div> : <div className='font-normal underline'>{selectedDomain?.name}</div>}</span>
                            <button 
                                className="px-3 py-1 bg-white text-black rounded-md hover:bg-opacity-90 transition-colors mt-3 text-sm font-semibold" 
                                onClick={() => handleOpenModal('blockspace')}
                            >
                                Change
                            </button>
                        </div>

                        <div className="w-20 h-[4px] bg-white mt-[-20px] rounded-full"></div>

                        <div className="flex flex-col items-center ">
                            <div className="w-40 h-40 flex items-center justify-center mb-3">
                                <Image src={Union} alt="icon"  className='object-cover' />
                            </div>
                            <span className="text-white text-2xl">{selectedFile === null ? <div className='font-thin'>Not selected</div> : <div className='font-normal underline'>{selectedFile?.name}</div>}</span>
                            <button className="px-3 py-1 bg-white text-black rounded-md hover:bg-opacity-90 transition-colors text-sm font-semibold mt-3" onClick={() => handleOpenModal('content')}>
                                Change
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center gap-8 max-w-xl mx-auto">
                        <button 
                            disabled={selectedDomain === null || selectedFile === null}
                            onClick={() => selectedDomain && selectedFile && router.push(`/dashboard/link-blockspace`)} 
                            className="w-1/3 py-3 bg-secondary text-black rounded-lg hover:bg-opacity-90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Select
                        </button>

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

export default SelectBlockspacePage
