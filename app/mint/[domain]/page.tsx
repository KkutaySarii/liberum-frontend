'use client'
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import NavbarMint from '@/components/NavbarMint'

const MintDomainPage = () => {
  const params = useParams()
  const domain = params.domain as string
  const [years, setYears] = useState(1)
  
  const pricePerYear = 0.0019
  const networkFee = 0.0003
  
  const calculateTotal = () => {
    const registrationFee = pricePerYear * years
    return {
      registration: registrationFee.toFixed(4),
      network: networkFee.toFixed(4),
      total: (registrationFee + networkFee).toFixed(4)
    }
  }

  const handleIncrement = () => {
    if (years < 10) setYears(prev => prev + 1)
  }

  const handleDecrement = () => {
    if (years > 1) setYears(prev => prev - 1)
  }

  const prices = calculateTotal()

  return (
    <div className='w-full h-screen bg-dark overflow-hidden'>
      <NavbarMint />
      
      <main className="container max-w-3xl mx-auto mt-12 pb-20">
        <div className='pt-32 text-start'>
          <h1 className="text-5xl font-bold mb-8">Mint Your Blockspace</h1>
          
          <div className="flex items-center justify-between mb-12">
            <div className='flex items-center justify-center gap-4'>
            <div className="w-11 h-11 bg-primary rounded-full"></div>
            <span className="text-2xl">{domain}</span>
          </div>
          </div>

          <div className="max-w-md mx-auto flex justify-between items-center gap-8 mb-20">
            <button 
              onClick={handleDecrement}
              className="w-12 h-12 bg-[#222222] hover:bg-[#333333] rounded-lg flex items-center justify-center text-2xl font-bold transition-colors"
              disabled={years <= 1}
            >
              -
            </button>
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">{years} Year{years > 1 ? 's' : ''}</div>
            </div>
            <button 
              onClick={handleIncrement}
              className="w-12 h-12 bg-primary hover:bg-primary/90 rounded-lg flex items-center justify-center text-2xl font-bold transition-colors disabled:opacity-50"
              disabled={years >= 10}
            >
              +
            </button>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-4 text-gray-400">
              <span >Registration Period: {years} Year{years > 1 ? 's' : ''}</span>
              <span>{prices.registration} ETH</span>
            </div>
            <div className="flex justify-between items-center mb-4 text-gray-400">
              <span className="text-gray-400">Est. Network Fee</span>
              <span>{prices.network} ETH</span>
            </div>
            <div className="flex justify-between items-center mb-8 pt-4 border-t border-gray-800">
              <span>Estimated Total</span>
              <span>{prices.total} ETH</span>
            </div>
        <div className='w-full flex justify-center items-center'>
            <button className="w-1/2 bg-primary hover:bg-primary/90 text-black font-semibold py-3 px-6 rounded-lg transition-colors">
              Connect Wallet
            </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MintDomainPage 