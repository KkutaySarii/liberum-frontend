"use client"
import NavbarMint from '@/components/NavbarMint'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Union from '@/assets/Union (1).svg'
import ChangeModal from '@/components/ChangeModal'
import simpleIcon from '@/assets/Ellipse.svg'
import { storage, StorageKeys } from '@/utils/storage'
//import { useSearchParams } from 'next/navigation'
import { useContract } from '@/hooks/useContract'
import { useRouter } from 'next/navigation'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'
import { useHtmlContract } from '@/hooks/useHtmlContract'
import { ethers } from 'ethers'


const LinkBlockspacePage = () => {
  const router = useRouter()
  //const searchParams = useSearchParams()
  const pageAddress = "pageAddress" //TODO: get from kaydedilmiş contentlerden 
  const [tokenId, setTokenId] = useState<string | null>(null)
    const { contract ,provider} = useContract()
    const { contract: htmlContract ,callContractMethod:callHtmlContractMethod,provider:htmlProvider} = useHtmlContract()
    const account = useSelector((state: RootState) => state.wallet.account)
  const [prices, setPrices] = useState({
      network: '0',
      total: '0'
    })
  const selectedDomain = storage.get(StorageKeys.SELECTED_DOMAIN)
const selectedFile = storage.get(StorageKeys.SELECTED_FILE)
    const [openChangeModal, setOpenChangeModal] = useState(false)
    const [modalType, setModalType] = useState<'blockspace' | 'content'>('blockspace')
    
  useEffect(() => {
    console.log({pageAddress})
    console.log({tokenId})
  }, [pageAddress, tokenId])

  useEffect(() => {
    const fetchTokenId = async () => {
      console.log({contract});
      console.log({provider});
      if (!contract || !provider) return;
      
      try {
        console.log('girdi')
        const tokenId = await contract.getTokenIdByDomain(selectedDomain?.name)
        setTokenId(tokenId)
      } catch (err) {
        console.error('Error fetching prices:', err)
      }
    } 
    fetchTokenId() 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract])
  useEffect(() => {
    const fetchPrices = async () => {
      if (!htmlContract || !htmlProvider || !pageAddress || !tokenId) {
        console.log('Missing required values:', { 
          hasContract: !!htmlContract, 
          hasProvider: !!htmlProvider,
          pageAddress,
          tokenId 
        });
        return;
      }
      
      try {
        const estimateGas = await htmlContract.linkDomain.estimateGas(
          pageAddress,
          tokenId.toString()
        );

        const networkFee = await htmlProvider.getFeeData();
        if (!networkFee?.gasPrice) return;

        const estimatedGasPrice = networkFee.gasPrice * estimateGas;
        setPrices({
          network: ethers.formatEther(estimatedGasPrice),
          total: ethers.formatEther(estimatedGasPrice)
        });
      } catch (err) {
        console.error('Error fetching prices:', err);
      }
    };

    fetchPrices();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [htmlContract, pageAddress, tokenId]);
  const handleLink = async () => {
    try {
      if (!pageAddress) {
        throw new Error('Contract address is required')
      }
      if (!tokenId) {
        throw new Error('Token ID is required')
      }
      
      const tx = await callHtmlContractMethod(
        'linkDomain',
        pageAddress,
        tokenId
      )
      console.log({tx})
      console.log('Upload transaction:', tx)
      router.push(`/mint/domain/content/success`)
    } catch (err) {
      console.error('Upload error:', err)
    }
  }



    const handleOpenModal = (type: 'blockspace' | 'content') => {
        setModalType(type)
        setOpenChangeModal(true)
    }
    return (
        <div className='w-full min-h-screen bg-dark overflow-hidden '>
      <NavbarMint />
      
      <main className="container max-w-5xl mx-auto mt-8">
        <div className='pt-24 text-center'> 
          <h1 className="text-5xl font-bold mb-6">Link Now </h1>
          <p className="text-gray-300 mb-6 text-lg mt-8">Once you link it, your content will be visible on your blockspace</p>

          <div className="flex items-center justify-center gap-8 mb-10">

            <div className="flex flex-col items-center">
            {selectedDomain && selectedDomain ? (
                                <div className="w-40 h-40 rounded-full overflow-hidden">
                                    <Image 
                                        src={simpleIcon} 
                                        alt="icon"  
                                        width={160}
                                        height={160}
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                            ) : (
                                <div className="w-40 h-40 bg-primary rounded-full"></div>
                            )}
              <span className="text-white underline text-2xl">{selectedDomain?.name}</span>
              <button 
                                className="px-3 py-1 bg-white text-black rounded-md hover:bg-opacity-90 transition-colors mt-3 text-sm font-semibold" 
                                onClick={() => handleOpenModal('blockspace')}
                            >
                                Change
                            </button>
            </div>

            <div className="w-20 h-[4px] bg-white mt-[-20px] rounded-full"></div>

            <div className="flex flex-col items-center ">
              <div className="w-40 h-40 flex items-center justify-center">
              <Image src={Union} alt="icon"  className='object-cover' />
              </div>
              <span className="text-white underline text-2xl">{selectedFile?.name}</span>
              <button className="px-3 py-1 bg-white text-black rounded-md hover:bg-opacity-90 transition-colors text-sm font-semibold mt-3" onClick={() => handleOpenModal('content')}>
                                Change
                            </button>
            </div>
          </div>
          <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-4 text-gray-400">
            <span>Link Fee</span>
            <span className='text-[#82E14B]'>Free</span>
          </div>
          <div className="flex justify-between items-center mb-4 text-gray-400">
            <span>Est. Network Fee</span>
            <span>{prices.network} ETH</span>
          </div>
          <div className="flex justify-between items-center mb-8 pt-2">
            <span>Estimated Total</span>
            <span>{prices.total} ETH</span>
          </div>
  
        </div>

          <div className="flex justify-center gap-8 max-w-xl mx-auto">
            <button 
            disabled={!account || !selectedDomain || !selectedFile}
            onClick={handleLink}
              className="w-1/3 py-3 bg-secondary text-black rounded-lg hover:bg-opacity-90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
             Link
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
    )
}

export default LinkBlockspacePage