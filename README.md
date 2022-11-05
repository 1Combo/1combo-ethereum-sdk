# 1combo-ethereum-sdk

## Usage
```js
const {
    Client,
    ABI,
    ParamBuilders,
    COMBO_PROXY_ADDRESS,
    COLLECTION_PROXY_ADDRESS
} = require("../src/client.js");

# Make mint params
let mintParamsBuilder = new ParamBuilders.MintParamsBuilder();
 
// Use 100 minter-held non-addon(i.e. setId is 0) NFTs with id 0.
mintParamsBuilder.use('0x727cB81C955e1D....dfDFe07281', 0, 100, 0);      
  
// Use minter-held NFT(ERC721, non-addon) with id 103.
mintParamsBuilder.use('0xF27B8D220249fb....A6a71914E2', 103, 1, 0);

// Buy 15 addons(setId is 10000000) with id 932 before mint.
// NOTE: 10000000 is the default addon set id.
mintParamsBuilder.buy('0x10c01D6B0396D9....F60b9cB1F6', 932, 15, 10000000);

let { ingredients, itemsToBuy } = mintParamsBuilder.build();
ComboProxy.mint(
    combo,
    to,
    true,   // true - pay in ether, false - pay in WETH
    ingredients,
    itemsToBuy
);


var client = new Client();

# Get user owned addons and non-addons.
# *wallet_address* Required.
# *page_size* Optional.
# *filterCollection* Optional, address, which collection to query.
const result = await client.getOwnedNFTByAccount(<wallet_address>, <page_size>, <filterCollection>);

# Get user owned combo NFTs
# *wallet_address* Required.
# *page_size* Optional.
# *continuation* Optional, string, the start point for next page, '' for 1st page.
const result = await client.getOwnedComboByAccount(<wallet_address>, <page_size>, <continuation>);
```