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
// sdk.COMBO_PROXY_ADDRESS - Contract address of combo proxy on Goerli.
// sdk.COLLECTION_PROXY_ADDRESS - Contract address of collection proxy on Goerli.
const sdk = require("@1combo/1combo-ethereum-sdk");

# Make mint params
let mintParamsBuilder = new sdk.ParamBuilders.MintParamsBuilder();
 
// Use 100 minter-held non-addon(i.e. setId is 0) NFTs with id 1.
mintParamsBuilder.use('0x727cB81C955e1D....dfDFe07281', 1, 100, 0);      
  
// Use minter-held NFT(ERC721, non-addon) with id 103.
mintParamsBuilder.use('0xF27B8D220249fb....A6a71914E2', 103, 1, 0);

// Buy 15 addons(setId is 10000000) with id 932 in the same mint transaction.
// NOTE: 1. 10000000 is the default addon set id.
//       2. You can add any number of 'use' or 'buy'.
//       3. 'buy' requires set id 10000000.
mintParamsBuilder.buy('0x10c01D6B0396D9....F60b9cB1F6', 932, 15, 10000000);

let { ingredients, itemsToBuy } = mintParamsBuilder.build();
ComboProxy.mint(
    combo,
    to,
    true,   // true - pay in ether, false - pay in WETH
    ingredients,
    itemsToBuy
);
```

## Query NFTs
```js
var client = new sdk.Client();

# Fetch non-combo NFTs in a wallet.
# *wallet_address* Required.
# *page_size* Optional.
# *filterCollection* Optional, address, which collection to query.
const result = await client.getOwnedNFTByAccount(<wallet_address>, <page_size>, <filterCollection>);

# Fetch combo NFTs in a wallet.
# *wallet_address* Required.
# *page_size* Optional.
# *continuation* Optional, string, the start point for next page, '' for 1st page.
const result = await client.getOwnedComboByAccount(<wallet_address>, <page_size>, <continuation>);
```
