import { ethers, upgrades } from "hardhat";

async function main() {
  const StorageV2 = await ethers.getContractFactory("StorageV2");
  console.log("Upgrading Storage...");
  await upgrades.upgradeProxy(
    "0xe74475AA370AD0bfE7F69C68Ebcf978b14Ca1860",
    StorageV2
  );
  console.log("Storage upgraded");
}

main();
