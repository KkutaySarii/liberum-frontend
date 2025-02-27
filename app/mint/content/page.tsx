"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import NavbarMint from "@/components/NavbarMint";
import { storage, StorageKeys } from "@/utils/storage";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Union from "@/assets/Union (1).svg";
const ContentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pageAddress, setPageAddress] = useState<string | null>(null);
  const selectedFile = storage.get(StorageKeys.SELECTED_FILE);
  const handleGoDashboard = () => {
    storage.set(StorageKeys.SELECTED_DOMAIN, null);
    storage.set(StorageKeys.SELECTED_FILE, null);
    router.push(`/dashboard`);
  };
  const formatAddress = (address: string | null) => {
    if (!address) return "";
    return `${address.slice(0, 10)}...${address.slice(-8)}`;
  };

  useEffect(() => {
    if (!searchParams) {
      return;
    }
    setPageAddress(searchParams.get("address"));
  }, [searchParams]);

  return (
    <div className="w-full h-screen bg-dark overflow-hidden">
      <NavbarMint />

      <main className="container max-w-5xl mx-auto mt-12">
        <div className="pt-32 text-center">
          <h1 className="text-5xl font-bold mb-6">Your Are Ready!</h1>
          <p className="text-gray-300 mb-16 text-lg mt-8">
            Your content has been successfully uploaded to blockchain
          </p>

          <div className="relative w-36 h-36 mx-auto mb-8 cursor-pointer group">
            <Image src={Union} alt="icon" width={144} height={144} />
          </div>

          <p className="text-3xl font-semibold mb-2 underline">
            {selectedFile?.name}
          </p>
          <div className="text-gray-400 mb-5 text-xl">
            CA : <span className="underline">{formatAddress(pageAddress)}</span>
          </div>

          <div className="flex justify-center gap-6">
            <Link
              href={`/dashboard/manage/select-content`}
              className="px-6 py-3 bg-secondary rounded-lg font-semibold text-black hover:bg-opacity-90 transition-colors flex justify-items-center gap-2"
            >
              <p className="font-semibold"> Link With Blockspace</p>
            </Link>

            <button
              onClick={handleGoDashboard}
              className="px-6 py-3 bg-white rounded-lg font-semibold text-black hover:bg-opacity-90 transition-colors"
            >
              Go To Your Dashboard
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContentPage;
