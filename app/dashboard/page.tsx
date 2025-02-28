"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useRouter } from 'next/navigation'
import { ethers } from 'ethers'

import { Domain, ContentData } from '@/types/walletAccount';
import NavbarMint from '@/components/NavbarMint'
import Union from '@/assets/Union (1).svg'
import { storage, StorageKeys } from '@/utils/storage'
import { RootState } from '@/store/store'
import { useContract } from '@/hooks/useContract'
import { useSelector } from 'react-redux'
// import { useMetaMask } from '@/hooks/useMetaMask'
import { useHtmlContract } from '@/hooks/useHtmlContract'
import { htmlPageABI } from '@/contracts/html-page-factory/abi'

const DashboardPage = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('blockspace')
  // const { connect, isConnecting } = useMetaMask()
  const { contract, provider } = useContract()
  const {contract: contractHtml, provider: providerHtml} = useHtmlContract()
  const account = useSelector((state: RootState) => state.wallet.account)
  const [blockspaceData, setBlockspaceData] = useState<Domain[]>([])
  const [contentData, setContentData] = useState<ContentData[]>([])
  const [isLoading, setIsLoading] = useState(false);


useEffect(() => {
  console.log({blockspaceData})
  console.log({contentData})

}, [blockspaceData, contentData])

 useEffect(() => {

  const fetchData = async () => {
    if (!contract || !provider || !contractHtml || !providerHtml) return;
    
    try {
      setIsLoading(true);
      const balance = await contract.balanceOf(account);
      const tempDomains = [];
      const tempContents = [];

      const userPages = await contractHtml.getUserPages(account);

      for(let i = 0; i < balance; i++) {
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
              
              tempDomains.push({
                tokenId: tokenId.toString(),
                name: domain,
                domain: domain,
                pageContract: pageContract
              });
            }
          }
        } catch(err) {
          console.error('Error fetching domain:', err);
        }
      }

      for(const page of userPages) {
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

      setBlockspaceData(tempDomains);
      setContentData(tempContents);
      
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  }

  fetchData();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [contract, contractHtml, account]);


  const handleManageBlockspace = (item: Domain) => {
    storage.set(StorageKeys.SELECTED_DOMAIN, item)
    storage.set(StorageKeys.SELECTED_FILE, null)
    router.push(`/dashboard/manage/manage-blockspace`)
  }


  const handleManageContent = (item: ContentData) => {
    storage.set(StorageKeys.SELECTED_FILE, item);
    storage.set(StorageKeys.SELECTED_DOMAIN, null);
    router.push(`/dashboard/manage/manage-content`);
  };

  const handleAdd = (type: string) => {
    storage.set(StorageKeys.SELECTED_DOMAIN, null);
    storage.set(StorageKeys.SELECTED_FILE, null);
    if (type === "blockspace") {
      router.push(`/mint/`);
    } else {
      router.push(`/mint/domain/upload/upload-html`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-dark overflow-hidden">
      <NavbarMint />

      <main className="container max-w-2xl mx-auto px-4 overflow-hidden">
        <div className="pt-32">
          <h1 className="text-4xl font-semibold mb-12 text-center text-white">
            Your Dashboard
          </h1>


          <div className="tab-pagination flex space-x-8 mb-8 border-b border-gray-800 max-w-xl ">
            <button
              className={`text-xl font-medium px-4 pb-2 w-full ${
                activeTab === "blockspace"
                  ? "text-[#F5A051] border-b-2 border-[#F5A051]"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("blockspace")}
            >
              Blockspace
            </button>
            <button
              className={`text-xl font-medium px-4 pb-2 w-full ${
                activeTab === "content"
                  ? "text-[#F5A051] border-b-2 border-[#F5A051]"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("content")}
            >
              Content
            </button>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
          <div className="relative max-w-2xl mx-auto overflow-hidden">
            <Swiper
              slidesPerView={1}
              modules={[Pagination]}
              onSlideChange={(swiper) =>
                setActiveTab(
                  swiper.activeIndex === 0 ? "blockspace" : "content"
                )
              }
              onSwiper={(swiper) => {
                document
                  .querySelectorAll(".tab-pagination button")
                  .forEach((button, index) => {
                    button.addEventListener("click", () => {
                      swiper.slideTo(index);
                    });
                  });
              }}
            >
              <SwiperSlide>
                <div className="space-y-4 max-w-2xl max-h-[45vh] overflow-y-auto noscrollbar">
                  {blockspaceData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between  py-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        {/* {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        ) : ( */}
                        <div className="w-10 h-10 bg-primary rounded-full transition-all"></div>
                        {/* )} */}
                        <span className="text-white text-lg">{item.name}</span>
                      </div>
                      <button
                        className="px-4 py-1.5 bg-white text-black rounded-md hover:bg-opacity-90 transition-colors"
                        onClick={() => handleManageBlockspace(item)}
                      >
                        Manage
                      </button>
                    </div>
                  ))}

                </div>
                <div className="w-full items-center flex justify-center my-10">
                    <button className="w-12 h-12 flex items-center justify-center bg-secondary rounded-lg hover:bg-opacity-80 hover:text-secondary hover transition-colors">
                      <span
                        className="text-black text-3xl"
                        onClick={() => handleAdd("blockspace")}
                      >
                        +
                      </span>
                    </button>
                  </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="space-y-4 max-h-[45vh] overflow-y-auto noscrollbar">
                  {contentData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between  py-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Image
                          src={Union}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <span className="text-white text-lg">{item.name}</span>
                      </div>
                      <button
                        className="px-4 py-1.5 bg-white text-black rounded-md hover:bg-opacity-90 transition-colors"
                        onClick={() => handleManageContent(item)}
                      >
                        Manage
                      </button>
                    </div>
                  ))}

            
                </div>
                <div className="w-full items-center flex justify-center my-10">
                    <button className="w-12 h-12 flex items-center justify-center bg-secondary rounded-lg hover:bg-opacity-80 hover:text-secondary hover transition-colors">
                      <span
                        className="text-black text-3xl"
                        onClick={() => handleAdd("content")}
                      >
                        +
                      </span>
                    </button>
                  </div>
              </SwiperSlide>
            </Swiper>
          </div>
          </>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
