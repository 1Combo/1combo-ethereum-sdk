export default {
  "abi": [
    {
      "inputs": [
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
      "name": "AlreadyInitialized",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "CallerNotAllowed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ComboAlreadyExists",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NonexistentCombo",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "SetNotContainsCollection",
      "type": "error"
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
      "name": "_agent",
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
      "name": "_collectionProxy",
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
      "inputs": [],
      "name": "config",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "price_",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "creator_",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "combo_",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "escrow_",
          "type": "address"
        }
      ],
      "name": "addComboColl",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "combos_",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "prices_",
          "type": "uint256[]"
        }
      ],
      "name": "setMintPriceBatch",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "combos_",
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
          "internalType": "address",
          "name": "combo_",
          "type": "address"
        },
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
          "internalType": "string",
          "name": "metahash_",
          "type": "string"
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
              "name": "itemsForCollections",
              "type": "uint256[][]"
            },
            {
              "internalType": "uint64[][]",
              "name": "amountsForItems",
              "type": "uint64[][]"
            },
            {
              "internalType": "uint32[][]",
              "name": "setsForItems",
              "type": "uint32[][]"
            }
          ],
          "internalType": "struct IComboCoreStructs.Ingredients",
          "name": "ingredients_",
          "type": "tuple"
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
          "name": "itemsToBuy_",
          "type": "tuple"
        }
      ],
      "name": "mint",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "combo_",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "comboId_",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "token_",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "metahash_",
          "type": "string"
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
              "name": "itemsForCollections",
              "type": "uint256[][]"
            },
            {
              "internalType": "uint64[][]",
              "name": "amountsForItems",
              "type": "uint64[][]"
            },
            {
              "internalType": "uint32[][]",
              "name": "setsForItems",
              "type": "uint32[][]"
            }
          ],
          "internalType": "struct IComboCoreStructs.Ingredients",
          "name": "ingredients_",
          "type": "tuple"
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
          "name": "itemsToBuy_",
          "type": "tuple"
        }
      ],
      "name": "edit",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "comboHash",
          "type": "bytes32"
        }
      ],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "combo_",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "comboId_",
          "type": "uint256"
        }
      ],
      "name": "dismantle",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "combo_",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender_",
          "type": "address"
        },
        {
          "internalType": "address[]",
          "name": "tokenAddresses_",
          "type": "address[]"
        },
        {
          "internalType": "uint256[][]",
          "name": "tokenIds_",
          "type": "uint256[][]"
        },
        {
          "internalType": "uint256[][]",
          "name": "amounts_",
          "type": "uint256[][]"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "combos_",
          "type": "address[]"
        }
      ],
      "name": "comboCollMetasOf",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "escrow",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "escrowIndexer",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            }
          ],
          "internalType": "struct IComboCollProxy.ComboCollMeta[]",
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
          "name": "combos_",
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
  "contractName": "ComboCollProxy"
}