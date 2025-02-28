/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NavbarMint from "@/components/NavbarMint";
import { useSelector } from "react-redux";
import { useMetaMask } from "@/hooks/useMetaMask";
import { useContract } from "@/hooks/useContract";
import { ethers, Interface } from "ethers";
import type { RootState } from "@/store/store";
import { storage, StorageKeys } from "@/utils/storage";
import { domainContractABI } from "@/contracts/domain-contract/abi";
import toast from "react-hot-toast";

const MintDomainPage = () => {
  const searchParams = useSearchParams();
  const [type, setType] = useState<string | null>(null);
  const router = useRouter();
  const selectedDomain = storage.get(StorageKeys.SELECTED_DOMAIN);
  const [tokenId, setTokenId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!searchParams) return;
    const typeParam = searchParams.get("type");
    if (typeParam) {
      setType(typeParam);
    }
  }, [searchParams]);

  const [years, setYears] = useState(1);
  const [prices, setPrices] = useState({
    registration: "0",
    network: "0",
    total: "0",
  });

  const { connect, isConnecting } = useMetaMask();
  const { contract, callContractMethod, provider } = useContract();
  const account = useSelector((state: RootState) => state.wallet.account);

  const handleIncrement = () => {
    if (years < 100) setYears((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (years > 1) setYears((prev) => prev - 1);
  };

  useEffect(() => {
    const fetchTokenId = async () => {
      console.log({ contract });
      console.log({ provider });
      if (!contract || !provider) return;

      try {
        console.log("girdi");
        const tokenId = await contract.getTokenIdByDomain(selectedDomain?.name);
        setTokenId(tokenId);
        console.log("tokenId", tokenId);
      } catch (err) {
        console.error("Error fetching prices:", err);
      }
    };
    fetchTokenId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  useEffect(() => {
    const fetchPrices = async () => {
      console.log({ contract });
      console.log({ provider });
      if (!contract || !provider) return;

      try {
        const yearsInSeconds = yearsToSeconds(years);
        let estimateGas;
        if (!!type && type === "extend" && tokenId) {
          estimateGas = await contract.renew.estimateGas(
            tokenId,
            yearsInSeconds
          );
        } else {
          console.log("selectedDomain?.name", selectedDomain?.name);
          estimateGas = await contract.mintDomain.estimateGas(
            selectedDomain?.name,
            yearsInSeconds
          );
        }
        console.log("estimateGas", estimateGas);
        const networkFee = await provider.getFeeData();
        if (!networkFee?.gasPrice) return;

        const estimatedGasPrice = networkFee.gasPrice * estimateGas;

        console.log(ethers.formatEther(estimatedGasPrice));

        //TODOO: network + registration = total
        setPrices({
          registration: ethers.formatEther(0),
          network: ethers.formatEther(estimatedGasPrice),
          total: ethers.formatEther(estimatedGasPrice),
        });
      } catch (err) {
        console.error("Error fetching prices:", err);
      }
    };

    fetchPrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, years, type, tokenId]);

  const yearsToSeconds = (years: number) => {
    return years * 365 * 24 * 60 * 60;
  };

  const handleMint = async () => {
    if (!account) {
      await connect();
      return;
    }
    if (type === "extend") {
      await handleExtend();
    } else {
      await handleFirstMint();
    }
  };

  const handleFirstMint = async () => {
    console.log("first mint");
    setIsLoading(true);
    try {
      if (!selectedDomain?.name) {
        throw new Error("Domain name is required");
      }

      const yearsInSeconds = yearsToSeconds(years);

      const tx = await callContractMethod(
        "mintDomain",
        selectedDomain?.name,
        yearsInSeconds
        // { value: ethers.parseEther(prices.total) }
      );

      console.log("Mint transaction:", tx);

      if (tx) {
        toast.success("Domain minted successfully", { position: "top-right" });
      }

      const receipt = await provider?.waitForTransaction(tx.hash);
      console.log("Mint receipt:", receipt);

      const iface = new Interface(domainContractABI);

      let owner;
      let domain;
      let nftId;
      let expirationTime;

      receipt?.logs.forEach((log) => {
        try {
          const parsedLog = iface.parseLog(log);

          if (parsedLog) {
            owner = parsedLog?.args?.owner;
            domain = parsedLog?.args?.domain;
            nftId = parsedLog?.args?.tokenId;
            expirationTime = parsedLog?.args?.expirationTime;
          }
        } catch (error) {
          console.error(error);
        }
      });

      console.log({ owner, domain, tokenId, expirationTime });

      if (!owner || !domain || !nftId || !expirationTime) {
        throw new Error("Error parsing logs");
      }

      const res = await fetch("/api/create-domain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: domain,
          owner: account,
          nft_id: Number((nftId as any).toString()),
          expire_date: Number((expirationTime as any).toString()),
          linkedContractAddress: "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message, { position: "top-right" });
        return;
      }
      storage.set(StorageKeys.SELECTED_DOMAIN, data?.data);

      router.push(`/mint/domain/success`);
    } catch (err) {
      console.error("Mint error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExtend = async () => {
    console.log("extend");
    try {
      if (!tokenId) {
        throw new Error("Token ID is required");
      }

      const yearsInSeconds = yearsToSeconds(years);

      const tx = await callContractMethod("renew", tokenId, yearsInSeconds);

      if (tx) {
        toast.success("Domain extended successfully", {
          position: "top-right",
        });
      }

      console.log("Mint transaction:", tx);
      router.push(`/mint/domain/success`);
    } catch (err) {
      console.error("Mint error:", err);
    }
  };

  return (
    <div className="w-full h-screen bg-dark overflow-hidden">
      <NavbarMint />

      <main className="container max-w-3xl mx-auto mt-12 pb-20">
        <div className="pt-32 text-start">
          <h1 className="text-5xl font-bold mb-8">Mint Your Blockspace</h1>

          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center justify-center gap-4">
              <div className="w-10 h-10 bg-primary rounded-full"></div>
              <span className="text-2xl">{selectedDomain?.name}</span>
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
              <span className="text-5xl font-bold mb-2">
                {years} Year{years > 1 ? "s" : ""}
              </span>
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
              <span>
                Registration Period: {years} Year{years > 1 ? "s" : ""}
              </span>
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
            <div className="w-full flex justify-center items-center">
              <button
                onClick={handleMint}
                disabled={isConnecting || isLoading}
                className="w-1/2 bg-secondary hover:bg-secondary/90 text-black font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
              >
                {isConnecting
                  ? "Connecting..."
                  : account
                  ? !isLoading
                    ? type === "extend"
                      ? "Extend"
                      : "Mint"
                    : "Minting..."
                  : "Connect Wallet"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MintDomainPage;
