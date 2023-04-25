export default {
  "abi": [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "externals_",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "accounting_",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "uuidGenerator_",
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
      "name": "TokenNotExists",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "accounting",
      "outputs": [
        {
          "internalType": "contract IAccounting",
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
      "name": "externals",
      "outputs": [
        {
          "internalType": "contract IExternals",
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
      "name": "uuidGenerator",
      "outputs": [
        {
          "internalType": "contract IUUID",
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
              "internalType": "bool",
              "name": "edit",
              "type": "bool"
            },
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
              "internalType": "address",
              "name": "escrow",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "comboId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "paymentToken",
              "type": "address"
            },
            {
              "internalType": "address[]",
              "name": "addOnCollections",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "addOnCollectionFees",
              "type": "uint256[]"
            },
            {
              "internalType": "string",
              "name": "metahash",
              "type": "string"
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
          "internalType": "struct IInterStructs.ComboMintOrEdit",
          "name": "inter_",
          "type": "tuple"
        }
      ],
      "name": "mintIndex",
      "outputs": [
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
          "name": "recipient_",
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
          "internalType": "struct IUUID.Token[][]",
          "name": "roots",
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
          "internalType": "struct IUUID.Token[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ],
  "contractName": "EscrowIndexer"
}