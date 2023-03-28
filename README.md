# 1combo-ethereum-sdk

![image](https://user-images.githubusercontent.com/107178656/200139005-293f306f-2294-462b-aa6d-77ead4edf524.png)
# Install
```sh
npm install @1combo/1combo-ethereum-sdk
```

# Example

## Basic usages

```ts
    import { config as loadEnv } from 'dotenv';
    import { randomBytes } from 'crypto';
    import { SDK, Auth, TEMPLATES, Chains } from '@1combo/1combo-ethereum-sdk';

    loadEnv();

    const pk = `0x${randomBytes(32).toString('hex')}`;
    const auth = new Auth({
        privateKey: pk, // wallet
        projectId: process.env.INFURA_PROJECT_ID,
        secretId: process.env.INFURA_PROJECT_SECRET,
        chainId: Chains.goerli, // choose network
    });
    const sdk = new SDK(auth);

    // Query gas price in Gwei
    const gas = await sdk.getGasPrice();

    // Query tx status
    const receipt = await sdk.getStatus({ txHash: '' });
    ...
```

## Query royalty info

```ts
    import { config as loadEnv } from 'dotenv';
    import { randomBytes } from 'crypto';
    import { SDK, Auth, TEMPLATES, Chains } from '@1combo/1combo-ethereum-sdk';

    loadEnv();

    const pk = `0x${randomBytes(32).toString('hex')}`;
    const auth = new Auth({
        privateKey: pk,
        projectId: process.env.INFURA_PROJECT_ID,
        secretId: process.env.INFURA_PROJECT_SECRET,
        chainId: Chains.goerli,
    });
    const sdk = new SDK(auth);
    const combo = await sdk.loadContract({
        templateName: TEMPLATES.ComboCollCore,
        contractAddress: '0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8',
    });

    const info = await combo.royaltyInfo({tokenId: 1, sellPrice: 10000});
    console.log(info);
```

## Create set

```ts
    import { config as loadEnv } from 'dotenv';
    import { SDK, Auth, TEMPLATES, Chains, CONTRACT_ADDRESSES } from '@1combo/1combo-ethereum-sdk';

    loadEnv();

    const auth = new Auth({
        privateKey: process.env.KEY,
        projectId: process.env.INFURA_PROJECT_ID,
        secretId: process.env.INFURA_PROJECT_SECRET,
        chainId: Chains.goerli,
    });
    const sdk = new SDK(auth);
    const manager = await sdk.loadContract({
        templateName: TEMPLATES.SetManager,
        contractAddress: CONTRACT_ADDRESSES.GOERLI.SetManager,
    });

    await manager.createSet({
        name: 'Books',
        metadataURI: '',    // URI to metadata about this set, optional
        initialCategoryNames: ['P-Books', 'E-Books'],
        initialCategoryCollections: [],
        gasPrice: (parseFloat(await sdk.getGasPrice()) + 5).toString(),
    });
```