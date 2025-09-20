'use client';

import WalletKitButton from './WalletKitButton';

export function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              NFT Mint App
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <WalletKitButton />
          </div>
        </div>
      </div>
    </header>
  );
}
