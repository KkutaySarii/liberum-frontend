"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import NavbarMint from "@/components/NavbarMint";
import Union from "@/assets/Union (1).svg";
import { storage, StorageKeys } from "@/utils/storage";
import { useContract } from "@/hooks/useContract";
import { useHtmlContract } from "@/hooks/useHtmlContract";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ContentData, Domain } from "@/types/walletAccount";
import toast from "react-hot-toast";
import { IoMdArrowRoundBack } from "react-icons/io";

const formatAddress = (address: string | null) => {
  if (!address) return "";
  return `${address?.slice(0, 10)}...${address?.slice(-8)}`;
};

const LinkPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pageAddress, setPageAddress] = useState<string | null>(null);
  const [tokenId, setTokenId] = useState<string | null>(null);
  const selectedDomain = storage.get(StorageKeys.SELECTED_DOMAIN) as Domain;
  const selectedFile = storage.get(StorageKeys.SELECTED_FILE) as ContentData;
  const { contract, provider } = useContract();
  const {
    contract: htmlContract,
    callContractMethod: callHtmlContractMethod,
    provider: htmlProvider,
  } = useHtmlContract();
  const account = useSelector((state: RootState) => state.wallet.account);
  const [isLoading, setIsLoading] = useState(false);
  const [prices, setPrices] = useState({
    network: "0",
    total: "0",
  });

  useEffect(() => {
    if (!searchParams.has("address")) {
      setPageAddress(selectedFile.pageContract);
    } else {
      setPageAddress(searchParams.get("address"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  console.log({ contract }, provider);

  useEffect(() => {
    const fetchTokenId = async () => {
      if (!contract || !provider) return;

      try {
        const tokenId = await contract.getTokenIdByDomain(selectedDomain?.name);
        setTokenId(tokenId);
      } catch (err) {
        console.error("Error fetching prices:", err);
      }
    };
    fetchTokenId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  useEffect(() => {
    const fetchPrices = async () => {
      if (!htmlContract || !htmlProvider || !pageAddress || !tokenId) {
        console.log("Missing required values:", {
          hasContract: !!htmlContract,
          hasProvider: !!htmlProvider,
          pageAddress,
          tokenId,
        });
        return;
      }

      try {
        const estimateGas = await htmlContract.linkDomain.estimateGas(
          pageAddress,
          tokenId.toString()
        );

        const networkFee = await htmlProvider.getFeeData();
        if (!networkFee?.gasPrice) return;

        const estimatedGasPrice = networkFee.gasPrice * estimateGas;
        setPrices({
          network: ethers.formatEther(estimatedGasPrice),
          total: ethers.formatEther(estimatedGasPrice),
        });
      } catch (err) {
        console.error("Error fetching prices:", err);
      }
    };

    fetchPrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [htmlContract, pageAddress, tokenId]);

  const handleLink = async () => {
    setIsLoading(true);
    try {
      if (!pageAddress) {
        throw new Error("Contract address is required");
      }
      if (!tokenId) {
        throw new Error("Token ID is required");
      }

      const tx = await callHtmlContractMethod(
        "linkDomain",
        pageAddress,
        tokenId
      );
      if (tx) {
        toast.success("Linked successfully", { position: "top-right" });
      }
      router.push(`/mint/domain/content/success`);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDoItLater = () => {
    storage.set(StorageKeys.SELECTED_DOMAIN, null);
    storage.set(StorageKeys.SELECTED_FILE, null);
    router.push(`/dashboard`);
  };

  return (
    <div className="w-full h-screen bg-dark overflow-hidden">
      <NavbarMint />
      <div
        className="fixed top-40 left-24 cursor-pointer text-white "
        onClick={() => router.back()}
      >
        <IoMdArrowRoundBack className="w-8 h-8" />
      </div>

      <main className="container max-w-3xl mx-auto mt-12 pb-20">
        <div className="pt-32 text-start">
          <h1 className="text-5xl font-bold mb-8">Link with your blockspace</h1>

          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary rounded-full"></div>
              <span className="text-2xl">{selectedDomain?.name}</span>
            </div>
          </div>
          <div className="max-w-lg mx-auto flex justify-between items-center">
            <div className=" flex justify-center items-center gap-6 mb-8">
              <Image src={Union} alt="icon" width={120} height={120} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-4xl underline">{selectedFile?.name}</h3>
                </div>
                <div className="text-gray-400 mb-1 text-xl">
                  CA :{" "}
                  <span className="underline">
                    {formatAddress(pageAddress)}
                  </span>
                </div>
                <div className="text-gray-400 text-xl">Linked with : N/A</div>
              </div>
            </div>
          </div>

          <div className="max-w-md mx-auto mt-2">
            <div className="flex justify-between items-center mb-4 text-gray-400">
              <span>Link Fee</span>
              <span className="text-[#82E14B]">Free</span>
            </div>
            <div className="flex justify-between items-center mb-4 text-gray-400">
              <span>Est. Network Fee</span>
              <span>{prices.network} ETH</span>
            </div>
            <div className="flex justify-between items-center mb-8 pt-2">
              <span>Estimated Total</span>
              <span>{prices.total} ETH</span>
            </div>
          </div>
          <div className="flex justify-center gap-8 max-w-xl mx-auto">
            <button
              disabled={!account || isLoading}
              className="w-full py-3 bg-secondary rounded-lg font-semibold text-black hover:bg-opacity-90 transition-colors text-center disabled:opacity-50 "
              onClick={() => {
                handleLink();
              }}
            >
              {isLoading ? "Linking..." : "Link"}
            </button>
            <button
              onClick={handleDoItLater}
              className="w-full py-3 bg-white rounded-lg font-semibold text-black hover:bg-opacity-90 transition-colors text-center"
            >
              Do It Later
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LinkPage;
