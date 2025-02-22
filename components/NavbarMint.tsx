import Image from 'next/image'
import Link from 'next/link'

import Logo from "@/assets/logo.svg"


const NavbarMint = () => {
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
        <Link href="/install" className="text-white hover:text-primary font-semibold">
          Install Liberum
        </Link>
        <button className="px-4 py-2 bg-secondary rounded-lg hover:bg-opacity-90 font-semibold text-black">
          Connect Wallet
        </button>
      </div>
      </div>
    </nav>
  )
}

export default NavbarMint
