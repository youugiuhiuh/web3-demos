# Web3 Demos

This is my introductory demo project.

## Project Structure

- `contracts/` - Solidity smart contracts (e.g., `MessageBoard.sol`)
- `scripts/` - Hardhat deployment scripts
- `frontend/` - Next.js dApp frontend with Wagmi and RainbowKit
- `.agents/` - Custom Claude Code skills (`web3-dev`, `dapp-dev`, `smart-contract-dev`) built for this project

## Getting Started

### 1. Smart Contract Deployment (Sepolia)

1. Copy `.env.example` to `.env` and fill in your Alchemy/Infura RPC URL and Wallet Private Key.
2. Compile the contracts:
   ```bash
   npx hardhat compile
   ```
3. Deploy to Sepolia:
   ```bash
   npx hardhat run scripts/deployMessageBoard.ts --network sepolia
   ```

### 2. Frontend Development

1. Update the deployed contract address in `frontend/utils/contracts.ts`.
2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the dApp.
