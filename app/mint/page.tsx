"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import NavbarMint from "@/components/NavbarMint";
import SearchIcon from "@/assets/Search_light.svg";
import Arrow from "@/assets/arrow.svg";
import Arrow2 from "@/assets/arrow2.svg";

import { useSocket } from "@/hooks/useSocket";
import { SearchResults } from "@/types/walletAccount";
import { storage, StorageKeys } from "@/utils/storage";

const MintPage = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showDomainList, setShowDomainList] = useState(false);
  const [showAllDomains, setShowAllDomains] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    socket = null,
    isConnected = false,
    connectionError,
  } = useSocket() || {};
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);
  const displayedResults = showAllDomains
    ? searchResults
    : searchResults.slice(0, 3);

  const router = useRouter();

  useEffect(() => {
    if (!socket) return;

    socket.on("searchResults", (domains) => {
      console.log("searchResults", domains);
      setSearchResults(domains);
      setShowDomainList(true);
    });

    return () => {
      socket.off("searchResults");
    };
  }, [socket]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (socket && isConnected) {
      socket.emit("searchDomains", value);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        inputRef.current &&
        !inputRef.current.contains(target)
      ) {
        setShowDomainList(false);
        setIsInputFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputFocus = () => {
    setIsInputFocused(true);
    setTimeout(() => {
      setShowDomainList(true);
    }, 300);
  };

  useEffect(() => {
    console.log("Socket connection status:", {
      isConnected,
      hasSocket: !!socket,
      error: connectionError,
    });
  }, [isConnected, socket, connectionError]);

  const handleDomainSelect = (domain: SearchResults) => {
    storage.set(StorageKeys.SELECTED_DOMAIN, domain);
    storage.set(StorageKeys.SELECTED_FILE, null);
    router.push(`/mint/domain`);
  };

  return (
    <div className="w-full h-screen bg-dark lg:overflow-hidden overflow-y-auto noscrollbar">
      <NavbarMint />

      <main className="container max-w-5xl mx-auto mt-12 overflow-hidden">
        <div className="pt-32 text-center overflow-hidden">
          <h1 className="text-5xl font-bold mb-4">Mint Your Blockspace</h1>
          <p
            className={`text-white font-satoshi-light font-thin text-stroke-thin text-base mb-12 leading-relaxed tracking-wider transition-all duration-500 ${
              isInputFocused ? "opacity-0" : ""
            }`}
          >
            Blockspace is your personal domain on the blockchain
            <br />
            fully decentralized, fully yours.
          </p>

          <div
            className={`relative max-w-xl mx-auto mb-16 transition-all duration-500 ${
              isInputFocused ? "-translate-y-20 z-40" : ""
            }`}
          >
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={handleSearchInput}
              placeholder="search for a name"
              className="w-full px-6 py-3 rounded-lg bg-white border border-light-white text-black placeholder:text-black placeholder:!font-thin placeholder:text-2xl placeholder:text-opacity-40 outline-none z-40"
              onFocus={handleInputFocus}
            />
            <Image
              src={SearchIcon}
              alt="Search"
              width={30}
              height={30}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            />
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 relative transition-all duration-700 delay-100 ${
              isInputFocused ? "-translate-x-full opacity-0" : ""
            }`}
          >
            <div className="text-center mt-8 md:mt-16 md:mr-16 md:ml-10">
              <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Mint Your Blockspace
              </h3>
              <p className="text-sm font-satoshi-light font-thin">
                Choose your unique name and secure it on the blockchain. True
                ownership starts here.
              </p>
            </div>

            <Image
              src={Arrow}
              alt="Arrow Right"
              width={110}
              height={110}
              className="hidden lg:block absolute top-24 left-[264px] mb-4 w-[80px] md:w-[120px]"
            />

            <div className="text-center md:mr-12 md:ml-12 ">
              <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Host Your Website</h3>
              <p className="text-sm font-satoshi-light font-thin">
                Upload your HTML content to a smart contract, free from any
                central authority.
              </p>
            </div>

            <Image
              src={Arrow2}
              alt="Arrow Right"
              width={110}
              height={110}
              className="hidden  lg:block absolute top-16 right-72 mx-auto mb-4 w-[80px] md:w-[120px]"
            />

            <div className="text-center mb-12 md:mt-20 md:mr-10 md:ml-10">
              <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Be Featured on Liberum
              </h3>
              <p className="text-sm font-satoshi-light font-thin">
                Your blockspace instantly appears on our homepage for everyone
                to explore and enjoy.
              </p>
            </div>
          </div>

          <div
            ref={containerRef}
            className={`absolute top-[45vh] pb-20 right-1/2 w-[70vh] translate-x-1/2 transition-all duration-500 max-h-[500px] overflow-y-auto noscrollbar ${
              isInputFocused ? "block z-30" : "hidden"
            } ${
              showDomainList
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {displayedResults.map((domain, index) => (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  handleDomainSelect(domain);
                }}
                key={index}
                className={`flex result-item rounded-md p-2 items-center gap-4 mb-4 transition-all duration-300 ${
                  domain?.linkedContractAddress === "" ||
                  !domain?.linkedContractAddress
                    ? "cursor-pointer hover:bg-white/5 "
                    : ""
                }`}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  opacity: showDomainList ? 1 : 0,
                  transform: showDomainList
                    ? "translateY(0)"
                    : "translateY(20px)",
                }}
              >
                {domain?.image_url && !!domain?.linkedContractAddress && (
                  <div className="w-12 aspect-square relative rounded-full">
                    <Image
                      src={domain?.image_url || ""}
                      alt=""
                      fill
                      className="rounded-full"
                      objectFit="cover"
                    />
                  </div>
                )}
                {(domain?.linkedContractAddress === "" ||
                  !domain?.linkedContractAddress ||
                  !domain?.image_url) && (
                  <div className="h-12 w-12 rounded-full"></div>
                )}
                {domain?.linkedContractAddress === "" ||
                !domain?.linkedContractAddress ? (
                  <div className="text-xl domain-name transition-colors">
                    {domain.name}
                  </div>
                ) : (
                  <span className="text-xl">{domain.name}</span>
                )}
                <span
                  className={`${
                    domain.linkedContractAddress === "" ||
                    !domain.linkedContractAddress
                      ? "status-text bg-green-500"
                      : "bg-blue-500"
                  } px-3 py-1 rounded-full text-sm ml-auto`}
                >
                  {domain.linkedContractAddress === "" ||
                  !domain.linkedContractAddress
                    ? "Available"
                    : "Registered"}
                </span>
              </div>
            ))}

            {searchResults.length > 3 && (
              <div className="flex justify-between items-center mt-8">
                <button
                  className="bg-secondary hover:bg-opacity-80 px-2 py-1 rounded-lg text-start text-black font-semibold text-sm"
                  onClick={() => setShowAllDomains(!showAllDomains)}
                >
                  {showAllDomains ? "Show Less..." : "See More..."}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MintPage;
