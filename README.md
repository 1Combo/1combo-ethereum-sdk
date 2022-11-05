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
// sdk.COMBO_FACTORY_ADDRESS - Contract address of combo collection factory on Goerli.
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

## Create a combo collection
```js
// Make combo rules
let comboRuleBuilder = new sdk.ParamBuilders.ComboRuleBuilder();

// Optional. Add a collection to this combo
comboRuleBuilder.addCollectionRule('0x727cB81C955e1D....dfDFe07281', true, 0, 10);

// Optional. Add a set to this combo, currently only '10000000' is valid.
comboRuleBuilder.addSetRule(10000000, true, 10, '1231231242412.....234');

// Optional. Limit the same NFT(token id) from the specified collection to 
// be used only once in this combo collection.
comboRuleBuilder.addLimitRule('0x727cB81C955e1D....dfDFe07281', 1);

// NOTE: At least one collection/set rule is required.
let comboRules = comboRuleBuilder.build();

ComboFactory.createCombo(
    name,
    symbol,
    contractMetaHash, // created by sdk.Client.createContractMetaHash(...)
    mintFee,    // fee to mint a combo NFT
    comboRules
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

// TODO:
## Create contract metadata hash 
```js
var client = new sdk.Client();

const result = await client.createContractMetaHash();
```