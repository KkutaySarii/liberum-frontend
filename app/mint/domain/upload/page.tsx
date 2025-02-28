"use client";
import ChangeModal from "@/components/ChangeModal";
import NavbarMint from "@/components/NavbarMint";
import { StorageKeys } from "@/utils/storage";
import { storage } from "@/utils/storage";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

const UploadPage = () => {
  const router = useRouter();
  const [openChangeModal, setOpenChangeModal] = useState(false);
  const [modalType, setModalType] = useState<"blockspace" | "content">(
    "blockspace"
  );
  const selectedFile = storage.get(StorageKeys.SELECTED_FILE);

  const handleOpenModal = (type: "blockspace" | "content") => {
    setModalType(type);
    setOpenChangeModal(true);
  };
  useEffect(() => {
    if (selectedFile) {
      router.push(`/mint/domain/content/`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  return (
    <div className="w-full h-screen bg-dark overflow-hidden">
      <NavbarMint />

      <div
        className="fixed top-40 left-24 cursor-pointer text-white "
        onClick={() => router.back()}
      >
        <IoMdArrowRoundBack className="w-8 h-8" />
      </div>

      <main className="container max-w-xl mx-auto mt-12">
        <div className="pt-32 text-center">
          <h1 className="text-4xl mb-12 font-bold  text-start">
            Link Content To Your Blockspace
          </h1>
          <div className="flex flex-col justify-center gap-8 max-w-md mx-auto">
            <button
              onClick={() => handleOpenModal("content")}
              className="w-full py-3 bg-secondary rounded-lg font-semibold text-black hover:bg-opacity-90 transition-colors text-center"
            >
              Select Content
            </button>
            <span className="text-gray-300 text-center">OR</span>
            <button
              className="w-full py-3 bg-white rounded-lg font-semibold text-black hover:bg-opacity-90 transition-colors text-center"
              onClick={() => router.push(`/mint/domain/upload/upload-html`)}
            >
              Upload New Content
            </button>
          </div>
        </div>
      </main>
      <ChangeModal
        isOpen={openChangeModal}
        onClose={() => setOpenChangeModal(false)}
        type={modalType}
      />
    </div>
  );
};

export default UploadPage;
