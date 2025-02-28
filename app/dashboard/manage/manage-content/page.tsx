"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavbarMint from "@/components/NavbarMint";
import Union from "@/assets/Union (1).svg";
import { storage, StorageKeys } from "@/utils/storage";
import { ContentData } from "@/types/walletAccount";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useHtmlContract } from "@/hooks/useHtmlContract";
import toast from "react-hot-toast";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const ManageContentPage = () => {
  const [selectedFile, setSelectedFile] = useState<ContentData | null>(null);

  const [linkedBlockspace, setLinkedBlockspace] = useState<string | null>(null);
  const account = useSelector((state: RootState) => state.wallet.account);
  const { callContractMethod } = useHtmlContract();
  const owner = account;
  const contractAddress = selectedFile?.pageContract
    ? selectedFile?.pageContract
    : "";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formatAddress = (address: string) => {
    return address?.slice(0, 10) + "..." + address?.slice(-8);
  };
  useEffect(() => {
    const selectedFileStore = storage.get(
      StorageKeys.SELECTED_FILE
    ) as ContentData;
    setSelectedFile(selectedFileStore);
    if (selectedFileStore?.domain) {
      setLinkedBlockspace(selectedFileStore?.domain);
    }
  }, []);

  const handleUnlinkDomain = async () => {
    setIsLoading(true);
    try {
      if (!selectedFile?.pageContract || !selectedFile?.tokenId) {
        throw new Error("Page Contract is required");
      }

      const tx = await callContractMethod(
        "unlinkDomain",
        selectedFile?.pageContract,
        selectedFile?.tokenId
      );

      console.log("Mint transaction:", tx);
      if (tx) {
        toast.success("Domain unlinked successfully", {
          position: "top-right",
        });
      }
      const newSelectedFile = {
        ...selectedFile,
        domain: "",
        tokenId: "",
      } as ContentData;
      setSelectedFile(newSelectedFile);
      storage.set(StorageKeys.SELECTED_FILE, newSelectedFile);
      setLinkedBlockspace(null);
    } catch (error) {
      console.error("Error unlinking domain:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const router = useRouter();

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
          <h1 className="text-5xl font-bold mb-8">Manage Your Content</h1>

          <div className="flex items-center gap-3 mb-6">
            <Image
              src={Union}
              alt="icon"
              width={40}
              height={40}
              className="object-cover"
            />
            <span className="text-2xl text-white">{selectedFile?.name}</span>
          </div>

          <div className="mb-16 container max-w-lg mx-auto">
            <h2 className="text-2xl text-white mb-6 text-center font-semibold">
              Linked Blockspace
            </h2>

            {linkedBlockspace ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={Union}
                      alt="union"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <span className="text-white text-lg">
                      {linkedBlockspace}
                    </span>
                  </div>
                  <button
                    className="px-4 py-1.5 bg-white text-black rounded-md hover:bg-opacity-90 transition-colors"
                    onClick={handleUnlinkDomain}
                  >
                    {isLoading ? "Unlinking..." : "Unlink"}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-400 mb-8">
                Currently, there is no linked blockspace
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <h2 className="text-2xl text-white mb-4">Owner</h2>
              <p className="text-gray-400 break-all">{formatAddress(owner)}</p>
            </div>
            <div className="text-center flex items-end justify-center gap-2">
              <div className="flex-col items-center justify-center gap-4">
                <h2 className="text-2xl text-white mb-4">Contract Address</h2>
                <p className="text-gray-400">
                  {formatAddress(contractAddress)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            {linkedBlockspace && (
              <Link
                href={``} //TODO
                className="w-1/3 px-6 py-3 mt-4 bg-secondary text-black rounded-lg hover:bg-opacity-90 transition-colors font-semibold flex items-center justify-center"
              >
                View HTML
              </Link>
            )}
            {!linkedBlockspace && (
              <Link
                href={`/dashboard/manage/select-blockspace`}
                className="w-1/3 px-6 py-3 mt-4 bg-secondary text-black rounded-lg hover:bg-opacity-90 transition-colors font-semibold flex items-center justify-center"
              >
                Link Blockspace
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageContentPage;
