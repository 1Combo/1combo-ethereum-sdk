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
      "name": "NotCollection",
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
      "inputs": [
        {
          "internalType": "uint32",
          "name": "",
          "type": "uint32"
        }
      ],
      "name": "collectionsForSets",
      "outputs": [
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
          "internalType": "address",
          "name": "creator",
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
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "setsForCreators",
      "outputs": [
        {
          "internalType": "uint32",
          "name": "",
          "type": "uint32"
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
          "internalType": "address[]",
          "name": "collections_",
          "type": "address[]"
        }
      ],
      "name": "initCollectionTypes",
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
          "internalType": "uint32[][]",
          "name": "setsForCollections_",
          "type": "uint32[][]"
        }
      ],
      "name": "verifyCollectionInSet",
      "outputs": [
        {
          "internalType": "enum ICollectionType.CollectionType[]",
          "name": "types",
          "type": "uint8[]"
        },
        {
          "internalType": "bool",
          "name": "success",
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
      "name": "isSetContainsAllCollections",
      "outputs": [
        {
          "internalType": "bool",
          "name": "contains",
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