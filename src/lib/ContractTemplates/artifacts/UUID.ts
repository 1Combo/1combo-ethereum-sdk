export default {
  "abi": [
    {
      "inputs": [],
      "name": "ShardIsFull",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "TokenNotExists",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "UnknownCollection",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "tokenAddresses_",
          "type": "address[]"
        }
      ],
      "name": "registerCollections",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "tokenAddresses_",
          "type": "address[]"
        },
        {
          "internalType": "uint256[][]",
          "name": "tokenIds_",
          "type": "uint256[][]"
        }
      ],
      "name": "getOrGenerateUUID",
      "outputs": [
        {
          "internalType": "uint128[][]",
          "name": "uuids",
          "type": "uint128[][]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "tokenAddresses_",
          "type": "address[]"
        },
        {
          "internalType": "uint256[][]",
          "name": "tokenIds_",
          "type": "uint256[][]"
        }
      ],
      "name": "getUUIDBatch",
      "outputs": [
        {
          "internalType": "uint128[][]",
          "name": "uuids",
          "type": "uint128[][]"
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
          "name": "tokenAddress_",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId_",
          "type": "uint256"
        }
      ],
      "name": "getUUID",
      "outputs": [
        {
          "internalType": "uint128",
          "name": "",
          "type": "uint128"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint128",
          "name": "uuid_",
          "type": "uint128"
        }
      ],
      "name": "tokenOf",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "tokenAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "internalType": "struct IUUID.Token",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint128[]",
          "name": "uuids_",
          "type": "uint128[]"
        }
      ],
      "name": "tokensOf",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "tokenAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "internalType": "struct IUUID.Token[]",
          "name": "tokens",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ],
  "contractName": "UUID"
}