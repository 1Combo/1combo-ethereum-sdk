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

    beforeAll(async () => {
        const auth = new Auth({
            privateKey: process.env.KEY,
            projectId: process.env.INFURA_PROJECT_ID,
            secretId: process.env.INFURA_PROJECT_SECRET,
            chainId: Chains.goerli,
        });
        sdk = new SDK(auth);
        accounting = await sdk.loadContract({
            templateName: TEMPLATES.Accounting,
            contractAddress: CONTRACT_ADDRESSES.GOERLI.Accounting,
        });
    });

    it('all', async() => {
        const receivers = await accounting.receiversOf({collections: ['0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8']});
        console.log(receivers[0]);

        const collections = await accounting.collectionsOf({receiver: receivers[0]});
        expect(collections.length).toBeGreaterThan(0);

        let found = false;
        for (let c of collections) {
            if (c == '0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8') {
                found = true;
                break;
            }
        }
        expect(found).toBe(true);
    }, 20000);
});