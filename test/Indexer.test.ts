import { config as loadEnv } from 'dotenv';
import { describe, beforeAll, it } from '@jest/globals';

import Auth from '../src/lib/Auth/Auth';
import { SDK } from '../src/lib/SDK/sdk';

import { CONTRACT_ADDRESSES, TEMPLATES } from '../src/lib/SDK/constants';
import { Chains } from '../src/lib/Auth/availableChains';

import Indexer from '../src/lib/ContractTemplates/Indexer';

loadEnv();

describe('Indexer', () => {
    let sdk: SDK;
    let indexer: Indexer;

    beforeAll(async () => {
        const auth = new Auth({
            privateKey: process.env.KEY,
            projectId: process.env.INFURA_PROJECT_ID,
            secretId: process.env.INFURA_PROJECT_SECRET,
            chainId: Chains.goerli,
        });
        sdk = new SDK(auth);
        indexer = await sdk.loadContract({
            templateName: TEMPLATES.Indexer,
            contractAddress: CONTRACT_ADDRESSES.GOERLI.Indexer,
        });
    });

    it('all', async() => {
        const tokens = await indexer.tokensOf({uuids: ['1342177451', '5637144578']});
        console.log(tokens);

        const uuids = await indexer.getUUID({
            mustExist: true,
            tokenAddresses: [tokens[0].tokenAddress],
            tokenIds: [[tokens[0].tokenId.toNumber()]]
        });
        expect(uuids[0][0].toString()).toBe('1342177451');

        let tokens1 = (await indexer.rootComboOfTokens({
            tokenAddresses: [tokens[0].tokenAddress],
            tokenIds: [[tokens[0].tokenId.toNumber()]]
        }))[0];

        let tokens2 =await indexer.rootComboOfUUIDs({uuids: ['1342177451']});

        expect(tokens1[0].tokenAddress).toBe(tokens2[0].tokenAddress);
        expect(tokens1[0].tokenId.toString()).toBe(tokens2[0].tokenId.toString());

        // registerCollections
        const gas = await sdk.getGasPrice();
        const resp = await indexer.registerCollections({collections: [tokens[0].tokenAddress], gasPrice: (parseFloat(gas) + 10).toString()});
        console.log('registerCollections', resp.hash);
    }, 30000);
});