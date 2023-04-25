export default {
  "abi": [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "collection_",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "accounting_",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "EmptyStringParam",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ZeroAddress",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ZeroPageParam",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "collection",
          "type": "address"
        }
      ],
      "name": "OneComboCollectionCreated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "accounting",
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
      "name": "template",
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
          "name": "creator_",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "symbol",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "contractURI",
              "type": "string"
            },
            {
              "components": [
                {
                  "internalType": "uint128",
                  "name": "price",
                  "type": "uint128"
                },
                {
                  "internalType": "uint64",
                  "name": "maxSupply",
                  "type": "uint64"
                },
                {
                  "internalType": "string",
                  "name": "metaHash",
                  "type": "string"
                }
              ],
              "internalType": "struct InitialItem[]",
              "name": "initialItems",
              "type": "tuple[]"
            }
          ],
          "internalType": "struct DeployParams",
          "name": "params_",
          "type": "tuple"
        }
      ],
      "name": "deploy",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalCollection",
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
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "pageNum_",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "pageSize_",
          "type": "uint256"
        }
      ],
      "name": "getCollections",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "total",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "collections",
          "type": "address[]"
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
          "name": "creator_",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "pageNum_",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "pageSize_",
          "type": "uint256"
        }
      ],
      "name": "getCollectionsByCreator",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "total",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "collections",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ],
  "contractName": "CollectionFactory"
}