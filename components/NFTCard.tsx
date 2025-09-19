'use client';

import { useState } from 'react';
import { NFTMintCard } from './NFTMintCard';

interface NFTCardProps {
  contractAddress: `0x${string}`;
  tokenId?: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export function NFTCard({ contractAddress, tokenId, title, description, imageUrl }: NFTCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            {isExpanded ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        
        {imageUrl && (
          <div className="mb-4">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}
        
        {isExpanded && (
          <div className="mt-4">
            <NFTMintCard
              contractAddress={contractAddress}
              tokenId={tokenId}
              className="w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
