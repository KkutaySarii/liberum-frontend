"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { AiFillAlert } from "react-icons/ai";
import { FaDownload } from "react-icons/fa6";

import Vector from "@/assets/Vectorr.svg";
import Vector2 from "@/assets/Vector2.svg";
import GoogleIcon from "@/assets/Google Chrome.svg";
import ExtensionIcon from "@/assets/Extension (1).svg";
import NavbarInstall from "@/components/NavbarInstall";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const InstallPage = () => {
  const router = useRouter();
  return (
    <div className="w-full h-screen bg-dark">
      <NavbarInstall />
      <div
        className="fixed top-40 left-24 cursor-pointer text-white "
        onClick={() => router.back()}
      >
        <IoMdArrowRoundBack className="w-8 h-8" />
      </div>
      <main className="container max-w-4xl mx-auto mt-12 overflow-y-auto noscrollbar">
        <div className="pt-20 w-full justify-center items-center">
          <h1 className="text-4xl font-bold mb-6 text-center">
            {" "}
            Install Liberum for your browser
          </h1>

          <p className="text-center text-white font-satoshi-light font-thin text-stroke-thin text-sm mb-6 leading-relaxed tracking-wider">
            Explore .lib domains—your gateway to the decentralized web.
          </p>

          <div className="relative w-full max-w-3xl mx-auto flex justify-center items-center z-0 ">
            <Image
              src={Vector}
              alt="Left Arrow"
              width={60}
              height={60}
              className="absolute left-0 translate-x-1/2"
            />
            <div className="w-1/3 justify-center items-center">
              <Image
                src={ExtensionIcon}
                alt="Extension"
                width={181}
                height={235}
                className="w-full justify-center items-center z-20 overflow-hidden "
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
          <div className="max-w-4xl mx-auto bg-[#141414] w-full h-[100px] rounded-2xl flex justify-center items-center">
            <div className="flex cursor-default items-center justify-center mt-20 gap-2 text-base bg-primary text-black px-2 py-2 rounded-lg mb-16 hover:bg-primary/90 transition-colors">
              <Image src={GoogleIcon} alt="Chrome" width={20} height={20} />
              Install Liberum for Chrome
            </div>
          </div>

          <div className="max-w-2xl mx-auto mt-6 font-satoshi-light font-thin text-stroke-thin text-base mb-6 leading-relaxed tracking-wider text-center">
            <p className="md:text-base text-sm">
              Install the Liberum extension to seamlessly browse{" "}
              <span className="text-primary">.lib</span> domains.
            </p>
            <p className="md:text-base text-sm ">
              Liberum automatically detects .lib addresses in your browsers
              address bar
            </p>
            <p className="md:text-base text-sm mb-12">
              {" "}
              and fetches the corresponding site directly from the blockchain.
            </p>

            <p className="md:text-lg text-base ">
              Giving you a secure, censorship-resistant way to explore the
            </p>
            <p className="md:text-lg text-base mb-6">decentralized web.</p>
          </div>
          <div className="max-w-3xl mx-auto mt-12 mb-16 bg-[#1A1A1A] border border-yellow-600/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <AiFillAlert className="text-yellow-500 h-6 w-6 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-yellow-500 font-medium text-lg mb-2">
                  Chrome Web Store Notice
                </h3>
                <p className="text-white/80 mb-2">
                  The Liberum extension is not currently active on the Chrome
                  Web Store. To install the extension, please download it
                  directly using the button below and follow these instructions:
                </p>
                <ol className="list-decimal list-inside text-white/80 space-y-2 ml-1 mb-4">
                  <li>Download the extension using the button below</li>
                  <li>
                    Open Chrome and navigate to{" "}
                    <code className="bg-[#242424] px-1.5 py-0.5 rounded text-xs">
                      chrome://extensions
                    </code>
                  </li>
                  <li>
                    Enable &quot;Developer mode&quot; by toggling the switch in
                    the top-right corner
                  </li>
                  <li>Click &quot;Load unpacked&quot; button that appears</li>
                  <li>
                    Select the folder containing the extracted extension files
                  </li>
                  <li>
                    The Liberum extension should now be installed and ready to
                    use
                  </li>
                </ol>
                <Link
                  target="_blank"
                  href="/download/liberum-extension.zip"
                  className="inline-flex items-center gap-2 bg-[#242424] hover:bg-[#2A2A2A] text-white px-4 py-2 rounded-md transition-colors"
                >
                  <FaDownload className="h-4 w-4" />
                  Download Extension
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstallPage;
