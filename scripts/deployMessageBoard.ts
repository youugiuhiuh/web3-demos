import { ethers } from "hardhat";

async function main() {
  console.log("Starting MessageBoard deployment...");

  // 1. Deploy the contract
  const MessageBoard = await ethers.getContractFactory("MessageBoard");
  const messageBoard = await MessageBoard.deploy();

  console.log("Waiting for deployment confirmation...");
  await messageBoard.waitForDeployment();

  const targetAddress = await messageBoard.getAddress();
  
  // 2. Set an initial message right after deployment to verify it works
  console.log(`MessageBoard deployed to: ${targetAddress}`);
  console.log("Setting initial message on-chain...");

  const tx = await messageBoard.setMessage("Hello, Sepolia! 🚀");
  console.log(`Waiting for transaction receipt: ${tx.hash}`);
  await tx.wait(); // Wait for 1 block confirmation
  
  // 3. Verify it was set
  const currentMsg = await messageBoard.getMessage();
  console.log(`✅ Deployment complete. Current Message reads: "${currentMsg}"`);
}

// Hardhat execution pattern
main().catch((error) => {
  console.error("❌ Error during deployment:", error);
  process.exitCode = 1;
});
