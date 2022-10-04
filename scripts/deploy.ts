import { ethers, upgrades } from "hardhat";

async function main() {
  const Storage = await ethers.getContractFactory("Storage");
  console.log("Deploying Storage...");
  const storage = await upgrades.deployProxy(Storage, [42], {
    initializer: "store",
  });
  await storage.deployed();
  console.log("Storage deployed to:", storage.address);
}

main();
