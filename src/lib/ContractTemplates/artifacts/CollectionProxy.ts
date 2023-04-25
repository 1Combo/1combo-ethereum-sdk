export default {
  "abi": [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "accounting_",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "comboCollProxy_",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "setManager_",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "vault_",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
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
      "inputs": [],
      "name": "_accounting",
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
      "name": "_comboCollProxy",
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
      "name": "_setManager",
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
      "name": "_vault",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "collection_",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "creator_",
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
          "internalType": "address",
          "name": "token_",
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