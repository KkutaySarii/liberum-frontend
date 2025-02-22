import React from 'react'

import NavbarHome from '@/components/NavbarHome'


const Home = () => {
  return (
    <div className='w-full h-screen overflow-hidden bg-dark'>
      <NavbarHome/>
      <div className='w-full h-full flex justify-center items-center text-white'>
        <h1 className='text-2xl font-semibold mb-2'>mammothon.lib</h1>
      </div>
    </div>
  )
}

export default Home