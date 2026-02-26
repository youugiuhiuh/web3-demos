<div align="center">
  <img src="https://img.shields.io/badge/Web3-100000?style=for-the-badge&logo=Web3.js&logoColor=white" alt="Web3" />
  <img src="https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white" alt="Solidity" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  
  <br />
  <br />

  <h1 align="center">✨ Web3 Introductory Demos ✨</h1>

  <p align="center">
    <strong>My introductory demo project into the world of Decentralized Applications (dApps).</strong>
  </p>
</div>

<br />

## 🚀 Overview

Welcome to my Web3 laboratory! This repository serves as a foundational learning environment showcasing modern Web3 full-stack architecture. It features a fully-functional **Decentralized MessageBoard** running on the Ethereum Sepolia Testnet, completely integrated with a sleek, responsive Next.js frontend.

### 🌟 Key Features

- **Smart Contracts**: Gas-optimized Solidity (`^0.8.20`) with Checks-Effects-Interactions (CEI) patterns.
- **Frontend App**: Server-Side Rendering (SSR) safe dynamic loading using Wagmi v2 + Next.js App Router logic in Pages.
- **Wallet Connection**: Seamless onboarding via RainbowKit.
- **Agentic Workflows**: Integrated custom Claude Code Skills (`web3-dev`, `dapp-dev`, `smart-contract-dev`).

---

## 📂 Project Architecture

```graphql
📦 web3-demos
 ┣ 📂 contracts/        # 📜 Solidity Smart Contracts (MessageBoard.sol)
 ┣ 📂 scripts/          # ⚙️ Hardhat deployment automation scripts
 ┣ 📂 frontend/         # 💻 Next.js Web3 Frontend
 ┃ ┣ 📂 components/     # UI & Wagmi/RainbowKit Connection Providers
 ┃ ┣ 📂 pages/          # Next.js Routes & Tailwind-styled UI
 ┃ ┗ 📂 utils/          # Contract ABIs and Constants
 ┣ 📂 .agents/          # 🤖 Autonomous Web3 Skill definitions
 ┗ 📜 hardhat.config.ts # Network & Compiler configs
```

---

## 🛠️ Getting Started

### 1. Smart Contract Deployment (Sepolia)

First, let's get your contracts on-chain!

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Configure your environment:

   ```bash
   cp .env.example .env
   ```

   _Edit `.env` and add your Alchemy/Infura RPC URL and your Wallet's Private Key._

3. Compile the Solidity code:
   ```bash
   npx hardhat compile
   ```
4. Deploy to the Sepolia test network and seed the initial message:
   ```bash
   npx hardhat run scripts/deployMessageBoard.ts --network sepolia
   ```

### 2. Frontend Launch

Connect the blockchain to the UI.

1. Copy the deployed contract address output from the previous step.
2. Update `messageBoardAddress` in `frontend/utils/contracts.ts` with your new address.
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
4. Ignite the development server:
   ```bash
   npm run dev
   ```
5. Navigate to [http://localhost:3000](http://localhost:3000). Connect your wallet, read the timeline, and leave your permanent mark on the blockchain! 🚀

---

<div align="center">
  <i>Built with ☕ and Decentralization</i>
</div>
