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
      "name": "CallerNotAllowed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "CollectionNotExists",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "DuplicateCollections",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "EmptyCategoryName",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "EmptyCollections",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "EmptyName",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "IllegalReceiver",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotCollection",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotNative",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "SetNotExists",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "UnknownCategory",
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
      "name": "OneComboCollectionReceiverChangedBatch",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint32",
          "name": "setId",
          "type": "uint32"
        },
        {
          "indexed": true,
          "internalType": "uint128",
          "name": "categoryId",
          "type": "uint128"
        },
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "collections",
          "type": "address[]"
        }
      ],
      "name": "OneComboSetCollectionsAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint32",
          "name": "setId",
          "type": "uint32"
        },
        {
          "indexed": true,
          "internalType": "uint128",
          "name": "newCategory",
          "type": "uint128"
        },
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "collections",
          "type": "address[]"
        }
      ],
      "name": "OneComboSetCollectionsCategoryChanged",
      "type": "event"
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
          "internalType": "uint32",
          "name": "setId",
          "type": "uint32"
        }
      ],
      "name": "OneComboSetCreated",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "registeredCollections",
      "outputs": [
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "internalType": "uint64",
          "name": "indexInColls",
          "type": "uint64"
        },
        {
          "internalType": "bool",
          "name": "native",
          "type": "bool"
        },
        {
          "internalType": "enum ICollectionType.CollectionType",
          "name": "typ",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "totalSet",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "total",
          "type": "uint256"
        },
        {
          "internalType": "uint32",
          "name": "startId",
          "type": "uint32"
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
          "name": "name_",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "uri_",
          "type": "string"
        },
        {
          "internalType": "string[]",
          "name": "initialCategories_",
          "type": "string[]"
        },
        {
          "internalType": "address[][]",
          "name": "initialCategoryCollections_",
          "type": "address[][]"
        }
      ],
      "name": "createSet",
      "outputs": [
        {
          "internalType": "uint32",
          "name": "setId",
          "type": "uint32"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint32",
          "name": "setId_",
          "type": "uint32"
        },
        {
          "internalType": "uint128[]",
          "name": "categoryIds_",
          "type": "uint128[]"
        },
        {
          "internalType": "address[][]",
          "name": "collsEachCategory_",
          "type": "address[][]"
        }
      ],
      "name": "addCollections",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint32",
          "name": "setId_",
          "type": "uint32"
        },
        {
          "internalType": "uint128[]",
          "name": "newCategoryIds_",
          "type": "uint128[]"
        },
        {
          "internalType": "address[][]",
          "name": "collsEachCategory_",
          "type": "address[][]"
        }
      ],
      "name": "changeCategoriesForCollections",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint32",
          "name": "setId_",
          "type": "uint32"
        },
        {
          "internalType": "string[]",
          "name": "categories_",
          "type": "string[]"
        },
        {
          "internalType": "address[][]",
          "name": "initialCategoryCollections_",
          "type": "address[][]"
        }
      ],
      "name": "addCategories",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint32",
          "name": "setId_",
          "type": "uint32"
        },
        {
          "internalType": "string",
          "name": "newName_",
          "type": "string"
        }
      ],
      "name": "renameSet",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint32",
          "name": "setId_",
          "type": "uint32"
        },
        {
          "internalType": "uint128",
          "name": "categoryId_",
          "type": "uint128"
        },
        {
          "internalType": "string",
          "name": "newName_",
          "type": "string"
        }
      ],
      "name": "renameCategroy",
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
      "name": "collectionTypesOf",
      "outputs": [
        {
          "internalType": "enum ICollectionType.CollectionType[]",
          "name": "types",
          "type": "uint8[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint32[]",
          "name": "setIds_",
          "type": "uint32[]"
        }
      ],
      "name": "getSets",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "uri",
              "type": "string"
            },
            {
              "internalType": "uint256[]",
              "name": "categoryCollNums",
              "type": "uint256[]"
            },
            {
              "internalType": "uint128[]",
              "name": "categoryIds",
              "type": "uint128[]"
            },
            {
              "internalType": "string[]",
              "name": "categoryNames",
              "type": "string[]"
            }
          ],
          "internalType": "struct ISetManager.SetInfo[]",
          "name": "setInfos",
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
      "name": "setIdsOfCreator",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "total",
          "type": "uint256"
        },
        {
          "internalType": "uint32[]",
          "name": "setIds",
          "type": "uint32[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint32",
          "name": "setId_",
          "type": "uint32"
        },
        {
          "internalType": "uint128",
          "name": "categoryId_",
          "type": "uint128"
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
      "name": "collectionsOf",
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
        },
        {
          "internalType": "enum ICollectionType.CollectionType[]",
          "name": "collectionTypes",
          "type": "uint8[]"
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
      "name": "registerNonNativeCollections",
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
        },
        {
          "internalType": "address",
          "name": "receiver_",
          "type": "address"
        }
      ],
      "name": "registerNativeCollection",
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
          "internalType": "address[]",
          "name": "collections_",
          "type": "address[]"
        },
        {
          "internalType": "uint32[][]",
          "name": "setsForCollections_",
          "type": "uint32[][]"
        }
      ],
      "name": "verifyCollectionInAllSets",
      "outputs": [
        {
          "internalType": "enum ICollectionType.CollectionType[]",
          "name": "types",
          "type": "uint8[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint32[]",
          "name": "setIds_",
          "type": "uint32[]"
        },
        {
          "internalType": "address[][]",
          "name": "collections_",
          "type": "address[][]"
        }
      ],
      "name": "verifySetHasAllCollections",
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
    }
  ],
  "contractName": "SetManager"
}