"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { SearchResults, Content } from '@/types/walletAccount';
import NavbarMint from '@/components/NavbarMint'
import { setSelectedBlockspace, setSelectedContent } from '@/store/features/walletSlice'
import Union from '@/assets/Union (1).svg'

const DashboardPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('blockspace')
  const { blockspaces, contents } = useSelector((state: RootState) => state.wallet)



  const handleManageBlockspace = (item: SearchResults) => {
    dispatch(setSelectedBlockspace(item))
    router.push(`/dashboard/manage/manage-blockspace`)
  }

  const handleManageContent = (item: Content) => {
    dispatch(setSelectedContent(item))
    router.push(`/dashboard/manage/manage-content`)
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
                  {blockspaces.map((item, index) => (
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
                    <span className="text-black text-3xl" onClick={() => router.push('/mint')}>+</span>
                  </button>
                  </div>
                </div>
              </SwiperSlide>
              
              <SwiperSlide>
              <div className="space-y-4">
                  {contents.map((item, index) => (
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
                    <span className="text-black text-3xl" onClick={() => router.push('/mint')}>+</span>
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