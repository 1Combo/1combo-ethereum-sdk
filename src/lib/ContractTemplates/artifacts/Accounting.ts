export default {
  "abi": [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "admin_",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "collectionOwner_",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "baseTokenURI_",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "baseContractURI_",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "AlreadyConfigured",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "CallerNotAllowed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidShares",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "LimitExceeded",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotFound",
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
          "indexed": false,
          "internalType": "address[]",
          "name": "collections",
          "type": "address[]"
        },
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "receivers",
          "type": "address[]"
        }
      ],
      "name": "OneComboAccountingReceiverChangedBatch",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "collection",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "OneComboAccountingReceiverInitialized",
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
      "inputs": [],
      "name": "_SHARE_CREATOR",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "_SHARE_PLATFORM",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "_SHARE_TOTAL",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
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
      "name": "collectionReceivers",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "_indexInColls",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "receiver",
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
          "components": [
            {
              "internalType": "address",
              "name": "erc20",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "agent",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "vault",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "indexer",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "setManager",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "collectionProxy",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "comboCollProxy",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "comboCollFactory",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "collectionFactory",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "lockerFactory",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "authorityFactory",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "comboCollCoreFactory",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "openseaProxyRegistry",
              "type": "address"
            }
          ],
          "internalType": "struct IAccounting.GlobalContracts",
          "name": "globalContracts_",
          "type": "tuple"
        }
      ],
      "name": "config",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "addOnRoyalty",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint16",
          "name": "newPoint_",
          "type": "uint16"
        }
      ],
      "name": "setAddOnRoyalty",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "marketRoyalty",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint16",
          "name": "newPoint_",
          "type": "uint16"
        }
      ],
      "name": "setMarketRoyalty",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint16",
          "name": "platform_",
          "type": "uint16"
        },
        {
          "internalType": "uint16",
          "name": "creator_",
          "type": "uint16"
        }
      ],
      "name": "setEarningShares",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "globalConfig",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "admin",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "newAdmin",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "collectionOwner",
              "type": "address"
            },
            {
              "internalType": "uint16",
              "name": "addOnRoyalty",
              "type": "uint16"
            },
            {
              "internalType": "uint16",
              "name": "marketRoyalty",
              "type": "uint16"
            },
            {
              "components": [
                {
                  "internalType": "uint16",
                  "name": "platform",
                  "type": "uint16"
                },
                {
                  "internalType": "uint16",
                  "name": "creator",
                  "type": "uint16"
                }
              ],
              "internalType": "struct IAccounting.EarningShares",
              "name": "earningShares",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "baseTokenURI",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "baseContractURI",
                  "type": "string"
                }
              ],
              "internalType": "struct IAccounting.BaseURIs",
              "name": "baseURIs",
              "type": "tuple"
            }
          ],
          "internalType": "struct IAccounting.GlobalConfig",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "globalContracts",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "erc20",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "agent",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "vault",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "indexer",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "setManager",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "collectionProxy",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "comboCollProxy",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "comboCollFactory",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "collectionFactory",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "lockerFactory",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "authorityFactory",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "comboCollCoreFactory",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "openseaProxyRegistry",
              "type": "address"
            }
          ],
          "internalType": "struct IAccounting.GlobalContracts",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getEarningSharesAndAddOnRoyalty",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint16",
              "name": "platform",
              "type": "uint16"
            },
            {
              "internalType": "uint16",
              "name": "creator",
              "type": "uint16"
            }
          ],
          "internalType": "struct IAccounting.EarningShares",
          "name": "",
          "type": "tuple"
        },
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
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
          "name": "newAdmin_",
          "type": "address"
        }
      ],
      "name": "transferAdmin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "cancelTransferAdmin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "acceptTransferAdmin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAdminAddress",
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
        }
      ],
      "name": "initReceivers",
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
      "name": "receiversOf",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "receivers",
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
          "name": "receiver_",
          "type": "address"
        }
      ],
      "name": "collectionsOf",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
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
          "name": "receiver_",
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
      "name": "pageCollectionsOf",
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
          "name": "owner_",
          "type": "address"
        }
      ],
      "name": "setCollectionOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCollectionOwner",
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
          "internalType": "uint256",
          "name": "",
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
          "internalType": "string",
          "name": "baseTokenURI_",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "baseContractURI_",
          "type": "string"
        }
      ],
      "name": "setBaseURIs",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBaseTokenURI",
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
      "name": "getBaseContractURI",
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
    }
  ],
  "contractName": "Accounting"
}