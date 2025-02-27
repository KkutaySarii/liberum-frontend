"use client"
import React from 'react'

import { SearchResults, Content } from '@/types/walletAccount'
import Image from 'next/image'
import Union from '@/assets/Union (1).svg'
import StrokeUnion from '@/assets/StrokeUnion.svg'
import { storage, StorageKeys } from '@/utils/storage'
interface ChangeModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'blockspace' | 'content'
}

const ChangeModal = ({ isOpen, onClose, type }: ChangeModalProps) => {
  const sampleBlockspaces: SearchResults[] = [
    {
      name: "blockspace1",
      owner: "0x1234...",
      nft_id: "1",
      expire_date: "2025-01-01",
      visit_count: 0,
      linkedContractAddress: "",
      linkedContent: null
    },
    {
      name: "blockspace1",
      owner: "0x1234...",
      nft_id: "1",
      expire_date: "2025-01-01",
      visit_count: 0,
      linkedContractAddress: "",
      linkedContent: null
    },
    {
      name: "blockspace2",
      owner: "0x1234...",
      nft_id: "1",
      expire_date: "2025-01-01",
      visit_count: 0,
      linkedContractAddress: "",
      linkedContent: null
    },
    {
      name: "blockspace3",
      owner: "0x1234...",
      nft_id: "1",
      expire_date: "2025-01-01",
      visit_count: 0,
      linkedContractAddress: "",
      linkedContent: null
    },
   ]
   const sampleContents: Content[] = [
    {
      name: "content1",
      image: Union,
      linkedBlockspace: null,
      owner: "0x1234...",
      contractAddress: ""
    },
    {
      name: "content2",
      image: Union,
      linkedBlockspace: null,
      owner: "0x1234...",
      contractAddress: ""
    },
    {
      name: "content3",
      image: Union,
      linkedBlockspace: null,
      owner: "0x1234...",
      contractAddress: ""
    },
   ]


  const items = type === 'blockspace' ? sampleBlockspaces : sampleContents


  const handleSelect = (item: SearchResults | Content) => {
    if (type === 'blockspace') {
      storage.set(StorageKeys.SELECTED_DOMAIN, item as SearchResults)
    } else {
      storage.set(StorageKeys.SELECTED_FILE, item as Content)
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="bg-dark rounded-lg p-6 w-96"
        onClick={e => e.stopPropagation()}
      >
        <div className="space-y-4">
          {items.map((item, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-opacity-80 group"
              onClick={() => handleSelect(item)}
            >
              <div className="flex items-center gap-3">
                {type === 'blockspace' ? (
                  // item.image ? (
                  //   <Image 
                  //     src={item.image} 
                  //     alt={item.name} 
                  //     width={40}
                  //     height={40}
                  //     className="rounded-full transition-all group-hover:border-2 group-hover:border-white"
                  //   />
                  // ) : (
                    <div className="w-10 h-10 bg-primary rounded-full transition-all group-hover:border-2 group-hover:border-white"></div>
                  // )
                ) : (
                  <>
                  <Image 
                    src={Union} 
                    alt="Union" 
                    width={40} 
                    height={40} 
                    className="rounded-full transition-all block group-hover:hidden" 
                  />
                  <Image 
                    src={StrokeUnion} 
                    alt="Union" 
                    width={40} 
                    height={40} 
                    className="rounded-full transition-all hidden group-hover:block" 
                  />
                  </>
                )}
                <span className="text-white">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChangeModal