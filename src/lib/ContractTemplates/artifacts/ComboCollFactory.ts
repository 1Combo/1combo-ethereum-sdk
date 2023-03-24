export default {
  "abi": [
    {
      "inputs": [],
      "name": "BothLockAndLimitSet",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "IllegalOrder",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidBounds",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "MutexSetAndCollection",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ParamsLength",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "UnlimitableCollection",
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
          "name": "combo",
          "type": "address"
        }
      ],
      "name": "OneComboComboCollectionCreated",
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "allRegistries",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "version",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "combo",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "authorityFactory",
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
      "name": "comboCollCoreFactory",
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
      "name": "lockerFactory",
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
      "inputs": [],
      "name": "setManager",
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
      "inputs": [],
      "name": "totalRegistry",
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
      "name": "getRegistries",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "total",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "version",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "combo",
              "type": "address"
            }
          ],
          "internalType": "struct ComboCollFactory.Registry[]",
          "name": "registries",
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
      "name": "getRegistriesOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "total",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "version",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "combo",
              "type": "address"
            }
          ],
          "internalType": "struct ComboCollFactory.Registry[]",
          "name": "registries",
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
          "internalType": "address",
          "name": "accounting_",
          "type": "address"
        }
      ],
      "name": "configFactory",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name_",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol_",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "contractURIPath_",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "mintFee_",
          "type": "uint256"
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
          "name": "rules_",
          "type": "tuple"
        }
      ],
      "name": "createCombo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "contractName": "ComboCollFactory"
}