import { Request, Response } from "express";
import contracts from "../contracts/contracts";

const { Web3 } = require('web3');
const ganacheNodeUrl = 'http://127.0.0.1:8545';
const web3 = new Web3(ganacheNodeUrl);

const factoryContractAddress = contracts.WalletFactoryContract.ADDRESS;
const tempWalletContractAddress = contracts.TemporalWalletContract.ADDRESS;

const factoryAbi = contracts.WalletFactoryContract.ABI; // ABI of your WalletFactory contract
const walletAbi = contracts.TemporalWalletContract.ABI; // ABI of your TemporalWallet contract

const factoryContract = new web3.eth.Contract(factoryAbi, factoryContractAddress);
const walletContract = new web3.eth.Contract(walletAbi, tempWalletContractAddress);

async function createTemporalWallet(req: Request, res: Response) {
    try {
        const beneficiaryAddress = req.body.toAddress;
        const ownerAddress = req.body.ownerAddress;
        const amount = req.body.ethAmount;

        const gasEstimate = await factoryContract.methods.createTemporalWallet(beneficiaryAddress).estimateGas({ from: ownerAddress });
        console.log("Estimated gas: " + gasEstimate);
        const gasLimit = Number(gasEstimate) + 10000; // Adding some buffer to the estimate

        const weiAmount = web3.utils.toWei(amount.toString(), 'ether'); // Convert BigInt to string
    
        console.log('DATA TO SEND: ', beneficiaryAddress, " ", ownerAddress, " ", amount);
        var newWalletAddress = null;
        await factoryContract.methods.createTemporalWallet(beneficiaryAddress)
            .send({from: ownerAddress, gas: gasLimit, value: Number(weiAmount)})
            .on('receipt', async function(receipt: any){
                // receipt example
                console.log('RECEIPT: ',receipt);
                const events = await factoryContract.getPastEvents('TemporalWalletCreated', {
                    filter: {}, // Add additional filtering here if needed
                    fromBlock: receipt.blockNumber,
                    toBlock: 'latest'
                });
                console.log('EVENTS: ',events);
                newWalletAddress = events[0].returnValues.wallet;
                console.log('NEW WALLET: ',newWalletAddress);
                res.status(200).json({ newWallet: newWalletAddress });
            });
    } catch(error) {
        console.log('ERROR IN SMART CONTRACT REQUEST: ', error);
        res.status(500).json({message: 'Error in smart contract request'});
    }
}

export default { createTemporalWallet };