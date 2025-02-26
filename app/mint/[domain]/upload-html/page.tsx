'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import {useRouter, useParams } from 'next/navigation'
import NavbarMint from '@/components/NavbarMint'
import UploadIcon from "@/assets/cloud.svg"
import UploadIconWhite from "@/assets/cloudwhite.svg"
import FileIcon from "@/assets/file.svg"
import LoadingIcon from "@/assets/loading.svg"
import CloseIcon from "@/assets/close.svg"
import Union from "@/assets/Union (1).svg"
import {  useDispatch } from 'react-redux'
import { setSelectedContent } from '@/store/features/walletSlice'
import { useHtmlContract } from '@/hooks/useHtmlContract'
import { ethers } from 'ethers'

const UploadHtmlPage = () => {
  const [fileEnter, setFileEnter] = useState(false)
  const [fileName, setFileName] = useState<string>("")
  const [fileSize, setFileSize] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)
  const [uploading, setUploading] = useState<boolean>(false)
  const [prices, setPrices] = useState({
    network: "0",
    total: "0"
  })
  const router = useRouter()
  const params = useParams()
  const domain = Array.isArray(params.domain) ? params.domain[0] : params.domain

  const dispatch = useDispatch()
  const { contract, callContractMethod, provider } = useHtmlContract()
  const [htmlContent, setHtmlContent] = useState<string>('')

  const handleFileRead = async (file: File) => {
    if (!file.name.endsWith('.html')) {
      alert('Please select an HTML file')
      return
    }

    setFileName(file.name)
    setFileSize(file.size)
    setUploading(true)
    setProgress(0)

    try {
      const content = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          resolve(e.target?.result as string)
        }
        reader.readAsText(file)
      })

      setHtmlContent(content)

      if (contract && provider) {
        console.log({content})
        console.log({file})
      
        const estimateGas = await contract.createPage.estimateGas(content, file.name)
        const networkFee = await provider.getFeeData()
        
        if (networkFee?.gasPrice) {
          const estimatedGasPrice = networkFee.gasPrice * estimateGas
          setPrices({
            network: ethers.formatEther(estimatedGasPrice),
            total: ethers.formatEther(estimatedGasPrice)
          })
        }
      }

      for (let i = 0; i <= 100; i += 20) {
        setProgress(i)
        await new Promise(resolve => setTimeout(resolve, 500))
      }

      dispatch(setSelectedContent({
        name: file.name,
        image: Union,
        linkedBlockspace: null,
        owner: '',
        contractAddress: ''
      }))

    } catch (error) {
      console.error('Upload error:', error)
      setUploading(false)
    }
  }

  const formatFileSize = (size: number) => {
    if (size >= 1024 * 1024) {
      return (size / (1024 * 1024)).toFixed(2) + " MB"
    } else if (size >= 1024) {
      return (size / 1024).toFixed(2) + " KB"
    } else {
      return size + " Bytes"
    }
  }
  const handleButtonClick = () => {
    handleUpload()
  }
  const handleCloseUpload = () => {
    setFileEnter(false)
    setFileName('')
    setFileSize(0)
    setProgress(0)
    setUploading(false)
    setHtmlContent('')
  }

  const handleUpload = async () => {
    try {
      if (!domain) {
        throw new Error('Domain name is required')
      }
      if (!htmlContent) {
        throw new Error('HTML content is required')
      }

      const tx = await callContractMethod(
        'createPage',
        htmlContent,
        fileName
      )

      if (!tx?.hash) {
        throw new Error('Transaction failed')
      }

      const receipt = await provider?.waitForTransaction(tx.hash)

      if (receipt) {
        const pageCreatedEvent = receipt.logs.find(log => 
          log.topics[0] === contract?.interface.getEvent('PageCreated')?.format()
        )

        if (pageCreatedEvent) {
          const parsedLog = contract?.interface.parseLog(pageCreatedEvent)
          const pageAddress = parsedLog?.args[0]
          console.log('Page Address:', pageAddress)
          
          if (pageAddress) {
            router.push(`/mint/${domain}/${fileName}?address=${pageAddress}`)
          }
        }
      }
    } catch (err) {
      console.error('Upload error:', err)
    }
  }

  return (
    <div className='w-full h-screen bg-dark overflow-hidden'>
      <NavbarMint />

      <main className="container max-w-3xl mx-auto mt-12">
        <div className='pt-32 text-center'> 
            {uploading ? (
                <h1 className="text-5xl font-bold  text-start">Deploy Content </h1>
            ) : (
                <h1 className="text-5xl font-bold  text-start">Upload HTML Document</h1>
            )}

          <div className="max-w-3xl mx-auto mt-6  rounded-2xl overflow-hidden">
            <div className={`pb-6 px-6 flex items-stretch justify-between border-b border-white mb-2 ${uploading ? "hidden" : "block"}`} >
              <div className="flex items-stretch gap-x-4">
                <div className='bg-white rounded-full border border-[#CBD0DC] p-3'>
                <Image src={UploadIcon} alt="upload-icon" width={32} height={32} />
                </div>
                
                <div className="flex flex-col h-full justify-around">
                  <p className="text-xl font-bold text-start">Upload files</p>
                  <p className="text-[#A9ACB4] text-start">Select and upload the files of your choice</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {!uploading ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault()
                    setFileEnter(true)
                  }}
                  onDragLeave={() => setFileEnter(false)}
                  onDrop={(e) => {
                    e.preventDefault()
                    setFileEnter(false)
                    if (e.dataTransfer.files.length > 0) {
                      handleFileRead(e.dataTransfer.files[0])
                    }
                  }}
                  className={`${
                    fileEnter ? "border-3" : "border-2"
                  } border-dashed border-white py-12 rounded-2xl [border-spacing:18px] `}
                >
                  <label htmlFor="file" className="w-full h-full cursor-pointer">
                    <div className="flex flex-col items-center gap-y-6">
                      <Image src={UploadIconWhite} alt="upload-icon" width={40} height={40} />
                      <div className="flex flex-col items-center">
                        <p className="text-lg font-bold mb-2">Choose a file or drag & drop it here</p>
                        <p className="text-[#727272]">HTML, up to 50KB</p>
                      </div>
                      <div className="bg-secondary px-6 py-2 rounded-lg text-black font-normal hover:bg-opacity-90 transition-colors">
                        Browse File
                      </div>
                    </div>
                  </label>
                  <input
                    id="file"
                    type="file"
                    accept=".html"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileRead(e.target.files[0])
                      }
                    }}
                  />
                </div>
              ) : (
                <div>
                <div className="border-2 border-dashed border-white rounded-2xl [border-spacing:18px] pt-4 px-4 pb-4 flex flex-col relative justify-between">
                  <div className="flex items-stretch gap-x-3">
                    <Image src={FileIcon} alt="html" width={96} height={96} />
                    <Image src={CloseIcon} alt="close" width={28} height={28} className='cursor-pointer absolute top-6 right-6' onClick={handleCloseUpload}/>
                    <div className="flex flex-col justify-around">
                      <p className="text-lg font-bold text-start">{fileName}</p>
                      <div className="flex items-center text-gray-400 gap-2 text-start">
                        <span>{formatFileSize(fileSize)}</span>
                        <span className="mx-2">•</span>
                        <Image src={LoadingIcon} alt="loading" width={20} height={20} className={`${progress < 100 ? "animate-spin" : ""}`}/>
                        {progress < 100 ? <span className="text-gray-400">Uploading...</span> : <span className="text-gray-400">Done</span>}
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-4">
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-primary bg-opacity-30">
                        <div
                          style={{ width: `${progress}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-300"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                                    <div className="max-w-md mx-auto mt-12">
                                    <div className="flex justify-between items-center mb-4 text-gray-400">
                                      <span >Hosting Fee </span>
                                      <span className='text-[#82E14B]'>Free</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-4 text-gray-400">
                                      <span className="text-gray-400">Est. Network Fee</span>
                                      <span>{prices.network} ETH</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-8 pt-2">
                                      <span>Estimated Total</span>
                                      <span>{prices.total} ETH</span>
                                    </div>
                                 <div className='w-full flex justify-center items-center'>
                                    <button 
                                      disabled={!htmlContent || !fileName || progress < 100}
                                      onClick={handleButtonClick}
                                      className="w-1/2 bg-secondary hover:bg-secondary/90 text-black font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                    Deploy
                                    </button>
                                    </div> 
                                  </div>
                                  </div>

              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default UploadHtmlPage