export default {
  "abi": [
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "collections_",
          "type": "address[]"
        },
        {
          "internalType": "uint64[][]",
          "name": "maxSupplies_",
          "type": "uint64[][]"
        },
        {
          "internalType": "string[][]",
          "name": "metaHashes_",
          "type": "string[][]"
        }
      ],
      "name": "hashForCollectionAddItems",
      "outputs": [
        {
          "internalType": "bytes32[][]",
          "name": "itemHashes",
          "type": "bytes32[][]"
        }
      ],
      "stateMutability": "pure",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
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
              "name": "contractURI",
              "type": "string"
            },
            {
              "components": [
                {
                  "internalType": "uint128",
                  "name": "price",
                  "type": "uint128"
                },
                {
                  "internalType": "uint64",
                  "name": "maxSupply",
                  "type": "uint64"
                },
                {
                  "internalType": "string",
                  "name": "metaHash",
                  "type": "string"
                }
              ],
              "internalType": "struct InitialItem[]",
              "name": "initialItems",
              "type": "tuple[]"
            }
          ],
          "internalType": "struct DeployParams",
          "name": "params_",
          "type": "tuple"
        }
      ],
      "name": "hashForCollectionAddItems",
      "outputs": [
        {
          "internalType": "bytes32[]",
          "name": "itemHashes",
          "type": "bytes32[]"
        }
      ],
      "stateMutability": "pure",
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
          "internalType": "string",
          "name": "hash_",
          "type": "string"
        }
      ],
      "name": "hashForComboMint",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "pure",
      "type": "function",
      "constant": true
    }
  ],
  "contractName": "HashHelper"
}