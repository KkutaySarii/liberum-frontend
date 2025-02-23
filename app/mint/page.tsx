'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import NavbarMint from '@/components/NavbarMint'
import SearchIcon from "@/assets/Search_light.svg"
import Arrow from "@/assets/arrow.svg"
import Arrow2 from "@/assets/arrow2.svg"

const MintPage = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showDomainList, setShowDomainList] = useState(false);
  const [showAllDomains, setShowAllDomains] = useState(false);
  
  const domains = [
    { name: 'kere.lib', status: 'Available', bgColor: 'bg-primary' },
    { name: 'keremkaya.lib', status: 'Registered', bgColor: 'bg-secondary' },
    { name: 'keremkaya1532.lib', status: 'Available', bgColor: 'bg-secondary' },
    { name: 'blockchain.lib', status: 'Registered', bgColor: 'bg-primary' },
    { name: 'web3.lib', status: 'Available', bgColor: 'bg-secondary' },
    { name: 'crypto.lib', status: 'Registered', bgColor: 'bg-primary' },
    { name: 'nft.lib', status: 'Available', bgColor: 'bg-secondary' },
  ];

  const displayedDomains = showAllDomains ? domains : domains.slice(0, 3);

  const handleInputFocus = () => {
    setIsInputFocused(true);
    setTimeout(() => {
      setShowDomainList(true);
    }, 300);
  };

  const handleInputBlur = () => {
    setShowDomainList(false);
    setTimeout(() => {
      setIsInputFocused(false);
    }, 300);
  };

  return (
    <div className='w-full h-screen bg-dark overflow-hidden'>
      <NavbarMint/>

      <main className="container max-w-5xl mx-auto mt-12 overflow-hidden">
        <div className='pt-32 text-center'> 
          <h1 className="text-5xl font-bold mb-4">Mint Your Blockspace</h1>
          <p className={`text-white font-satoshi-light font-thin text-stroke-thin text-base mb-12 leading-relaxed tracking-wider transition-all duration-500 ${
            isInputFocused ? 'opacity-0' : ''
          }`}>
            Blockspace is your personal domain on the blockchain
            <br />
            fully decentralized, fully yours.
          </p>

          <div className={`relative max-w-xl mx-auto mb-16 transition-all duration-500 ${
            isInputFocused ? '-translate-y-20 z-40' : ''
          }`}>
            <input 
              type="text"
              placeholder="search for a name"
              className="w-full px-6 py-3 rounded-lg bg-white border border-light-white text-black placeholder:text-black placeholder:!font-thin placeholder:text-2xl placeholder:text-opacity-40 outline-none z-40"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            <Image src={SearchIcon} alt="Search" width={30} height={30} className='absolute right-4 top-1/2 -translate-y-1/2' />
          </div>

          <div className={`grid grid-cols-3 gap-10 relative transition-all duration-700 delay-100 ${
            isInputFocused ? '-translate-x-full opacity-0' : ''
          }`}>
            <div className="text-center mt-16 mr-24">
              <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">1</div>
              <h3 className="text-xl font-semibold mb-2">Mint Your Blockspace</h3>
              <p className="text-sm font-satoshi-light font-thin">Choose your unique name and secure it on the blockchain.
              True ownership starts here.</p>
            </div>
            <Image src={Arrow} alt="Arrow Right" width={120} height={120} className='absolute top-28 left-60 mb-4 ' />
            <div className="text-center mr-12 ml-12">
              <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">2</div>
              <h3 className="text-xl font-semibold mb-2">Host Your Website</h3>
              <p className="text-sm font-satoshi-light font-thin">Upload your HTML content to a smart contract, free from any central authority.</p>
            </div>
            <Image src={Arrow2} alt="Arrow Right" width={120} height={120} className='absolute top-16 right-72 mx-auto mb-4' />
            <div className="text-center mt-20 mr-10 ml-10">
              <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">3</div>
              <h3 className="text-xl font-semibold mb-2">Be Featured on Liberum</h3>
              <p className="text-sm font-satoshi-light font-thin">Your blockspace instantly appears on our homepage for everyone to explore and enjoy.</p>
            </div>
          </div>

          <div className={`absolute top-[45%] pb-20 right-1/2 w-2/5 translate-x-1/2 transition-all duration-500 max-h-[500px] overflow-y-auto noscrollbar ${
            isInputFocused ? 'block z-30' : 'hidden'
          } ${
            showDomainList 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-10 opacity-0'
          }`}>
            {displayedDomains.map((domain, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-4 mb-4 transition-all duration-300 delay-${index * 100}`}
                style={{ 
                  transitionDelay: `${index * 50}ms`,
                  opacity: showDomainList ? 1 : 0,
                  transform: showDomainList ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <div className={`w-12 h-12 ${domain.bgColor} rounded-full`}></div>
                {domain.status === 'Available' ? (
                  <Link 
                    href={`/mint/${domain.name}`} 
                    className="text-xl hover:text-primary transition-colors"
                  >
                    {domain.name}
                  </Link>
                ) : (
                  <span className="text-xl">{domain.name}</span>
                )}
                <span className={`${domain.status === 'Available' ? 'bg-green-500' : 'bg-blue-500'} px-3 py-1 rounded-full text-sm ml-auto`}>
                  {domain.status}
                </span>
              </div>
            ))}
            
            <div className='flex justify-between items-center mt-8'>
              <button 
                className="bg-secondary hover:bg-opacity-80 px-2 py-1 rounded-lg text-start text-black font-semibold text-sm"
                onClick={() => {
                  setShowAllDomains(!showAllDomains)
                }}
              >
                {showAllDomains ? 'Show Less...' : 'See More...'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MintPage;