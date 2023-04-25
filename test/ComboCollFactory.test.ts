import { config as loadEnv } from 'dotenv';
import { describe, beforeAll, it } from '@jest/globals';

import Auth from '../src/lib/Auth/Auth';
import { SDK } from '../src/lib/SDK/sdk';

import { CONTRACT_ADDRESSES, TEMPLATES } from '../src/lib/SDK/constants';
import { Chains } from '../src/lib/Auth/availableChains';

import ComboCollFactory from '../src/lib/ContractTemplates/ComboCollFactory';
import { ZERO_ADDRESS } from '../src/lib/constants';

loadEnv();

describe('ComboCollFactory', () => {
    let sdk: SDK;
    let factory: ComboCollFactory;
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
            templateName: TEMPLATES.ComboCollFactory,
            contractAddress: CONTRACT_ADDRESSES.GOERLI.ComboCollFactory,
        });
    });

    it('all', async() => {
        console.log('totalRegistry', await factory.totalCollection());
        console.log('getRegistries', await factory.getCollections({
            creator: ZERO_ADDRESS,
            pageNum: 1,
            pageSize: 10,
        }));
        console.log('getRegistriesOf', await factory.getCollections({
            creator: creator,
            pageNum: 1,
            pageSize: 10,
        }));
    }, 60000);
});