'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useMetaMask } from '@/hooks/useMetaMask'
import type { RootState } from '@/store/store'
import Logo from "@/assets/logo.svg"

const NavbarInstall = () => {
    const { connect, isConnecting } = useMetaMask()
    const account = useSelector((state: RootState) => state.wallet.account)
  
    return (
      <nav className=" bg-dark fixed w-full top-0 z-50 h-16">
          <div className=' mx-auto flex items-center justify-between px-10 py-3'>
        <Link href="/" className="flex items-center">
          <Image 
            src={Logo}
            alt="Liberum Logo" 
            width={120} 
            height={32}
          />
        </Link>
  
        <div className="flex items-center gap-6">
        <Link href="/mint" className="text-white hover:text-primary font-semibold">
          Mint Your Blockspace
        </Link>
          <button 
            onClick={connect}
            disabled={isConnecting}
            className="px-4 py-2 bg-secondary rounded-lg hover:bg-opacity-90 font-semibold text-black"
          >
            {isConnecting ? (
              'Bağlanıyor...'
            ) : account ? (
              `${account.slice(0, 6)}...${account.slice(-4)}`
            ) : (
              'Connect Wallet'
            )}
          </button>
        </div>
        </div>
      </nav>
    )
  }
export default NavbarInstall

