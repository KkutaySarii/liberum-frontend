"use client"
import React, { useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import NavbarMint from '@/components/NavbarMint'

const DashboardPage = () => {

  const [activeTab, setActiveTab] = useState('blockspace');

  return (
    <div className='w-full h-screen bg-dark overflow-hidden'>
    <NavbarMint />

    <main className="container max-w-5xl mx-auto mt-12">
      <div className='pt-32 text-center'> 
        <h1 className="text-5xl font-bold mb-6 text-center">Your Dashboard</h1>
     <Swiper
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{
            el: '.tab-pagination',
            clickable: true,
            renderBullet: function (index, className) {
              const texts = ['Blockspace', 'Content'];
              return `<button class="${className} ${
                index ===  (activeTab === 'blockspace' ? 0 : 1)  ? 'text-[#3a0ba3] relative flex justify-between items-center leading-tight' : 'text-[#D4D4D4] leading-tight'
              }  px-4">${texts[index]}</button>`;
            },
          }}
          onSlideChange={(swiper) => setActiveTab(swiper.activeIndex === 0 ? 'blockspace' : 'content')}
        >
        <SwiperSlide className="">
  aaaaaaa
            </SwiperSlide>
            <SwiperSlide className="">
 bbbbbbb
            </SwiperSlide>
            </Swiper>
      </div>

    </main>
    </div>

  )
}
export default DashboardPage;