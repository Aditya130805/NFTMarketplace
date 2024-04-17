+1 (973) 462-4729:
	const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarketplace", function () {
    let NFTMarketplace;
    let nftMarketplace;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
        NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        nftMarketplace = await NFTMarketplace.deploy();
        await nftMarketplace.deployed();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await nftMarketplace.owner()).to.equal(owner.address);
        });
    });

    describe("Transactions", function () {
        it("Should add and retrieve an NFT", async function () {
            const listingPrice = ethers.utils.parseEther("1.0");
            const name = "TestNFT";
            await nftMarketplace.connect(addr1).addNFT(listingPrice, name);

            const nftCount = await nftMarketplace.getNFTsCount();
            expect(nftCount).to.equal(1);

            const [assetIds, names, prices] = await nftMarketplace.getAvailableNFTs();
            expect(assetIds[0]).to.equal(1);
            expect(names[0]).to.equal(name);
            expect(prices[0]).to.equal(listingPrice);
        });

        it("Should allow a user to buy an NFT", async function () {
            const listingPrice = ethers.utils.parseEther("1.0");
            const name = "TestNFT";
            await nftMarketplace.connect(addr1).addNFT(listingPrice, name);

            await expect(nftMarketplace.connect(addr2).buyNFT(1, { value: listingPrice }))
                .to.changeEtherBalances([addr2, addr1], [ethers.utils.parseEther("-1.0"), listingPrice]);
            
            const [assetIds, names, prices] = await nftMarketplace.getAvailableNFTs();
            expect(assetIds.length).to.equal(0);
        });

        it("Should fail to buy an NFT without sufficient funds", async function () {
            const listingPrice = ethers.utils.parseEther("1.0");
            const insufficientAmount = ethers.utils.parseEther("0.5");
            const name = "TestNFT";
            await nftMarketplace.connect(addr1).addNFT(listingPrice, name);

            await expect(nftMarketplace.connect(addr2).buyNFT(1, { value: insufficientAmount }))
                .to.be.revertedWith("Insufficient funds to buy NFT");
        });
    });
});

Aditya Agarwal:
	Do all test cases pass?
