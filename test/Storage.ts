import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";

let storageAddress: string;

describe("Storage", () => {
  const deployStorageFixture = async () => {
    const [owner] = await ethers.getSigners();
    const Storage = await ethers.getContractFactory("Storage");
    const storage = await upgrades.deployProxy(Storage, [42], {
      initializer: "store",
    });
    await storage.deployed();
    storageAddress = storage.address;
    return { owner, storage };
  };

  const upgradeStorageFixture = async () => {
    const StorageV2 = await ethers.getContractFactory("StorageV2");
    const storageV2 = await upgrades.upgradeProxy(storageAddress, StorageV2);
    return { storageV2 };
  };

  describe("Storage V1", () => {
    it("Should successfully store a 42 value", async () => {
      const { storage } = await loadFixture(deployStorageFixture);
      await expect(storage.store(42))
        .to.emit(storage, "ValueChanged")
        .withArgs(42);
    });

    it("Should retrieve successfully value", async () => {
      const { storage } = await loadFixture(deployStorageFixture);
      await storage.store(30);
      expect(await storage.retrieve()).to.be.eq(30);
    });
  });

  describe("Storage V2", () => {
    it("Should successfuly upgrade Storage contract", async () => {
      const { storage } = await loadFixture(deployStorageFixture);
      await storage.store(30);
      const { storageV2 } = await loadFixture(upgradeStorageFixture);
      expect(await storageV2.retrieve()).to.be.eq(30);
      await expect(storageV2.increment())
        .to.emit(storageV2, "ValueChanged")
        .withArgs(31);
    });
  });
});
