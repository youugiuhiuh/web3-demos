import { ethers } from "hardhat";

async function main() {
  const initialMessage = "Hello, Web3!";
  
  const greeting = await ethers.deployContract("Greeting", [initialMessage]);

  await greeting.waitForDeployment();

  console.log(`Greeting deployed to ${greeting.target} with message: "${initialMessage}"`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
