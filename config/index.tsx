import { createConfig, http } from 'wagmi'
import { mainnet, base, baseSepolia } from 'wagmi/chains'
import { cookieStorage, createStorage } from 'wagmi'

// Get projectId from https://dashboard.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [mainnet, base, baseSepolia]

// Set up Wagmi Config for WalletKit
export const config = createConfig({
  chains: networks,
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
})
