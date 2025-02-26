'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import NavbarMint from '@/components/NavbarMint'
import { useSelector } from 'react-redux'
import { useMetaMask } from '@/hooks/useMetaMask'
import { useContract } from '@/hooks/useContract'
import { ethers } from 'ethers'
import type { RootState } from '@/store/store'

const MintDomainPage = () => {
  const router = useRouter()
  const params = useParams()
  const domain = Array.isArray(params.domain) ? params.domain[0] : params.domain

  const [years, setYears] = useState(1)
  const [prices, setPrices] = useState({
    registration: '0',
    network: '0',
    total: '0'
  })

  const { connect, isConnecting } = useMetaMask()
  const { contract, callContractMethod, provider } = useContract()
  const account = useSelector((state: RootState) => state.wallet.account)
  
  const handleIncrement = () => {
    if (years < 100) setYears(prev => prev + 1)
  }

  const handleDecrement = () => {
    if (years > 1) setYears(prev => prev - 1)
  }


  useEffect(() => {
  
    const fetchPrices = async () => {
      console.log({contract});
      console.log({provider});
      if (!contract || !provider) return;
      
      try {
        console.log('girdi')
        const yearsInSeconds = yearsToSeconds(years);
        const estimateGas = await contract.mintDomain.estimateGas(domain, yearsInSeconds)

        const networkFee = await provider.getFeeData()
        if (!networkFee?.gasPrice) return;

        const estimatedGasPrice = networkFee.gasPrice * estimateGas

        console.log(ethers.formatEther(estimatedGasPrice))

        //TODOO: network + registration = total
        setPrices({
          registration: ethers.formatEther(0),
          network: ethers.formatEther(estimatedGasPrice),
          total: ethers.formatEther( estimatedGasPrice)
        })
      } catch (err) {
        console.error('Error fetching prices:', err)
      }
    }

    fetchPrices()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, years])

  const yearsToSeconds = (years: number) => {
    return years * 365 * 24 * 60 * 60;
  };

  const handleButtonClick = async () => {
    if (!account) {
      await connect()
    } else {
      await handleMint()
    }
  }

  const handleMint = async () => {
    try {
      if (!domain) {
        throw new Error('Domain name is required');
      }

      const yearsInSeconds = yearsToSeconds(years);
      
      const tx = await callContractMethod(
        'mintDomain',
        domain,
        yearsInSeconds,
        { value: ethers.parseEther(prices.total) }
      );
      
      console.log('Mint transaction:', tx);
      router.push(`/mint/${domain}/success`);
    } catch (err) {
      console.error('Mint error:', err);
    }
  };

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

          <div className="max-w-md mx-auto flex justify-between items-center gap-8 mb-16">
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
              disabled={years >= 100}
            >
              +
            </button>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-4 text-gray-400">
              <span>Registration Period: {years} Year{years > 1 ? 's' : ''}</span>
              <span>{prices.registration} ETH</span>
            </div>
            <div className="flex justify-between items-center mb-4 text-gray-400">
              <span>Est. Network Fee</span>
              <span>{prices.network} ETH</span>
            </div>
            <div className="flex justify-between items-center mb-8 pt-2">
              <span>Estimated Total</span>
              <span>{prices.total} ETH</span>
            </div>
            <div className='w-full flex justify-center items-center'>
              <button 
                onClick={handleButtonClick}
                disabled={isConnecting}
                className="w-1/2 bg-secondary hover:bg-secondary/90 text-black font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
              >
                {isConnecting ? (
                  'Connecting...'
                ) : account ? (
                  'Mint'
                ) : (
                  'Connect Wallet'
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MintDomainPage 