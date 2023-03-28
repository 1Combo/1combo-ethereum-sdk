import { config as loadEnv } from 'dotenv';
import { describe, beforeAll, it } from '@jest/globals';

import Auth from '../src/lib/Auth/Auth';
import { SDK } from '../src/lib/SDK/sdk';

import { TEMPLATES } from '../src/lib/SDK/constants';
import { Chains } from '../src/lib/Auth/availableChains';

import Collection from '../src/lib/ContractTemplates/Collection';

loadEnv();

describe('Collection', () => {
    let sdk: SDK;
    let collection: Collection;

    beforeAll(async () => {
        const auth = new Auth({
            privateKey: process.env.KEY,
            projectId: process.env.INFURA_PROJECT_ID,
            secretId: process.env.INFURA_PROJECT_SECRET,
            chainId: Chains.goerli,
        });
        sdk = new SDK(auth);
        collection = await sdk.loadContract({
            templateName: TEMPLATES.Collection,
            contractAddress: '0xf5ee72eD90f2015939CF6Fc956F201a04278A011',
        });
    });

    it('all', async() => {
        const totalSupply = await collection.totalSupply({tokenId: 2});
        expect(totalSupply.toNumber()).toBeGreaterThan(0);

        const totalItem = await collection.totalItem();
        expect(totalItem.toNumber()).toBeGreaterThan(0);

        const metadata = await collection.metadatasOf({tokenIds: [2]});
        console.log(metadata);

        const info = await collection.royaltyInfo({
            tokenId: 2,
            sellPrice: 10000,
        });
        expect(info.receiver).toBe('0xf5ee72eD90f2015939CF6Fc956F201a04278A011');
        expect(info.royaltyAmount.toNumber()).toBe(250);
    }, 60000);
});