"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import Image from "next/image";
import NavbarMint from "@/components/NavbarMint";
// import Union from "@/assets/Union (1).svg";
import { storage, StorageKeys } from "@/utils/storage";
// import { ImageUpload } from "@/components/common/image-upload";
import { Domain } from "@/types/walletAccount";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useHtmlContract } from "@/hooks/useHtmlContract";
import { useHtmlPageContract } from "@/hooks/useHtmlPage";
import toast from "react-hot-toast";
import { IoMdArrowRoundBack } from "react-icons/io";
const ManageBlockspacePage = () => {
  const router = useRouter();

  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [linkedContent, setLinkedContent] = useState<string | null>(null);
  const { callContractMethod } = useHtmlContract();
  const { contract: htmlPageContract, provider: htmlPageProvider } =
    useHtmlPageContract(
      selectedDomain?.pageContract ? selectedDomain?.pageContract : ""
    );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const account = useSelector((state: RootState) => state.wallet.account);
  const owner = account;
  const expiry = selectedDomain?.expiration_date;

  useEffect(() => {
    const selectedDomainStore = storage.get(
      StorageKeys.SELECTED_DOMAIN
    ) as Domain;
    setSelectedDomain(selectedDomainStore);
    if (selectedDomainStore?.pageContract) {
      setLinkedContent(selectedDomainStore?.pageContract);
    }
  }, []);

  const formatExpiry = (expiry: number | undefined) => {
    return new Date(Number(expiry?.toString()) * 1000).toLocaleDateString(
      "tr-TR"
    );
  };
  const formatAddress = (address: string) => {
    return address?.slice(0, 10) + "..." + address?.slice(-8);
  };

  useEffect(() => {
    if (htmlPageContract && htmlPageProvider) {
      const getContent = async () => {
        const content = await htmlPageContract.GET("");

        console.log({ content });
      };
      getContent();
    }
  }, [htmlPageContract, htmlPageProvider]);

  console.log(linkedContent);

  const handleUnlinkContent = async () => {
    setIsLoading(true);
    try {
      console.log("girdi");
      if (!selectedDomain?.pageContract) {
        throw new Error("Page Contract is required");
      }

      const tx = await callContractMethod(
        "unlinkDomain",
        selectedDomain?.pageContract,
        selectedDomain?.tokenId
      );

      if (tx) {
        toast.success("Unlinked successfully", { position: "top-right" });
      }
      console.log("Mint transaction:", tx);
      const newSelectedDomain = {
        ...selectedDomain,
        pageContract: "",
      } as Domain;
      setSelectedDomain(newSelectedDomain);
      storage.set(StorageKeys.SELECTED_DOMAIN, newSelectedDomain);
      setLinkedContent(null);
    } catch (error) {
      console.error("Error unlinking domain:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (linkedContent) {
      // storage.set(StorageKeys.SELECTED_FILE, linkedContent);
    } else {
      storage.set(StorageKeys.SELECTED_FILE, null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (!selectedDomain) {
  //   router.push("/home");
  //   return;
  // }

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
          <h1 className="text-5xl font-bold mb-8">Manage Your Blockspace</h1>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center">
              {/*TODO: domain id buraya gelmesi lazım */}
              {/* <ImageUpload domain_id={selectedDomain?._id} size={60} /> */}
            </div>
            <span className="text-2xl text-white">{selectedDomain?.name}</span>
          </div>

          <div className="mb-16 container max-w-lg mx-auto">
            <h2 className="text-2xl text-white mb-6 text-center font-semibold">
              Linked Content
            </h2>

            {linkedContent ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    {/* <Image
                        src={Union}
                        alt={linkedContent.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      /> */}

                    <span className="text-white text-lg">{linkedContent}</span>
                  </div>
                  <button
                    disabled={isLoading}
                    className="px-4 py-1.5 bg-white text-black rounded-md hover:bg-opacity-90 transition-colors"
                    onClick={handleUnlinkContent}
                  >
                    {isLoading ? "Unlinking..." : "Unlink"}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-400 mb-8">
                Currently, there is no linked content
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
                <h2 className="text-2xl text-white mb-4">Expiry</h2>
                <p className="text-gray-400">{formatExpiry(expiry)}</p>
              </div>
              <button
                className="px-2 py-1 font-semibold text-xs bg-secondary text-black rounded hover:bg-opacity-90 transition-colors"
                onClick={() => router.push(`/mint/domain?type=extend`)}
              >
                Extend
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            {linkedContent && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.open(`http://${selectedDomain?.name}`, "_blank");
                }}
                className="w-1/3 px-6 py-3 mt-4 bg-secondary text-black rounded-lg hover:bg-opacity-90 transition-colors font-semibold flex items-center justify-center"
              >
                Visit Site
              </button>
            )}
            {!linkedContent && (
              <Link
                href={`/dashboard/manage/select-content`}
                className="w-1/3 px-6 py-3 mt-4 bg-secondary text-black rounded-lg hover:bg-opacity-90 transition-colors font-semibold flex items-center justify-center"
              >
                Link Content
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageBlockspacePage;
