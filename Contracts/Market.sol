// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NFTMarketplace {
    struct NFT {
        uint256 assetId;
        uint256 listingPrice;
        bool onMarket;
        address owner;
        string name;
    }

    NFT[] public nfts;
    address public owner;
    uint256 assetCounter = 1;

    constructor() {
        owner = msg.sender;
    }

    function addNFT(uint256 _listingPrice, string memory _name) external {
        NFT memory newNFT = NFT({
            assetId: assetCounter,
            listingPrice: _listingPrice,
            onMarket: true,
            owner: msg.sender,
            name: _name
        });
        nfts.push(newNFT);
        assetCounter++;
    }

    function buyNFT(uint256 _assetId) external payable {
        NFT storage nft = findNFTById(_assetId);
        require(nft.onMarket, "NFT is not on sale");
        require(msg.value >= nft.listingPrice, "Insufficient funds to buy NFT");

        address previousOwner = nft.owner;
        nft.owner = msg.sender;
        nft.onMarket = false;

        payable(previousOwner).transfer(msg.value);
    }

    function findNFTById(uint256 _assetId) internal view returns (NFT storage) {
        for (uint256 i = 0; i < nfts.length; i++) {
            if (nfts[i].assetId == _assetId) {
                return nfts[i];
            }
        }
        revert("NFT not found");
    }

    function getNFTsCount() external view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < nfts.length; i++) {
            if (nfts[i].onMarket) {
                count++;
            }
        }
        return count;
    }

    function getAvailableNFTs() external view returns (NFT[] memory availableNFTs) {
        uint256 count = 0;
        for (uint256 i = 0; i < nfts.length; i++) {
            if (nfts[i].onMarket) {
                count++;
            }
        }

        availableNFTs = new NFT[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < nfts.length; i++) {
            if (nfts[i].onMarket) {
                availableNFTs[index] = nfts[i];
                index++;
            }
        }
    }

    function getOwnedNFTs() external view returns (NFT[] memory ownedNFTs) {
        uint256 count = 0;
        for (uint256 i = 0; i < nfts.length; i++) {
            if (nfts[i].owner == owner) {
                count++;
            }
        }

        ownedNFTs = new NFT[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < nfts.length; i++) {
            if (nfts[i].owner == owner) {
                ownedNFTs[index] = nfts[i];
                index++;
            }
        }
    }

    function getOwnedNFTsCount() external view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < nfts.length; i++) {
            if (nfts[i].owner == owner) {
                count++;
            }
        }
        return count;
    }

}
