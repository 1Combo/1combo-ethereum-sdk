import { config as loadEnv } from 'dotenv';
import { describe, beforeAll, it } from '@jest/globals';

import Auth from '../src/lib/Auth/Auth';
import { SDK } from '../src/lib/SDK/sdk';

import { CONTRACT_ADDRESSES, TEMPLATES } from '../src/lib/SDK/constants';
import { Chains } from '../src/lib/Auth/availableChains';

import CollectionFactory from '../src/lib/ContractTemplates/CollectionFactory';

loadEnv();

describe('CollectionFactory', () => {
    let sdk: SDK;
    let factory: CollectionFactory;
    let creator: string;

    beforeAll(async () => {
        const auth = new Auth({
            privateKey: process.env.KEY,
            projectId: process.env.INFURA_PROJECT_ID,
            secretId: process.env.INFURA_PROJECT_SECRET,
            chainId: Chains.goerli,
        });
        creator = await auth.getSigner().getAddress();
        sdk = new SDK(auth);
        factory = await sdk.loadContract({
            templateName: TEMPLATES.CollectionFactory,
            contractAddress: CONTRACT_ADDRESSES.GOERLI.CollectionFactory,
        });
    });

    it('all', async() => {
        console.log('total', (await factory.totalCollection()).toNumber());

        console.log('getCollections', await factory.getCollections({pageNum: 1, pageSize: 10}));
        console.log('getCollectionsByCreator', await factory.getCollectionsByCreator({creator: creator, pageNum: 1, pageSize: 10}));
    }, 60000);
});