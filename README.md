# 1combo-ethereum-sdk

![image](https://user-images.githubusercontent.com/107178656/200139005-293f306f-2294-462b-aa6d-77ead4edf524.png)
# Install
```sh
npm install @1combo/1combo-ethereum-sdk
```

# Usages

## Mint a combo NFT
```js
// sdk.Client - Some methods for querying.
// sdk.ParamBuilders - Tools for building parameters for contract writing.
// sdk.ABI - Contract ABIs.
// sdk.COMBO_PROXY_ADDRESS - Contract address of combo collection proxy on Goerli.
// sdk.COLLECTION_PROXY_ADDRESS - Contract address of addon collection proxy on Goerli.
const sdk = require("@1combo/1combo-ethereum-sdk");

// Make mint params
let mintParamsBuilder = new sdk.ParamBuilders.MintParamsBuilder();
 
// Select 2 NFTs with ID 75 in the ERC-1155 collection
// Note: the 2 NFTs should be owned by the minter
mintParamsBuilder.use('0x727cB81C955e1D....dfDFe07281', 75, 2, 0);      
  
// Select the NFT with ID 103 in the ERC-721 collection
// Note: the NFT should be owned by the minter
mintParamsBuilder.use('0xF27B8D220249fb....A6a71914E2', 103, 1, 0);

// Purchase & Select 5 NFTs with ID 932 in the ERC-1155 collection in the set with ID 10000000
// Note: minter can purchase the missing required add-on NFTs while minting a combo NFT
mintParamsBuilder.buy('0x10c01D6B0396D9....F60b9cB1F6', 932, 5, 10000000);

let { ingredients, itemsToBuy } = mintParamsBuilder.build();
ComboProxy.mint(
    combo,
    to,
    true,   // true - pay in ether, false - pay in WETH
    ingredients,
    itemsToBuy
);
```

## Purchase add-on NFTs
```js
let mintParamsBuilder = new ParamBuilders.MintParamsBuilder();

// Only 'buy' is required
mintParamsBuilder.buy('0x10c01D6B0396D9....F60b9cB1F6', 932, 5, 10000000);
...
let { ingredients, itemsToBuy } = mintParamsBuilder.build();
CollectionProxy.mint(
    to,
    true,   // true - pay in ether, false - pay in WETH
    itemsToBuy
);
```

## Query NFTs
```js
var client = new sdk.Client();

// Fetch non-combo NFTs in a wallet.
// *wallet_address* Required.
// *page_size* Optional.
// *filterCollection* Optional, address, which collection to query.
const result = await client.getOwnedNFTByAccount(<wallet_address>, <page_size>, <filterCollection>);

// Fetch combo NFTs in a wallet.
// *wallet_address* Required.
// *page_size* Optional.
// *continuation* Optional, string, the start point for next page, '' for 1st page.
const result = await client.getOwnedComboByAccount(<wallet_address>, <page_size>, <continuation>);
```
