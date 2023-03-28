import { config as loadEnv } from 'dotenv';
import { describe, beforeAll, it } from '@jest/globals';

import Auth from '../src/lib/Auth/Auth';
import { SDK } from '../src/lib/SDK/sdk';

import { CONTRACT_ADDRESSES, TEMPLATES } from '../src/lib/SDK/constants';
import { Chains } from '../src/lib/Auth/availableChains';

import CollectionProxy from '../src/lib/ContractTemplates/CollectionProxy';

loadEnv();

async function getGas(sdk: SDK) {
    return (parseFloat(await sdk.getGasPrice()) + 5).toString();
}

describe('CollectionProxy', () => {
    let sdk: SDK;
    let proxy: CollectionProxy;
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
            templateName: TEMPLATES.CollectionProxy,
            contractAddress: CONTRACT_ADDRESSES.GOERLI.CollectionProxy,
        });
    });

    it('all', async() => {
        await proxy.exist({collections: ['0xf5ee72eD90f2015939CF6Fc956F201a04278A011']});
        await proxy.collectionMetasOf({collections: ['0xf5ee72eD90f2015939CF6Fc956F201a04278A011']});
        await proxy.pricesOf({
            collections: ['0xf5ee72eD90f2015939CF6Fc956F201a04278A011'],
            tokenIds: [[1]]
        });

        await proxy.mint({
            to: creator,
            payInEther: true,
            collections: ['0xf5ee72eD90f2015939CF6Fc956F201a04278A011'],
            tokenIds: [[1]],
            amounts: [[1]],
            gasPrice: await getGas(sdk),
        });

    }, 60000);
});