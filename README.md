# NFT Mint App

A beautiful NFT minting application built with OnchainKit, WalletKit Web SDK, Next.js, and Tailwind CSS for Ethereum Mainnet.

## Features

- 🎨 Beautiful UI with dark mode support
- 🔗 Wallet Connect integration via WalletKit Web SDK
- 🪙 NFT minting functionality on Ethereum Mainnet
- 📱 Responsive design
- ⚡ Fast and modern React/Next.js stack
- 🔗 Multi-wallet support through Wallet Connect

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A crypto wallet compatible with Wallet Connect (MetaMask, Coinbase Wallet, etc.)
- Ethereum Mainnet support in your wallet

### Setup

1. **Clone and install dependencies:**
   ```bash
   cd nft-mint-app
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory with:
   ```env
   # OnchainKit API Key - Get yours at https://portal.cdp.coinbase.com/products/onchainkit
   NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME=YourAppName
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here

   # WalletConnect Project ID - Get yours at https://dashboard.reown.com/
   NEXT_PUBLIC_PROJECT_ID=your_project_id_here

   # Smart Contract Address on Ethereum Mainnet
   NEXT_PUBLIC_CONTRACT_ADDRESS=0xe3c55ce0c0483564BD8a3caF09E3245bF9e54322
   ```

3. **Get your API keys:**
   - **OnchainKit API Key**: Visit [Coinbase Developer Platform](https://portal.cdp.coinbase.com/products/onchainkit)
   - **WalletConnect Project ID**: Visit [Reown Dashboard](https://dashboard.reown.com/) for Wallet Connect integration

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Smart Contract Integration

This app works with your mintable NFT contract on Ethereum Mainnet:
- **Your NFT Collection**: `0xe3c55ce0c0483564BD8a3caF09E3245bF9e54322`

The app leverages Ethereum Mainnet for:
- Minting new NFTs from your contract
- Viewing and interacting with existing NFT collections
- Trading and transferring NFTs on Ethereum

## Project Structure

```
nft-mint-app/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── NFTCard.tsx        # NFT collection card
│   └── NFTMintCard.tsx    # NFT minting component
├── config/                # Reown AppKit configuration
│   └── index.tsx          # Wagmi adapter setup for Ethereum Mainnet
├── context/               # React context providers
│   └── index.tsx          # Reown AppKit context provider
└── ...config files
```

## Technologies Used

- **Next.js 15** - React framework
- **OnchainKit** - Web3 UI components for Ethereum Mainnet
- **Reown AppKit** - Wallet Connect integration and wallet connection
- **Wagmi** - Ethereum hooks for Mainnet
- **Viem** - TypeScript interface for Ethereum blockchain
- **Ethereum Mainnet** - Primary blockchain for NFT interactions
- **Wallet Connect** - Multi-wallet connection protocol
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

## Customization

### Adding New NFT Collections

Edit `app/page.tsx` to add new collections to the `nftCollections` array for Ethereum Mainnet:

```typescript
const nftCollections = [
  {
    contractAddress: '0x...' as const, // Ethereum Mainnet contract address
    title: 'Your Collection',
    description: 'Description of your collection on Ethereum Mainnet',
    imageUrl: 'https://example.com/image.jpg',
  },
  // ... more collections for Ethereum Mainnet
];
```

### Styling

The app uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Global styles in `app/globals.css`
- Component styles using Tailwind classes

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Troubleshooting

### Common Issues

1. **"API Key not found"**: Make sure you've set `NEXT_PUBLIC_ONCHAINKIT_API_KEY` in your `.env.local` file
2. **Wallet Connect connection fails**: Ensure you have `NEXT_PUBLIC_PROJECT_ID` set correctly for Reown AppKit
3. **Minting fails on Mainnet**: Check that you're connected to Ethereum Mainnet
4. **Wallet not supported**: Ensure your wallet supports Wallet Connect protocol
5. **Mainnet network issues**: Make sure your wallet is configured for Ethereum Mainnet

### Getting Help

- [OnchainKit Documentation](https://onchainkit.xyz/) - For Ethereum Mainnet integration
- [Reown AppKit Documentation](https://docs.reown.com/) - For Wallet Connect setup
- [Ethereum Documentation](https://ethereum.org/developers/) - For Ethereum Mainnet details
- [Wallet Connect Documentation](https://docs.walletconnect.com/) - For wallet integration
- [Next.js Documentation](https://nextjs.org/docs)

## License

MIT License - feel free to use this project for your own NFT minting applications on Ethereum Mainnet with Wallet Connect integration!
# base_nft_mint
