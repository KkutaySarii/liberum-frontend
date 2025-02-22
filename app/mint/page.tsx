import React from 'react'
import Image from 'next/image'

import NavbarMint from '@/components/NavbarMint'
import SearchIcon from "@/assets/Search_light.svg"
import Arrow from "@/assets/arrow.svg"
import Arrow2 from "@/assets/arrow2.svg"

const MintPage = () => {
  return (
    <div className='w-full h-screen overflow-hidden bg-dark'>
    <NavbarMint/>

      <main className="container max-w-5xl mx-auto mt-12">
        <div className=' pt-32 text-center '> 
        <h1 className="text-5xl font-bold mb-4 ">Mint Your Blockspace</h1>
        <p className="text-white font-satoshi-light font-thin text-stroke-thin text-base mb-12 leading-relaxed tracking-wider">
          Blockspace is your personal domain on the blockchain
          <br />
          fully decentralized, fully yours.
        </p>

        <div className="relative max-w-xl mx-auto mb-16">
          <input 
            type="text"
            placeholder="search for a name"
            className="w-full px-6 py-3 rounded-lg bg-light border border-light-white text-black placeholder:text-black placeholder:!font-thin placeholder:text-2xl placeholder:text-opacity-40"
          />
         <Image src={SearchIcon} alt="Search" width={30} height={30} className='absolute right-4 top-1/2 -translate-y-1/2' />
        </div>

        <div className="grid grid-cols-3 gap-10 relative">
          <div className="text-center mt-16 mr-24">
            <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">1</div>
            <h3 className="text-xl font-semibold mb-2">Mint Your Blockspace</h3>
            <p className="text-sm font-satoshi-light font-thin">Choose your unique name and secure it on the blockchain. True ownership starts here.</p>
          </div>
          <Image src={Arrow} alt="Arrow Right" width={120} height={120} className='absolute top-28 left-60 mb-4 ' />
          <div className="text-center mr-8 ml-8">
            <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">2</div>
            <h3 className="text-xl font-semibold mb-2">Host Your Website</h3>
            <p className="text-sm font-satoshi-light font-thin">Upload your HTML content to a smart contract, free from any central authority.</p>
          </div>
          <Image src={Arrow2} alt="Arrow Right" width={120} height={120} className='absolute top-16 right-72 mx-auto mb-4' />
          <div className="text-center mt-20 mr-16">
            <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">3</div>
            <h3 className="text-xl font-semibold mb-2">Be Featured on Liberum</h3>
            <p className="text-sm font-satoshi-light font-thin">Your blockspace instantly appears on our homepage for everyone to explore and enjoy.</p>
          </div>
        </div>
        </div>
      </main>
    </div>
  )
}

export default MintPage;