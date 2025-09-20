'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Core } from '@walletconnect/core'
import { Web3Wallet } from '@walletconnect/web3wallet'
import { buildApprovedNamespaces, getSdkError } from '@walletconnect/utils'
import { projectId } from '@/config'

interface WalletKitContextType {
  web3wallet: Web3Wallet | null
  isInitialized: boolean
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  isConnected: boolean
  accounts: string[]
}

const WalletKitContext = createContext<WalletKitContextType | undefined>(undefined)

export const useWalletKit = () => {
  const context = useContext(WalletKitContext)
  if (!context) {
    throw new Error('useWalletKit must be used within a WalletKitProvider')
  }
  return context
}

interface WalletKitProviderProps {
  children: React.ReactNode
}

export const WalletKitProvider: React.FC<WalletKitProviderProps> = ({ children }) => {
  const [web3wallet, setWeb3wallet] = useState<Web3Wallet | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [accounts, setAccounts] = useState<string[]>([])

  useEffect(() => {
    const initWallet = async () => {
      try {
        if (!projectId) {
          throw new Error('Project ID is not defined')
        }

        const core = new Core({
          projectId,
        })

        const web3wallet = await Web3Wallet.init({
          core,
          metadata: {
            name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || 'NFT Mint App',
            description: 'A beautiful NFT minting application built with OnchainKit and WalletKit',
            url: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
            icons: ['https://avatars.githubusercontent.com/u/179229932'],
          },
        })

        setWeb3wallet(web3wallet)
        setIsInitialized(true)

        // Set up event listeners
        web3wallet.on('session_proposal', async (proposal) => {
          try {
            const approvedNamespaces = buildApprovedNamespaces({
              proposal: proposal.params,
              supportedNamespaces: {
                eip155: {
                  chains: ['eip155:1', 'eip155:8453', 'eip155:84532'], // Ethereum, Base, Base Sepolia
                  methods: ['eth_sendTransaction', 'personal_sign', 'eth_signTypedData'],
                  events: ['accountsChanged', 'chainChanged'],
                  accounts: [], // Will be populated when user connects
                },
              },
            })

            await web3wallet.approveSession({
              id: proposal.id,
              namespaces: approvedNamespaces,
            })

            setIsConnected(true)
            // Extract accounts from the approved session
            const session = web3wallet.getActiveSessions()
            const sessionValues = Object.values(session)
            if (sessionValues.length > 0) {
              const sessionAccounts = sessionValues[0].namespaces.eip155?.accounts || []
              setAccounts(sessionAccounts)
            }
          } catch (error) {
            console.error('Session proposal error:', error)
            await web3wallet.rejectSession({
              id: proposal.id,
              reason: getSdkError('USER_REJECTED'),
            })
          }
        })

        web3wallet.on('session_delete', () => {
          setIsConnected(false)
          setAccounts([])
        })

        // Check if already connected
        const activeSessions = web3wallet.getActiveSessions()
        if (Object.keys(activeSessions).length > 0) {
          setIsConnected(true)
          const sessionValues = Object.values(activeSessions)
          if (sessionValues.length > 0) {
            const sessionAccounts = sessionValues[0].namespaces.eip155?.accounts || []
            setAccounts(sessionAccounts)
          }
        }
      } catch (error) {
        console.error('Failed to initialize WalletKit:', error)
      }
    }

    initWallet()
  }, [])

  const connect = async () => {
    if (!web3wallet) return

    try {
      const { uri, approval } = await web3wallet.core.pairing.create({
        requiredNamespaces: {
          eip155: {
            methods: ['eth_sendTransaction', 'personal_sign', 'eth_signTypedData'],
            chains: ['eip155:1', 'eip155:8453', 'eip155:84532'],
            events: ['accountsChanged', 'chainChanged'],
          },
        },
      })

      if (uri) {
        // Open QR code modal or deep link
        if (typeof window !== 'undefined') {
          // For now, we'll just log the URI - in a real app you'd show a QR code
          console.log('WalletConnect URI:', uri)
          // You could integrate with a QR code library here
        }
      }

      const session = await approval()
      setIsConnected(true)
      
      if (session.namespaces.eip155?.accounts) {
        setAccounts(session.namespaces.eip155.accounts)
      }
    } catch (error) {
      console.error('Connection error:', error)
    }
  }

  const disconnect = async () => {
    if (!web3wallet) return

    try {
      const activeSessions = web3wallet.getActiveSessions()
      for (const session in activeSessions) {
        await web3wallet.disconnectSession({
          topic: session,
          reason: getSdkError('USER_DISCONNECTED'),
        })
      }
      setIsConnected(false)
      setAccounts([])
    } catch (error) {
      console.error('Disconnect error:', error)
    }
  }

  const value: WalletKitContextType = {
    web3wallet,
    isInitialized,
    connect,
    disconnect,
    isConnected,
    accounts,
  }

  return (
    <WalletKitContext.Provider value={value}>
      {children}
    </WalletKitContext.Provider>
  )
}
