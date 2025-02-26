import {ethers, BrowserProvider, Contract } from 'ethers';
import { useState } from 'react';
import { domainContractABI , domainContractAddress} from '@/contracts/domain-contract/abi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const CONTRACT_ADDRESS = domainContractAddress;

export const useContract = () => {
  const [contract, setContract] = useState<Contract | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const account = useSelector((state: RootState) => state.wallet.account);

  const connectToContract = async () => {
    if (isConnecting || !account) return;
    
    setIsConnecting(true);
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask');
      }

      const newProvider = new BrowserProvider(window.ethereum);
      const signer = await newProvider.getSigner();
      
      const newContract = new Contract(
        CONTRACT_ADDRESS,
        domainContractABI,
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