'use client'

import React from 'react'
import { useWalletKit } from './WalletKitProvider'

const WalletKitButton: React.FC = () => {
  const { connect, disconnect, isConnected, accounts, isInitialized } = useWalletKit()

  if (!isInitialized) {
    return (
      <button
        disabled
        className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
      >
        Initializing...
      </button>
    )
  }

  if (isConnected && accounts.length > 0) {
    const shortAddress = `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`
    
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">
          Connected: {shortAddress}
        </span>
        <button
          onClick={disconnect}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={connect}
      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
    >
      Connect Wallet
    </button>
  )
}

export default WalletKitButton
