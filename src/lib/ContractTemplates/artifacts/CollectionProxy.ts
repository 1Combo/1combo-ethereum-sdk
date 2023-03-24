export default {
  "abi": [
    {
      "inputs": [],
      "name": "CallerNotAllowed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "DuplicateCollections",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "MigrateFailed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NonMigrationReceiver",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NonexistentCollection",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "RefundFailed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "TokenNotExists",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "collections",
          "type": "address[]"
        },
        {
          "indexed": false,
          "internalType": "uint256[][]",
          "name": "tokenIds",
          "type": "uint256[][]"
        }
      ],
      "name": "OneComboCollectionItemsPriceChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "collections",
          "type": "address[]"
        }
      ],
      "name": "OneComboCollectionMigrated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
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
      "name": "creatorOfCollection",
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
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "accounting_",
          "type": "address"
        }
      ],
      "name": "config",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "collection_",
          "type": "address"
        }
      ],
      "name": "addCollection",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "collections_",
          "type": "address[]"
        },
        {
          "internalType": "uint128[][]",
          "name": "prices_",
          "type": "uint128[][]"
        },
        {
          "internalType": "uint64[][]",
          "name": "maxSupplies_",
          "type": "uint64[][]"
        },
        {
          "internalType": "string[][]",
          "name": "hashes_",
          "type": "string[][]"
        }
      ],
      "name": "addItems",
      "outputs": [
        {
          "internalType": "bytes32[][]",
          "name": "itemHashes",
          "type": "bytes32[][]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "collections_",
          "type": "address[]"
        },
        {
          "internalType": "uint256[][]",
          "name": "tokenIds_",
          "type": "uint256[][]"
        },
        {
          "internalType": "uint128[][]",
          "name": "prices_",
          "type": "uint128[][]"
        }
      ],
      "name": "setPrices",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "collections_",
          "type": "address[]"
        },
        {
          "internalType": "address[]",
          "name": "receivers_",
          "type": "address[]"
        }
      ],
      "name": "setReceivers",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "collections_",
          "type": "address[]"
        },
        {
          "internalType": "uint256[][]",
          "name": "tokenIds_",
          "type": "uint256[][]"
        }
      ],
      "name": "pricesOf",
      "outputs": [
        {
          "internalType": "uint128[][]",
          "name": "prices",
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
          "name": "to_",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "address[]",
              "name": "collections",
              "type": "address[]"
            },
            {
              "internalType": "uint256[][]",
              "name": "tokenIds",
              "type": "uint256[][]"
            },
            {
              "internalType": "uint256[][]",
              "name": "amounts",
              "type": "uint256[][]"
            }
          ],
          "internalType": "struct ICollectionProxy.CollectionItems",
          "name": "items_",
          "type": "tuple"
        }
      ],
      "name": "mint",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to_",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "payInEther_",
          "type": "bool"
        },
        {
          "components": [
            {
              "internalType": "address[]",
              "name": "collections",
              "type": "address[]"
            },
            {
              "internalType": "uint256[][]",
              "name": "tokenIds",
              "type": "uint256[][]"
            },
            {
              "internalType": "uint256[][]",
              "name": "amounts",
              "type": "uint256[][]"
            }
          ],
          "internalType": "struct ICollectionProxy.CollectionItems",
          "name": "items_",
          "type": "tuple"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "collections_",
          "type": "address[]"
        }
      ],
      "name": "collectionMetasOf",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            }
          ],
          "internalType": "struct ICollectionProxy.CollectionMeta[]",
          "name": "metas",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "collections_",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "newAccounting_",
          "type": "address"
        }
      ],
      "name": "migrate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "collections_",
          "type": "address[]"
        }
      ],
      "name": "exist",
      "outputs": [
        {
          "internalType": "bool[]",
          "name": "ret",
          "type": "bool[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ],
  "contractName": "CollectionProxy"
}