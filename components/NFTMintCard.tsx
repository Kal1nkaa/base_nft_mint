'use client';

import { NFTMintCard as OnchainKitNFTMintCard } from '@coinbase/onchainkit/nft';
import { NFTMedia } from '@coinbase/onchainkit/nft/view';
import {
  NFTCreator,
  NFTCollectionTitle,
  NFTQuantitySelector,
  NFTAssetCost,
  NFTMintButton,
} from '@coinbase/onchainkit/nft/mint';
import type { LifecycleStatus } from '@coinbase/onchainkit/nft';

interface NFTMintCardProps {
  contractAddress: `0x${string}`;
  tokenId?: string;
  className?: string;
}

export function NFTMintCard({ contractAddress, tokenId, className }: NFTMintCardProps) {
  const handleStatusChange = (status: LifecycleStatus) => {
    const { statusName, statusData } = status;
    console.log('NFT Status:', statusName, statusData);
    
    switch (statusName) {
      case 'success':
        console.log('NFT minted successfully!');
        alert('NFT minted successfully! Check your wallet.');
        break;
      case 'error':
        console.error('Error minting NFT:', statusData);
        alert(`Error minting NFT: ${statusData?.message || 'Unknown error'}`);
        break;
      case 'transactionPending':
        console.log('Transaction pending...');
        alert('Transaction pending... Please wait.');
        break;
      case 'mediaLoading':
        console.log('Loading NFT data...');
        break;
      case 'mediaLoaded':
        console.log('NFT data loaded successfully');
        break;
      default:
        break;
    }
  };

  const handleError = (error: any) => {
    console.error('NFTMintCard Error:', error);
    alert(`Error: ${error?.message || 'Failed to load NFT data. Please check your API key and contract address.'}`);
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <OnchainKitNFTMintCard
        contractAddress={contractAddress}
        tokenId={tokenId}
        onStatus={handleStatusChange}
        onError={handleError}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      >
        <NFTMedia className="w-full h-64 object-cover" />
        <div className="p-6 space-y-4">
          <NFTCreator className="text-sm text-gray-600 dark:text-gray-400" />
          <NFTCollectionTitle className="text-xl font-bold text-gray-900 dark:text-white" />
          <NFTQuantitySelector className="flex items-center space-x-2" />
          <NFTAssetCost className="text-lg font-semibold text-gray-900 dark:text-white" />
          <NFTMintButton className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200" />
        </div>
      </OnchainKitNFTMintCard>
    </div>
  );
}
