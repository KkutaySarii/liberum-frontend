"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useRouter } from 'next/navigation'

import { SearchResults, Content } from '@/types/walletAccount';
import NavbarMint from '@/components/NavbarMint'
import Union from '@/assets/Union (1).svg'
import { storage, StorageKeys } from '@/utils/storage'
const DashboardPage = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('blockspace')
 const sampleBlockspaces: SearchResults[] = [
  {
    name: "blockspace1",
    owner: "0x1234...",
    nft_id: "1",
    expire_date: "2025-01-01",
    visit_count: 0,
    linkedContractAddress: "",
    linkedContent: null
  },
  {
    name: "blockspace1",
    owner: "0x1234...",
    nft_id: "1",
    expire_date: "2025-01-01",
    visit_count: 0,
    linkedContractAddress: "",
    linkedContent: null
  },
  {
    name: "blockspace2",
    owner: "0x1234...",
    nft_id: "1",
    expire_date: "2025-01-01",
    visit_count: 0,
    linkedContractAddress: "",
    linkedContent: null
  },
  {
    name: "blockspace3",
    owner: "0x1234...",
    nft_id: "1",
    expire_date: "2025-01-01",
    visit_count: 0,
    linkedContractAddress: "",
    linkedContent: null
  },
 ]
 const sampleContents: Content[] = [
  {
    name: "content1",
    image: Union,
    linkedBlockspace: null,
    owner: "0x1234...",
    contractAddress: ""
  },
  {
    name: "content2",
    image: Union,
    linkedBlockspace: null,
    owner: "0x1234...",
    contractAddress: ""
  },
  {
    name: "content3",
    image: Union,
    linkedBlockspace: null,
    owner: "0x1234...",
    contractAddress: ""
  },
 ]


  const handleManageBlockspace = (item: SearchResults) => {
    storage.set(StorageKeys.SELECTED_DOMAIN, item)
    storage.set(StorageKeys.SELECTED_FILE, null)
    router.push(`/dashboard/manage/manage-blockspace`)
  }

  const handleManageContent = (item: Content) => {
    storage.set(StorageKeys.SELECTED_FILE, item)
    storage.set(StorageKeys.SELECTED_DOMAIN, null)
    router.push(`/dashboard/manage/manage-content`)
  }

  const handleAdd = (type: string) => {
    storage.set(StorageKeys.SELECTED_DOMAIN, null)
    storage.set(StorageKeys.SELECTED_FILE, null)
    if(type === "blockspace"){
      router.push(`/mint/`)
    }else{
      router.push(`/mint/domain/upload`)
    }
  }

  return (
    <div className='w-full min-h-screen bg-dark'>
      <NavbarMint />

      <main className="container max-w-2xl mx-auto px-4">
        <div className='pt-32'> 
          <h1 className="text-4xl font-semibold mb-12 text-center text-white">Your Dashboard</h1>
          
          <div className="tab-pagination flex space-x-8 mb-8 border-b border-gray-800 max-w-xl mx-auto">
            <button 
              className={`text-xl font-medium px-4 pb-2 w-full ${activeTab === 'blockspace' ? 'text-[#F5A051] border-b-2 border-[#F5A051]' : 'text-gray-500'}`}
              onClick={() => setActiveTab('blockspace')}
            >
              Blockspace
            </button>
            <button 
              className={`text-xl font-medium px-4 pb-2 w-full ${activeTab === 'content' ? 'text-[#F5A051] border-b-2 border-[#F5A051]' : 'text-gray-500'}`}
              onClick={() => setActiveTab('content')}
            >
              Content
            </button>
          </div>

          <div className="relative max-w-2xl mx-auto">
            <Swiper
              slidesPerView={1}
              modules={[Pagination]}
              onSlideChange={(swiper) => setActiveTab(swiper.activeIndex === 0 ? 'blockspace' : 'content')}
              onSwiper={(swiper) => {
                document.querySelectorAll('.tab-pagination button').forEach((button, index) => {
                  button.addEventListener('click', () => {
                    swiper.slideTo(index);
                  });
                });
              }}
            >
              <SwiperSlide>
                <div className="space-y-4">
                  {sampleBlockspaces.map((item, index) => (
                    <div key={index} className="flex items-center justify-between  p-4 rounded-lg">
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
                      <button className="px-4 py-1.5 bg-white text-black rounded-md hover:bg-opacity-90 transition-colors" onClick={() => handleManageBlockspace(item)}>
                        Manage
                      </button>
                    </div>
                  ))}
                  
                  <div className='w-full items-center flex justify-center'>
                  <button className="w-12 h-12 flex items-center justify-center bg-secondary rounded-lg hover:bg-opacity-80 hover:text-secondary hover transition-colors">
                    <span className="text-black text-3xl" onClick={() => handleAdd("blockspace")}>+</span>
                  </button>
                  </div>
                </div>
              </SwiperSlide>
              
              <SwiperSlide>
              <div className="space-y-4">
                  {sampleContents.map((item, index) => (
                    <div key={index} className="flex items-center justify-between  p-4 rounded-lg">
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
                      <button className="px-4 py-1.5 bg-white text-black rounded-md hover:bg-opacity-90 transition-colors" onClick={() => handleManageContent(item)}>
                        Manage
                      </button>
                    </div>
                  ))}
                  
                  <div className='w-full items-center flex justify-center'>
                  <button className="w-12 h-12 flex items-center justify-center bg-secondary rounded-lg hover:bg-opacity-80 hover:text-secondary hover transition-colors">
                    <span className="text-black text-3xl" onClick={() => handleAdd("content")}>+</span>
                  </button>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage