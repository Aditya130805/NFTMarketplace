export const nftMarketplaceABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_listingPrice",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "addNFT",
        "outputs": [],
        "stateMutability": "external",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_assetId",
                "type": "uint256"
            }
        ],
        "name": "buyNFT",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAvailableNFTs",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "assetId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "listingPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "onMarket",
                        "type": "bool"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    }
                ],
                "internalType": "struct NFTMarketplace.NFT[]",
                "name": "availableNFTs",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getNFTsCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getOwnedNFTs",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "assetId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "listingPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "onMarket",
                        "type": "bool"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    }
                ],
                "internalType": "struct NFTMarketplace.NFT[]",
                "name": "ownedNFTs",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getOwnedNFTsCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
