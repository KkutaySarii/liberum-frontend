import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

import Vector from "@/assets/Vectorr.svg";
import Vector2 from "@/assets/Vector2.svg";
import GoogleIcon from "@/assets/Google Chrome.svg";
import ExtensionIcon from "@/assets/Extension.svg";
import NavbarInstall from '@/components/NavbarInstall';

const InstallPage = () => {
  return (
    <div className='w-full h-screen bg-dark '>
    <NavbarInstall />
    
    <main className="container max-w-4xl mx-auto mt-12 overflow-y-auto noscrollbar">
        <div className='pt-20 w-full justify-center items-center'> 
          <h1 className="text-4xl font-bold mb-6 text-center">       Install Liberum for your browser</h1>
      
      <p className="text-center text-white font-satoshi-light font-thin text-stroke-thin text-sm mb-6 leading-relaxed tracking-wider">
        Explore .lib domains—your gateway to the decentralized web.
      </p>

      <div className="relative w-full max-w-3xl mx-auto flex justify-center items-center mb-16">
        <Image 
          src={Vector}
          alt="Left Arrow"
          width={60}
          height={60}
          className="absolute left-0 translate-x-1/2"
        />
        <div className='w-1/3 justify-center items-center'>
          <Image 
          src={ExtensionIcon}
          alt="Extension"
          width={181}
          height={235}
          className="w-full justify-center items-center"
        />
        </div>
        <Image 
          src={Vector2}
          alt="Right Arrow"
          width={80}
          height={80}
          className="absolute right-0 translate-x-1/2"
        />
      </div>
      <div className='absolute bottom-[88px] max-w-4xl mx-auto bg-[#141414] w-full h-[100px] rounded-2xl flex justify-center items-center'> 

      <Link 
        href="https://chrome.google.com/webstore"
        className="flex items-center justify-center mt-20 gap-2 text-base bg-primary text-black px-2 py-2 rounded-lg mb-16 hover:bg-primary/90 transition-colors"
      >
        <Image 
          src={GoogleIcon}
          alt="Chrome"
          width={20}
          height={20}
        />
        Install Liberum for Chrome
      </Link>
      </div>

      <div className="max-w-2xl mx-auto mt-28 font-satoshi-light font-thin text-stroke-thin text-base mb-6 leading-relaxed tracking-wider text-center">
        <p className="text-base">
          Install the Liberum extension to seamlessly browse <span className="text-primary">.lib</span> domains. 
        
        </p>
        <p className="text-base ">
        Liberum automatically detects .lib addresses in your browsers address bar
        </p>
        <p className="text-base mb-12">  and fetches the corresponding site directly from the blockchain.</p>

        <p className="text-lg ">
          Giving you a secure, censorship-resistant way to explore the
        </p>
        <p className="text-lg mb-6">
decentralized web.
        </p>
      </div>
    </div>
    </main>
    </div>
  )
}

export default InstallPage;