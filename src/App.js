
import './App.css';
import { useEffect, useState } from 'react';
import logo from './logo.jpg';
import {contractAddress} from './Constants';
import { nftMarketplaceABI } from './contracts/Market.js';
const ethers = require('ethers');

function App() {
  const [provider, setProvider] = useState(null);
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [listingPrice, setListingPrice] = useState('');
  const [name, setName] = useState('');
  const [availableNFTs, setAvailableNFTs] = useState([]);
  const [showNFTs, setShowNFTs] = useState(true);
  const [assetIdToBuy, setAssetIdToBuy] = useState('');
  const [listingPriceToSend, setListingPriceToSend] = useState('');
  const [transactionMessage, setTransactionMessage] = useState('');
  const [addTransactionMessage, setAddTransactionMessage] = useState('');
  const [hasAvailableNFTs, setHasAvailableNFTs] = useState(true);
  const [hasOwnedNFTs, setHasOwnedNFTs] = useState(false);
  const [ownedNFTs, setOwnedNFTs] = useState([]);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const newProvider = new ethers.BrowserProvider(window.ethereum)
        setProvider(newProvider);
        const accounts = await newProvider.listAccounts();
        console.log(accounts);
        setConnectedAddress(accounts[0].address);
      } else {
        throw new Error('No Ethereum provider detected');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  useEffect(() => {
    if (provider && connectedAddress) {
      getAvailableNFTs();
      getOwnedNFTs();
    }
  }, [provider, connectedAddress]);

  const addNFT = async () => {
    try {
      if (!provider) {
        throw new Error('Ethereum provider not initialized');
      }
      //const contractAddress = 'YOUR_CONTRACT_ADDRESS';
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, nftMarketplaceABI, signer);
      console.log("In!");
      setAddTransactionMessage("Creating...");
      const transaction = await contract.addNFT(listingPrice, name);
      const receipt = await transaction.wait();
      console.log('NFT added successfully');
      setAddTransactionMessage("Added successfully!");
      getAvailableNFTs();
      getOwnedNFTs();
    } catch (error) {
      setAddTransactionMessage("Error: Cannot be added!");
      console.error('Error adding NFT:', error);
    }
  };

  const getAvailableNFTs = async () => {
    try {
        if (!provider) {
            throw new Error('Ethereum provider not initialized');
        }
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, nftMarketplaceABI, signer);
        const nftData = await contract.getAvailableNFTs();
        const nftNum = await contract.getNFTsCount();
        if (nftNum > 0) {
          setHasAvailableNFTs(true);
        } else {
          setHasAvailableNFTs(false);
        }
        // Parse the data received from the contract
        const formattedNFTs = nftData.map(nft => ({
            assetId: nft.assetId.toString(),
            price: nft.listingPrice.toString(),
            onMarket: nft.onMarket,
            owner: nft.owner,
            name: nft.name
        }));
        
        setAvailableNFTs(formattedNFTs);
        setShowNFTs(true); // Set showNFTs to true after fetching NFTs
    } catch (error) {
        console.error('Error getting NFTs:', error);
    }
  };

  const getOwnedNFTs = async () => {
    try {
        if (!provider) {
            throw new Error('Ethereum provider not initialized');
        }
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, nftMarketplaceABI, signer);
        const nftData = await contract.getOwnedNFTs();
        const nftNum = await contract.getOwnedNFTsCount();
        if (nftNum > 0) {
          setHasOwnedNFTs(true);
        } else {
          setHasOwnedNFTs(false);
        }
        // Parse the data received from the contract
        const formattedNFTs = nftData.map(nft => ({
            assetId: nft.assetId.toString(),
            price: nft.listingPrice.toString(),
            onMarket: nft.onMarket,
            owner: nft.owner,
            name: nft.name
        }));
        
        setOwnedNFTs(formattedNFTs);
    } catch (error) {
        console.error('Error getting NFTs:', error);
    }
  };

  const buyNFT = async(assetIdToBuy, listingPriceToSend) => {
    try {
      if (!provider) {
        throw new Error('Ethereum provider not initialized');
      }
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, nftMarketplaceABI, signer);
      console.log('Buying...');
      setTransactionMessage('Buying...');
      const transaction = await contract.buyNFT(assetIdToBuy, { value: listingPriceToSend });
      const receipt = await transaction.wait();
      console.log('Transaction successful');
      setTransactionMessage('Transaction successful!')
      const nftNum = await contract.getNFTsCount();
      getAvailableNFTs();
      getOwnedNFTs();
    } catch (error) {
      setTransactionMessage('Error: ' + "Insufficient funds / NFT not on sale / User rejected transaction");
      console.error('Error buying NFT:', error);
    }
  }

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-gray-700 rounded-lg p-12 shadow-xl max-w-3xl w-full mt-20 mb-20">
        <div className="flex items-center justify-center mb-8">
          <img src={logo} alt="Logo" className="h-32 w-40 mr-10" />
          <h1 className="text-white text-5xl font-bold">NFT Marketplace</h1>
        </div>
        {connectedAddress && (
          <div className="mb-6 flex justify-center">
            <p className="text-blue-500 text-lg font-medium">Connected Wallet:</p>
            <p className="text-white text-lg ml-2">{connectedAddress}</p>
          </div>
        )}
        {!connectedAddress && (
          <button onClick={connectWallet} className="bg-indigo-500 text-white px-8 py-3 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-500">Connect Wallet</button>
        )}
        {connectedAddress && (
          <div className="mt-8">
            <h2 className="text-blue-300 text-lg mb-4 font-bold">Add your own NFT to sell!</h2>
            <div className="flex items-center justify-center space-x-6 my-4 px-4 py-3 rounded-lg shadow-md bg-gray-900">
              
              <input
                type="text"
                placeholder="Name"
                className="bg-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="number"
                placeholder="Price (Wei)"
                className="bg-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                value={listingPrice}
                onChange={(e) => setListingPrice(e.target.value)}
              />
              <button onClick={addNFT} className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500">Create NFT</button>
            </div>

            {addTransactionMessage && (
              <div className={`transaction-message flex items-center justify-center space-x-6 my-4 px-4 py-3 rounded-lg shadow-md ${
                addTransactionMessage.includes('successful') ? 'bg-green-700 text-white' : 
                addTransactionMessage.includes('Error: Cannot be added!') ? 'bg-red-700 text-white' : 
                'bg-yellow-600 text-white'
              }`}>
                {addTransactionMessage}
              </div>
            )}

            <div className="container">
              <div className="container flex items-center mt-8 mb-4">
                <h2 className="text-blue-300 text-lg font-bold">See NFTs on sale!</h2>
                {/* <button onClick={getAvailableNFTs} className="bg-blue-500 text-white ml-4 px-8 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500">Show NFTs</button> */}
              </div>
              {showNFTs && hasAvailableNFTs ? (
                <div className="nft-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                  {availableNFTs.map((nft, index) => (
                    <div key={index} className="nft-item bg-white rounded-lg shadow-md p-4 w-450 sm:w-auto">
                      <p className="text-lg font-bold mb-2">Asset ID: {nft.assetId}</p>
                      <p className="text-base mb-2">Name: {nft.name}</p>
                      <p className="text-base">Price: {nft.price} (Wei)</p>
                    </div>
                  ))}
                </div>
                ) : (
                  <div className="transaction-message flex items-center justify-center space-x-6 my-4 px-4 py-3 rounded-lg shadow-md bg-red-600 text-white" style={{ width: '40%' }}>
                      No NFTs available to buy
                  </div>
              )}

            </div>

            <h2 className="text-blue-300 text-lg mb-4 font-bold mt-8">Buy an NFT (buy your own to remove it from the market) (donate to creators)!</h2>
            <div className="flex items-center justify-center space-x-6 my-4 px-4 py-3 rounded-lg shadow-md bg-gray-900">
              
              <input
                type="number"
                placeholder="Asset ID"
                className="bg-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 ml-4"
                value={assetIdToBuy}
                onChange={(e) => setAssetIdToBuy(e.target.value)}
              />
              <input
                type="number"
                placeholder="Pay Amount (Wei)"
                className="bg-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 ml-4"
                value={listingPriceToSend}
                onChange={(e) => setListingPriceToSend(e.target.value)}
              />
              <button onClick={() => buyNFT(assetIdToBuy, listingPriceToSend)} className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500">Buy NFT</button>
            </div>

            {transactionMessage && (
              <div className={`transaction-message flex items-center justify-center space-x-6 my-4 px-4 py-3 rounded-lg shadow-md ${transactionMessage.includes('Buying...') ? 'bg-yellow-500 text-white' : transactionMessage.includes('successful') ? 'bg-green-700 text-white' : 'bg-red-700 text-white'}`}>
                {transactionMessage}
              </div>
            )}

            <div className="container">
              <div className="container flex items-center mt-8 mb-4">
                <h2 className="text-blue-300 text-lg font-bold">See the assets you own!</h2>
                {/* <button onClick={getOwnedNFTs} className="bg-blue-500 text-white ml-4 px-8 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500">Show my NFTs</button> */}
              </div>
              {hasOwnedNFTs ? (
                <div className="nft-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                  {ownedNFTs.map((nft, index) => (
                    <div key={index} className="nft-item bg-white rounded-lg shadow-md p-4 w-450 sm:w-auto">
                      <p className="text-lg font-bold mb-2">Asset ID: {nft.assetId}</p>
                      <p className="text-base mb-2">Name: {nft.name}</p>
                      <p className="text-base">Price: {nft.price} (Wei)</p>
                    </div>
                  ))}
                </div>
                ) : (
                  <div className="transaction-message flex items-center justify-center space-x-6 my-4 px-4 py-3 rounded-lg shadow-md bg-red-600 text-white" style={{ width: '40%' }}>
                      You do not own any NFTs
                  </div>
              )}

            </div>
            
          </div>
        )}
      </div>
    </div>
  );
  
}


export default App;
