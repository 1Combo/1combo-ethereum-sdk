export default {
  "abi": [
    {
      "inputs": [],
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
      "name": "ApprovalToAgent",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "CallerNotAllowed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ComboNotExists",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "collection",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ExceedTokenUsageLimit",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotComboOwner",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "TransferFailed",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "who",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "comboId",
          "type": "uint256"
        }
      ],
      "name": "OneComboComboDismantled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "who",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "comboId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "metaHash",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "comboHash",
          "type": "bytes32"
        }
      ],
      "name": "OneComboComboMinted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "who",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "comboId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "metaHash",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "comboHash",
          "type": "bytes32"
        }
      ],
      "name": "OneComboComboReminted",
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
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
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
      "name": "agent",
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
          "name": "operator_",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId_",
          "type": "uint256"
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
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
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
      "inputs": [],
      "name": "comboCollProxy",
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
      "name": "contractURIPath",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
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
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
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
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "hashOfToken",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
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
          "name": "owner_",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator_",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
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
      "name": "proxyRegistryAddress",
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
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
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
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator_",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved_",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
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
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
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
      "inputs": [],
      "name": "vault",
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
      "stateMutability": "payable",
      "type": "receive",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "accounting_",
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
              "name": "contractURIPath",
              "type": "string"
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
              "name": "comboRules",
              "type": "tuple"
            }
          ],
          "internalType": "struct IComboCoreStructs.ConstructorParams",
          "name": "params_",
          "type": "tuple"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "totalSupply",
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
          "internalType": "bytes4",
          "name": "interfaceId_",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId_",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "contractURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
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
          "name": "tokenId_",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "salePrice_",
          "type": "uint256"
        }
      ],
      "name": "royaltyInfo",
      "outputs": [
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "royaltyAmount",
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
          "name": "params_",
          "type": "tuple"
        }
      ],
      "name": "mint",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "comboId",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "comboHash",
              "type": "bytes32"
            }
          ],
          "internalType": "struct IComboCoreStructs.ComboReceipt",
          "name": "receipt",
          "type": "tuple"
        }
      ],
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
          "name": "params_",
          "type": "tuple"
        }
      ],
      "name": "remint",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "comboId",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "comboHash",
              "type": "bytes32"
            }
          ],
          "internalType": "struct IComboCoreStructs.ComboReceipt",
          "name": "receipt",
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
          "name": "owner_",
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
      "inputs": [],
      "name": "getComboRules",
      "outputs": [
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
        },
        {
          "internalType": "uint32[]",
          "name": "setIds_",
          "type": "uint32[]"
        }
      ],
      "name": "getLimitedTokenUsages",
      "outputs": [
        {
          "internalType": "uint64[]",
          "name": "usages",
          "type": "uint64[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "comboIds_",
          "type": "uint256[]"
        }
      ],
      "name": "getIngredients",
      "outputs": [
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
          "name": "erc20",
          "type": "address"
        }
      ],
      "name": "claim",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "ethAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "erc20Amount",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "contractName": "ComboCollCore"
}