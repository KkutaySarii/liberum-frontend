import Image from 'next/image'
import Link from 'next/link'

import Logo from "@/assets/logo.svg"
import SearchIcon from "@/assets/Search_light.svg"


const NavbarHome = () => {
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

      <div className="flex-1 max-w-lg mx-4 relative">
        <input 
          type="text"
          placeholder="mammothon"
          className="w-full px-6 py-2 bg-light rounded-lg text-black border border-light-white focus:outline-none placeholder:text-black"
        />
        <Image src={SearchIcon} alt="Search" width={24} height={24} className='absolute right-4 top-1/2 -translate-y-1/2' />
      </div>

      <div className="flex items-center gap-6">
        <Link href="/install" className="text-white hover:text-primary font-semibold">
          Install Liberum
        </Link>
        <Link href="/mint" className="text-white hover:text-primary font-semibold">
          Mint Your Blockspace
        </Link>
        <button className="px-4 py-2 bg-secondary rounded-lg hover:bg-opacity-90 font-semibold text-black">
          Connect Wallet
        </button>
      </div>
      </div>
    </nav>
  )
}

export default NavbarHome
