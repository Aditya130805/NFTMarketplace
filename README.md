# NFTMarketplace

This project is an NFT (Non-Fungible Token) Marketplace built using React.js and Ethereum blockchain technology. It allows users to connect their Ethereum wallets, add their own NFTs for sale, view available NFTs on the marketplace, purchase NFTs, and see the NFTs they own. The application utilizes ethers.js for interacting with Ethereum smart contracts, enabling functionalities like adding NFTs, listing them for sale, buying NFTs, and fetching user-owned NFTs. Users can input the NFT name, listing price, asset ID, and payment amount (in Wei) to perform these actions. The interface is designed with a clean layout, showcasing NFT details such as asset ID, name, and price, providing a seamless experience for buying and selling NFTs on the blockchain.

## Getting Started

1. **Clone the repository:**

```
git clone https://github.com/Aditya130805/NFTMarketplace.git
```

2. **Install dependencies:**
```
cd NFTMarketplace
npm install
```


## Usage

1. **Start the development server:**

```
npm run start
```

2. **Open your web browser:**
Open your web browser and go to [http://localhost:3000](http://localhost:3000).

## Connect Wallet

Click on the "Connect Wallet" button to connect your wallet, and interact seamlessly with the application.

## File Structure

### Contracts

- **Market.sol:** This file contains the Solidity smart contract code for the Market contract used in the project. Note that this is a copy of the contract for reference and not the contract itself. So any changes made to it, or even its deletion, won't affect the app since the contract used by the app is already deployed on Sepolia.

### src

- **contracts:** This folder contains the ABI (Application Binary Interface) of the deployed smart contract. It is used by the front end to interact with the contract.

- **constants.js:** This file contains the address of the deployed smart contract. If you make changes to the contract and redeploy it, you need to update the address here. Also, you will need to change the ABI mentioned above. You can find the ABI in remix after you compile the contract.

- **App.js:** This file contains most of the application logic and frontend code. It includes state variables for the application and functions to connect the wallet and interact with the smart contract. The HTML structure of the website is defined in the return function.

### Ethers.js Documentation

For more information on how to use Ethers.js, refer to their documentation [here](https://docs.ethers.org/v5/). Note that some parts of the documentation may be outdated, so be sure to check their migration guide [here](https://docs.ethers.org/v6/migrating/) for any updates.

### Styling

Styling for the project is done using Tailwind CSS. You can learn how to use Tailwind CSS [here](https://tailwindcss.com/docs/guides/create-react-app).


## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you encounter any problems
