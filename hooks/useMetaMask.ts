'use client'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAccount } from '@/store/features/walletSlice'
import type { AppDispatch } from '@/store/store'
import { storage, StorageKeys } from '@/utils/storage'

type EthereumWindow = {
  ethereum?: {
    request: (args: { method: string }) => Promise<string[]>;
    on: (event: string, handler: (accounts: string[]) => void) => void;
    removeListener: (event: string, handler: () => void) => void;
  }
}

interface MetaMaskError extends Error {
  code: number;
}

export const useMetaMask = () => {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isOpen, setIsOpen] = useState(false) 
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const { ethereum } = window as EthereumWindow
    if (ethereum) {
      ethereum.on('accountsChanged', (accounts: string[]) => {
        dispatch(setAccount(accounts[0] || ''))
      })
    }

    return () => {
      if (ethereum) {
        ethereum.removeListener('accountsChanged', () => {})
      }
    }
  }, [dispatch])

  const connect = async () => {
    try {
      setIsConnecting(true)
      const { ethereum } = window as EthereumWindow

      if (!ethereum) {
        alert("MetaMask yüklü değil! Lütfen MetaMask yükleyin.")
        window.open('https://metamask.io/download/', '_blank')
        return
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      dispatch(setAccount(accounts[0]))
    } catch (error: unknown) {
      const metamaskError = error as MetaMaskError
      if (metamaskError.code === 4001) {
        alert("Cüzdan bağlantısı reddedildi. Bağlanmak için tekrar deneyin.")
      } else {
        console.error("Bağlantı hatası:", error)
        alert("Bağlantı sırasında bir hata oluştu.")
      }
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = () => {
    dispatch(setAccount(''))
    setIsOpen(false)
    storage.remove(StorageKeys.SELECTED_DOMAIN)
    storage.remove(StorageKeys.SELECTED_FILE)
  }

  return { connect, disconnect, isConnecting, isOpen, setIsOpen }
} 