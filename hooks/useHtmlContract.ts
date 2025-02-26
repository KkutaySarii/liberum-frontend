import {ethers, BrowserProvider, Contract } from 'ethers';
import { useState, useEffect } from 'react';
import { htmlContractABI, htmlContractAddress } from '@/contracts/html-page-factory/abi';

const CONTRACT_ADDRESS = htmlContractAddress;

export const useHtmlContract = () => {
  const [contract, setContract] = useState<Contract | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    connectToContract();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connectToContract = async () => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask');
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      
      const newProvider = new BrowserProvider(window.ethereum);
      const signer = await newProvider.getSigner();
      
      const newContract = new Contract(
        CONTRACT_ADDRESS,
        htmlContractABI,
        signer
      );
      
      setContract(newContract);
      setProvider(newProvider);
      setError(null);
      return newContract;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed');
      return null;
    } finally {
      setIsConnecting(false);
    }
  };

  const callContractMethod = async (
    methodName: string, 
    ...args: (string | number | { value: bigint })[]
  ): Promise<ethers.ContractTransactionResponse> => {
    try {
      if (!contract) {
        const newContract = await connectToContract();
        if (!newContract) throw new Error('Contract connection failed');
        return await newContract[methodName](...args);
      }

      const tx = await contract[methodName](...args);
      const receipt = await tx.wait();
      
      return receipt;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed');
      throw err;
    }
  };

  return {
    contract,
    provider,
    error,
    isConnecting,
    connectToContract,
    callContractMethod
  };
}; 