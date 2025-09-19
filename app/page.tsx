'use client';

import { Header } from '@/components/Header';
import { NFTCard } from '@/components/NFTCard';
import { NFTMintCard } from '@/components/NFTMintCard';
import { DebugInfo } from '@/components/DebugInfo';
import { ApiKeyValidator } from '@/components/ApiKeyValidator';

// Your mintable NFT contract address
const MINTABLE_CONTRACT_ADDRESS = '0xe3c55ce0c0483564BD8a3caF09E3245bF9e54322' as const;

// Example NFT collections for demonstration
const nftCollections = [
  {
    contractAddress: MINTABLE_CONTRACT_ADDRESS,
    title: 'Your NFT Collection',
    description: 'A mintable NFT collection on Ethereum Mainnet. Connect your wallet to mint!',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
  },
  {
    contractAddress: '0x60E4d786628Fea6478F785A6d7e704777c86a7c6' as const, // Mutant Ape Yacht Club
    title: 'Mutant Ape Yacht Club',
    description: 'A collection of 20,000 Mutant Apes on Ethereum Mainnet.',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
  },
  {
    contractAddress: '0x49cF6f5d4E2250E7a9Dd559a5F85f8f5C335d8e9' as const, // CloneX
    title: 'CloneX',
    description: 'Next-gen Avatars for the metaverse on Ethereum Mainnet.',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=300&fit=crop',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Discover & Mint NFTs
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore unique NFT collections and mint your own digital assets on the blockchain.
            Connect your wallet to get started.
          </p>
        </div>

        {/* Featured NFT - Direct Mint */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Featured: Your NFT Collection
          </h2>
          <div className="flex justify-center">
            <NFTMintCard
              contractAddress={MINTABLE_CONTRACT_ADDRESS}
              className="w-full max-w-md"
            />
          </div>
        </div>

        {/* NFT Collections Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Available Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nftCollections.map((collection, index) => (
              <NFTCard
                key={index}
                contractAddress={collection.contractAddress}
                title={collection.title}
                description={collection.description}
                imageUrl={collection.imageUrl}
              />
            ))}
          </div>
        </div>

        {/* How it Works Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Connect Wallet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Connect your crypto wallet to interact with the blockchain.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Choose NFT
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse available NFT collections and select the one you want to mint.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Mint & Own
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Complete the minting process and own your unique digital asset.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 NFT Mint App. Built with OnchainKit and Next.js.</p>
          </div>
        </div>
      </footer>

      {/* Debug Info - Remove in production */}
      <DebugInfo />
      <ApiKeyValidator />
    </div>
  );
}
