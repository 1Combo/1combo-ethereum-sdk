import { config as loadEnv } from 'dotenv';
import { describe, beforeAll, it } from '@jest/globals';

import Auth from '../src/lib/Auth/Auth';
import { SDK } from '../src/lib/SDK/sdk';

import { CONTRACT_ADDRESSES, TEMPLATES } from '../src/lib/SDK/constants';
import { Chains } from '../src/lib/Auth/availableChains';

import Indexer from '../src/lib/ContractTemplates/Indexer';
import ComboCollProxy from '../src/lib/ContractTemplates/ComboCollProxy';

loadEnv();

describe('ComboCollProxy', () => {
    let sdk: SDK;
    let proxy: ComboCollProxy;
    let indexer: Indexer;
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
        proxy = await sdk.loadContract({
            templateName: TEMPLATES.ComboCollProxy,
            contractAddress: CONTRACT_ADDRESSES.GOERLI.ComboCollProxy,
        });
        indexer = await sdk.loadContract({
            templateName: TEMPLATES.Indexer,
            contractAddress: CONTRACT_ADDRESSES.GOERLI.Indexer,
        });
    });

    it('all', async() => {
        await proxy.exist({combos: ['0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8']});
        await proxy.comboCollMetasOf({combos: ['0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8']});
        await proxy.authoritiesOf({
            indexerDeployed: indexer,
            combo: '0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8',
            to: creator,
            pageNum: 1,
            pageSize: 10,
        });
    }, 60000);
});