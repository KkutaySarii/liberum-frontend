"use client"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { setSelectedBlockspace, setSelectedContent } from '@/store/features/walletSlice'
import { SearchResults, Content } from '@/types/walletAccount'
import Image from 'next/image'
import Union from '@/assets/Union (1).svg'

interface ChangeModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'blockspace' | 'content'
}

const ChangeModal = ({ isOpen, onClose, type }: ChangeModalProps) => {
  const dispatch = useDispatch()
  const { blockspaces, contents } = useSelector((state: RootState) => state.wallet)

  const items = type === 'blockspace' ? blockspaces : contents


  const handleSelect = (item: SearchResults | Content) => {
    if (type === 'blockspace') {
      dispatch(setSelectedBlockspace(item as SearchResults))
    } else {
      dispatch(setSelectedContent(item as Content))
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
                  <Image 
                    src={Union} 
                    alt="Union" 
                    width={40} 
                    height={40} 
                    className="rounded-full transition-all group-hover:border-2 group-hover:border-white" 
                  />
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