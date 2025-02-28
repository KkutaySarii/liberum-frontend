"use client";
import React, { useEffect, useState } from "react";
import { Domain, ContentData } from "@/types/walletAccount";
import Image from "next/image";
import Union from "@/assets/Union (1).svg";
import StrokeUnion from "@/assets/StrokeUnion.svg";
import { storage, StorageKeys } from "@/utils/storage";
import { useContract } from '@/hooks/useContract';
import { useHtmlContract } from '@/hooks/useHtmlContract';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ethers } from 'ethers';
import { htmlPageABI } from '@/contracts/html-page-factory/abi';

interface ChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "blockspace" | "content";
}

const ChangeModal = ({ isOpen, onClose, type }: ChangeModalProps) => {
  const [availableBlockspaces, setAvailableBlockspaces] = useState<Domain[]>([]);
  const [contents, setContents] = useState<ContentData[]>([]);

  const { contract, provider } = useContract();
  const { contract: contractHtml, provider: providerHtml } = useHtmlContract();
  const account = useSelector((state: RootState) => state.wallet.account);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
  console.log({availableBlockspaces})
  console.log({contents})
  }, [availableBlockspaces, contents]);

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
              const pageContract = await contractHtml.getLinkedDomain(tokenId);
              
                if (pageContract === ethers.ZeroAddress) {
                tempDomains.push({ 
                  tokenId: tokenId.toString(), 
                  name: domain,
                  domain: domain 
                });
              } else {
                const htmlPage = new ethers.Contract(pageContract, htmlPageABI, providerHtml);
                const pageName = await htmlPage.name();
                tempContents.push({
                  name: pageName,
                  pageContract: pageContract,
                  status: "linked",
                  domain: domain
                });
              }
            }
          } catch (err) {
            console.error("Error fetching domain:", err);
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
  
        setAvailableBlockspaces(tempDomains);
        setContents(tempContents);
        
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };
  
    if (isOpen) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, contractHtml, account, isOpen]);
  

  const items = type === "blockspace" ? availableBlockspaces : contents.filter(item => item.status === "available");;

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
        className="bg-dark rounded-lg p-6 w-96 max-h-[400px]  overflow-y-auto noscrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {!isLoading ? (

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-opacity-80 group"
              onClick={() => handleSelect(item)}
            >
              <div className="flex items-center gap-3">
                {type === "blockspace" ? (
                  // item.image ? (
                  //   <Image
                  //     src={item.image}
                  //     alt={item.name}
                  //     width={40}
                  //     height={40}
                  //     className="rounded-full transition-all group-hover:border-2 group-hover:border-white"
                  //   />
                  // ) : (
                  <div className="w-10 h-10 bg-primary rounded-full transition-all group-hover:border-2 group-hover:border-white"></div>
                ) : (
                  // )
                  <>
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
                  </>
                )}
                <span className="text-white">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangeModal;
