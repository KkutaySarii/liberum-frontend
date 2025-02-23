'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useMetaMask } from '@/hooks/useMetaMask'
import type { RootState } from '@/store/store'
import Logo from "@/assets/logo.svg"
import Disconnect from "@/assets/disconnect.svg"

const NavbarInstall = () => {
  const { connect, disconnect, isConnecting, isOpen, setIsOpen } = useMetaMask()
  const account = useSelector((state: RootState) => state.wallet.account)

  return (
    <nav className="bg-dark fixed w-full top-0 z-50 h-16">
      <div className='mx-auto flex items-center justify-between px-10 py-3'>
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
          
          <div className="relative">
            {!account ? (
              <button 
                onClick={connect}
                disabled={isConnecting}
                className="px-4 py-2 bg-secondary rounded-lg  font-semibold text-black w-[165px]"
              >
                {isConnecting ? 'Bağlanıyor...' : 'Connect Wallet'}
              </button>
            ) : (
              <>
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="px-4 py-2 bg-secondary rounded-lg  font-semibold text-black w-[165px] flex items-center gap-2"
                >
                  {`${account.slice(0, 6)}...${account.slice(-4)}`}
                  <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {isOpen && (
                  <div className="absolute right-0 -mt-2 border-none w-[165px] bg-secondary border-x-1 border-black rounded-b-lg font-semibold">
                    <Link 
                      href="/dashboard" 
                      className="block px-4 py-2 text-sm text-black"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={disconnect}
                      className="w-full text-left px-4 py-2 text-sm text-black flex justify-between items-center gap-2 font-semibold"
                    >
                      Disconnect
                      <Image src={Disconnect} alt="Disconnect" width={12} height={12} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavbarInstall

