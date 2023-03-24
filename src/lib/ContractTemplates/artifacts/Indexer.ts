export default {
  "abi": [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "hotWalletProxy_",
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
      "name": "IllegalItemAmount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidUUID",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NoMatchedRule",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint128",
          "name": "uuid",
          "type": "uint128"
        },
        {
          "internalType": "uint256",
          "name": "expect",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "actual",
          "type": "uint256"
        }
      ],
      "name": "ParentDiffers",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ParentExists",
      "type": "error"
    },
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
      "inputs": [],
      "name": "ZeroAddress",
      "type": "error"
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
      "inputs": [],
      "name": "hotWalletProxy",
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
          "internalType": "address[]",
          "name": "collections_",
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
              "internalType": "address",
              "name": "minter",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "combo",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "comboId",
              "type": "uint256"
            },
            {
              "internalType": "enum ICollectionType.CollectionType[]",
              "name": "collectionTypes",
              "type": "uint8[]"
            },
            {
              "components": [
                {
                  "components": [
                    {
                      "internalType": "uint64",
                      "name": "max",
                      "type": "uint64"
                    },
                    {
                      "internalType": "uint64",
                      "name": "min",
                      "type": "uint64"
                    },
                    {
                      "internalType": "uint64",
                      "name": "limit",
                      "type": "uint64"
                    },
                    {
                      "internalType": "bool",
                      "name": "lock",
                      "type": "bool"
                    },
                    {
                      "internalType": "address",
                      "name": "collection",
                      "type": "address"
                    },
                    {
                      "internalType": "uint32",
                      "name": "setId",
                      "type": "uint32"
                    }
                  ],
                  "internalType": "struct IComboCoreStructs.Factor[]",
                  "name": "factors",
                  "type": "tuple[]"
                }
              ],
              "internalType": "struct IComboCoreStructs.ComboRules",
              "name": "rules",
              "type": "tuple"
            }
          ],
          "internalType": "struct IIndexer.MintIndexParams",
          "name": "params_",
          "type": "tuple"
        }
      ],
      "name": "mintIndex",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint128",
              "name": "comboUUID",
              "type": "uint128"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "minter",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "comboId",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "metahash",
                  "type": "string"
                },
                {
                  "components": [
                    {
                      "internalType": "uint128",
                      "name": "uuid",
                      "type": "uint128"
                    },
                    {
                      "internalType": "uint64",
                      "name": "amount",
                      "type": "uint64"
                    },
                    {
                      "internalType": "uint32",
                      "name": "setId",
                      "type": "uint32"
                    },
                    {
                      "internalType": "uint8",
                      "name": "typ",
                      "type": "uint8"
                    },
                    {
                      "internalType": "bool",
                      "name": "lock",
                      "type": "bool"
                    },
                    {
                      "internalType": "bool",
                      "name": "limit",
                      "type": "bool"
                    }
                  ],
                  "internalType": "struct IComboCoreStructs.Item[][]",
                  "name": "items",
                  "type": "tuple[][]"
                },
                {
                  "internalType": "uint256[][]",
                  "name": "balancesFor1155Items",
                  "type": "uint256[][]"
                },
                {
                  "internalType": "uint64[][]",
                  "name": "limits",
                  "type": "uint64[][]"
                }
              ],
              "internalType": "struct IComboCoreStructs.MintParams",
              "name": "mintParams",
              "type": "tuple"
            },
            {
              "internalType": "uint256",
              "name": "numOfTransfers",
              "type": "uint256"
            },
            {
              "components": [
                {
                  "internalType": "enum IAgent.AgentItemType",
                  "name": "itemType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "token",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "id",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                }
              ],
              "internalType": "struct IAgent.AgentTransfer[]",
              "name": "paddedTransfers",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "numOfAuthorityUUIDs",
              "type": "uint256"
            },
            {
              "internalType": "uint128[]",
              "name": "paddedAuthorityUUIDs",
              "type": "uint128[]"
            }
          ],
          "internalType": "struct IIndexer.MintIndexReturn",
          "name": "ret",
          "type": "tuple"
        }
      ],
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
          "internalType": "uint256",
          "name": "comboId_",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "uint128",
              "name": "uuid",
              "type": "uint128"
            },
            {
              "internalType": "uint64",
              "name": "amount",
              "type": "uint64"
            },
            {
              "internalType": "uint32",
              "name": "setId",
              "type": "uint32"
            },
            {
              "internalType": "uint8",
              "name": "typ",
              "type": "uint8"
            },
            {
              "internalType": "bool",
              "name": "lock",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "limit",
              "type": "bool"
            }
          ],
          "internalType": "struct IComboCoreStructs.Item[]",
          "name": "items_",
          "type": "tuple[]"
        }
      ],
      "name": "dismantleIndex",
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
            },
            {
              "internalType": "uint64",
              "name": "amount",
              "type": "uint64"
            },
            {
              "internalType": "enum ICollectionType.CollectionType",
              "name": "typ",
              "type": "uint8"
            }
          ],
          "internalType": "struct ILocker.UnlockToken[]",
          "name": "unlockTokens",
          "type": "tuple[]"
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
          "name": "collections_",
          "type": "address[]"
        },
        {
          "internalType": "uint256[][]",
          "name": "tokenIds_",
          "type": "uint256[][]"
        },
        {
          "internalType": "bool",
          "name": "mustExist",
          "type": "bool"
        }
      ],
      "name": "getUUID",
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
          "internalType": "struct IIndexer.Token[]",
          "name": "tokens",
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
          "name": "tokenAddresses_",
          "type": "address[]"
        },
        {
          "internalType": "uint256[][]",
          "name": "tokenIds_",
          "type": "uint256[][]"
        }
      ],
      "name": "rootCombosOf",
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
          "internalType": "struct IIndexer.Token[][]",
          "name": "tokens",
          "type": "tuple[][]"
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
      "name": "rootCombosOf",
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
          "internalType": "struct IIndexer.Token[]",
          "name": "tokens",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ],
  "contractName": "Indexer"
}