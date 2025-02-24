"use client"
import React from 'react'

interface ChangeModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (domain: string) => void
  domains: string[]
}

const ChangeModal = ({ isOpen, onClose, onSelect, domains }: ChangeModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#121212] rounded-2xl p-6 w-full max-w-md border border-gray-800">

        <div className="space-y-4">
          {domains.map((domain, index) => (
            <button
              key={index}
              onClick={() => {
                onSelect(domain)
                onClose()
              }}
              className="w-full flex items-center gap-4 p-4 hover:bg-[#1A1A1A] rounded-lg transition-colors group"
            >
              <div className="w-10 h-10 bg-primary rounded-full transition-all group-hover:border-2 group-hover:border-white"></div>
              <span className="text-white text-lg">{domain}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChangeModal