"use client";
import React from "react";
import Link from "next/link";

import NavbarMint from "@/components/NavbarMint";
import { storage, StorageKeys } from "@/utils/storage";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/common/image-upload";
import { SearchResults } from "@/types/walletAccount";
import { IoMdArrowRoundBack } from "react-icons/io";

const MintSuccessPage = () => {
  const router = useRouter();
  const selectedDomain = storage.get(StorageKeys.SELECTED_DOMAIN);

  const handleGoDashboard = () => {
    storage.set(StorageKeys.SELECTED_DOMAIN, null);
    storage.set(StorageKeys.SELECTED_FILE, null);
    router.push(`/dashboard`);
  };

  if (!selectedDomain) {
    router.push("/home");
    return;
  }

  return (
    <div className="w-full h-screen bg-dark overflow-hidden">
      <NavbarMint />
      <div
        className="fixed top-40 left-24 cursor-pointer text-white "
        onClick={() => router.back()}
      >
        <IoMdArrowRoundBack className="w-8 h-8" />
      </div>

      <main className="container max-w-5xl mx-auto mt-12">
        <div className="pt-32 text-center">
          <h1 className="text-5xl font-bold mb-6">Your New Blockspace</h1>
          <p className="text-gray-300 mb-16 text-lg mt-8">
            You can customize your blockspace view. Set a favicon!
          </p>
          <div className="flex items-center justify-center w-full mb-5">
            <ImageUpload
              domain_id={(selectedDomain as SearchResults)?._id}
              size={200}
            />
          </div>

          <p className="text-3xl font-semibold mb-12">{selectedDomain?.name}</p>

          <div className="flex justify-center gap-6">
            <Link
              href={`/mint/domain/upload`}
              className="px-6 py-3 bg-secondary rounded-lg font-semibold text-black hover:bg-opacity-90 transition-colors flex justify-items-center gap-2"
            >
              <p className="font-normal"> Next Step:</p>
              <p className="font-semibold"> Link Your Content</p>
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

export default MintSuccessPage;
