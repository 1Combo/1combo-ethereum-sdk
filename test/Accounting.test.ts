import { config as loadEnv } from 'dotenv';
import { describe, beforeAll, it } from '@jest/globals';

import Auth from '../src/lib/Auth/Auth';
import { SDK } from '../src/lib/SDK/sdk';

import { CONTRACT_ADDRESSES, TEMPLATES } from '../src/lib/SDK/constants';
import { Chains } from '../src/lib/Auth/availableChains';

import Accounting from '../src/lib/ContractTemplates/Accounting';

loadEnv();

describe('Accounting', () => {
    let sdk: SDK;
    let accounting: Accounting;
    // @ts-ignore
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
        accounting = await sdk.loadContract({
            templateName: TEMPLATES.Accounting,
            contractAddress: CONTRACT_ADDRESSES.GOERLI.Accounting,
        });
    });

    it('all', async() => {
        await accounting.collectionsOf({receiver: creator});
        await accounting.pageCollectionsOf({receiver: creator, pageNum: 1, pageSize: 10})

        await expect(
            accounting.receiversOf({collections: ['0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8']})
        ).rejects.toMatchObject({
            errorName: 'NotFound'
        });
    }, 20000);
});