export default {
    WalletFactoryContract: {
      ADDRESS: '0x8352B68ea6006D774E7fC021eFa33477D8cdDEF6',
      ABI: [
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "wallet",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "beneficiary",
              "type": "address"
            }
          ],
          "name": "TemporalWalletCreated",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "wallets",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "beneficiary",
              "type": "address"
            }
          ],
          "name": "createTemporalWallet",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function",
          "payable": true
        }
      ]
    },
    TemporalWalletContract: {
        ADDRESS: '0x2AF8Ee1CD5D9F0cBCcB709cca082e66f7Aa33e49',
        ABI: [
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "_beneficiary",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "_owner",
                  "type": "address"
                }
              ],
              "stateMutability": "payable",
              "type": "constructor",
              "payable": true
            },
            {
              "inputs": [],
              "name": "active",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function",
              "constant": true
            },
            {
              "inputs": [],
              "name": "beneficiary",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function",
              "constant": true
            },
            {
              "inputs": [],
              "name": "owner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function",
              "constant": true
            },
            {
              "inputs": [],
              "name": "transferToBeneficiary",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "getBalance",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function",
              "constant": true
            }
          ]
    }
  };
  