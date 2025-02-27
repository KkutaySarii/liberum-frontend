import React, { useState } from "react";
import { BiSolidPencil } from "react-icons/bi";
import { uploadToS3 } from "@/utils/s3";
import Image from "next/image";
import toast from "react-hot-toast";

export const ImageUpload = ({ domain_id }: { domain_id: string }) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const { location } = await uploadToS3(formData, "domain-favicons");

      const res = await fetch("/api/upload/db", {
        method: "POST",
        body: JSON.stringify({ image_location: location, domain_id }),
      });
      if (!res.ok) {
        toast.error("Failed to save the image location to the database", {
          position: "top-right",
        });
        return;
      }

      setImageUrl(location);

      toast.success("Image uploaded successfully", { position: "top-right" });
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className="flex items-center justify-center w-full mb-5">
      <button
        onClick={() => document.getElementById("image-upload-mint")?.click()}
        className="bg-primary relative hover:bg-primary/90 w-[200px] h-[200px] rounded-full flex items-center justify-center overflow-hidden transition-all duration-300"
      >
        {!imageUrl &&
          (!isUploading ? (
            <BiSolidPencil className="w-8 h-8 text-black" />
          ) : (
            <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ))}
        {imageUrl && <Image src={imageUrl} alt="" fill className="z-50" />}
      </button>
      <input
        id={"image-upload-mint"}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />
    </div>
  );
};
