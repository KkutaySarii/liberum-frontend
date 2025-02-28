"use client";
import React, {  useEffect, useState } from "react";
import { Domain, ContentData } from "@/types/walletAccount";
import Image from "next/image";
import Union from "@/assets/Union (1).svg";
import StrokeUnion from "@/assets/StrokeUnion.svg";
import { storage, StorageKeys } from "@/utils/storage";
import { useContract } from "@/hooks/useContract";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useHtmlContract } from "@/hooks/useHtmlContract";
import { ethers } from "ethers";
import { htmlPageABI } from "@/contracts/html-page-factory/abi";

interface ChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "blockspace" | "content";
}

const ChangeModal = ({ isOpen, onClose, type }: ChangeModalProps) => {
  const { contract, provider } = useContract();
  const { contract: contractHtml, provider: providerHtml } = useHtmlContract();
  const account = useSelector((state: RootState) => state.wallet.account);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<Domain[] | ContentData[]>([]);
  const [availableBlockspaces, setAvailableBlockspaces] = useState<Domain[]>([]);
  const [availableContents, setAvailableContents] = useState<ContentData[]>([]);

  useEffect(() => {
   if(availableBlockspaces.length > 0 && availableContents.length > 0) {
    setItems(type === "blockspace" ? availableBlockspaces : availableContents);
   }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableBlockspaces, availableContents]);


  useEffect(() => {
      const fetchData = async () => {
        if (!contract || !provider || !contractHtml || !providerHtml) return;
        
        try {
          setIsLoading(true);
          const balance = await contract.balanceOf(account);
          const tempDomains = [];
          const tempContents = [];
    
          const userPages = await contractHtml.getUserPages(account);
    
          for (let i = 0; i < balance; i++) {
            try {
              const tokenId = await contract.tokenOfOwnerByIndex(account, i);
              const ownerOf = await contract.ownerOf(tokenId);
              
              if (ownerOf !== ethers.ZeroAddress) {
                const domain = await contract.getDomainByTokenId(tokenId);
                const expiration_date = await contract.getNFTExpiration(tokenId);
                const pageContract = await contractHtml.getLinkedDomain(tokenId);
                
                if (pageContract === ethers.ZeroAddress) {
                  tempDomains.push({ 
                    tokenId: tokenId.toString(), 
                    name: domain,
                    domain: domain,
                    expiration_date: Number(expiration_date.toString())
                  });
                } else {
                  const htmlPage = new ethers.Contract(pageContract, htmlPageABI, providerHtml);
                  const pageName = await htmlPage.name();
                  tempContents.push({
                    name: pageName,
                    pageContract: pageContract,
                    status: "linked",
                    domain: domain,
                    tokenId: tokenId.toString(), 
                  });
                  
                  tempDomains.push({
                    tokenId: tokenId.toString(),
                    name: domain,
                    domain: domain,
                    pageContract: pageContract,
                    expiration_date: Number(expiration_date.toString())
                  });
                }
              }
            } catch (err) {
              console.error('Error fetching domain:', err);
            }
          }
    
          for (const page of userPages) {
            const exists = tempContents.some(item => item.pageContract === page);
            if (!exists) {
              const htmlPage = new ethers.Contract(page, htmlPageABI, providerHtml);
              const name = await htmlPage.name();
              tempContents.push({
                name: name,
                pageContract: page,
                status: "available",
                domain: ""
              });
            }
          }
    
          // Sadece available (yani bağlı olmayan) verileri kullan
          const availableBlockspaces = tempDomains.filter(item => !item.pageContract);
          const availableContent = tempContents.filter(item => item.status === "available");
    
          console.log("availableBlockspaces", availableBlockspaces)
          console.log("availableContent", availableContent)
          setAvailableBlockspaces(availableBlockspaces);
          setAvailableContents(availableContent);
          
          storage.set(StorageKeys.AVAILABLE_DOMAİNS, availableBlockspaces);
          storage.set(StorageKeys.AVAILABLE_CONTENTS, availableContent);
          
        } catch (err) {
          console.error('Error fetching data:', err);
        } finally {
          setIsLoading(false);
        }
      }
      fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, contractHtml, account ]);

  
  const handleSelect = (item: Domain | ContentData) => {
    if (type === "blockspace") {
      storage.set(StorageKeys.SELECTED_DOMAIN, item as Domain);
    } else {
      storage.set(StorageKeys.SELECTED_FILE, item as ContentData);
    }
    onClose();
  };


  

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center w-full "
      onClick={onClose}
    >
      <div
        className="bg-[#1c1c1e] rounded-lg w-96 max-h-[400px] overflow-y-auto noscrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading ? (
          <div className="flex items-center justify-center bg-[#1c1c1e] rounded-lg w-96 h-[400px] overflow-y-auto noscrollbar">
            <div className="w-10 h-10 border-t-2 border-b-2 border-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-4 m-10 h-[300px] overflow-y-auto noscrollbar">
            {items && items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-opacity-80 group"
                onClick={() => handleSelect(item)}
              >
                <div className="flex items-center gap-3">
                  {type === "blockspace" ? (
                    <div className="w-10 h-10 bg-primary rounded-full transition-all group-hover:border-2 group-hover:border-white"></div>
                  ) : (
                    <>
                    <div className="relative">
                      <Image
                        src={Union}
                        alt="Union"
                        width={40}
                        height={40}
                        className="rounded-full transition-all block group-hover:hidden"
                      />
                      <Image
                        src={StrokeUnion}
                        alt="Union"
                        width={40}
                        height={40}
                        className="rounded-full transition-all hidden group-hover:block"
                      />
                    </div>
                  </>
                  )}
                  <span className="text-white">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangeModal;
