import { config as loadEnv } from 'dotenv';
import { describe, beforeAll, it } from '@jest/globals';

import Auth from '../src/lib/Auth/Auth';
import { SDK } from '../src/lib/SDK/sdk';

import { CONTRACT_ADDRESSES, TEMPLATES } from '../src/lib/SDK/constants';
import { Chains } from '../src/lib/Auth/availableChains';

import CollectionProxy from '../src/lib/ContractTemplates/CollectionProxy';
import { getGas } from './__mocks__/utils';
import { ZERO_ADDRESS } from '../src/lib/constants';

loadEnv();

describe('CollectionProxy', () => {
    let sdk: SDK;
    let proxy: CollectionProxy;
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
        proxy = await sdk.loadContract({
            templateName: TEMPLATES.CollectionProxy,
            contractAddress: CONTRACT_ADDRESSES.GOERLI.CollectionProxy,
        });
    });

    it('read', async() => {
        await proxy.exist({collections: ['0xf5ee72eD90f2015939CF6Fc956F201a04278A011']});
        await proxy.collectionMetasOf({collections: ['0xf5ee72eD90f2015939CF6Fc956F201a04278A011']});
        await proxy.pricesOf({
            collections: ['0xf5ee72eD90f2015939CF6Fc956F201a04278A011'],
            tokenIds: [[1]]
        });

        await proxy.mint({
            to: creator,
            currency: ZERO_ADDRESS, // ZERO_ADDRESS refers to ether
            collections: ['0xf5ee72eD90f2015939CF6Fc956F201a04278A011'],
            tokenIds: [[1]],
            amounts: [[1]],
            gasPrice: await getGas(sdk),
        });
    }, 60000);

    it('write', async() => {
        await expect(proxy.setPrices({
            collections: ['0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8'],
            tokenIds: [[1]],
            sellPricesInEther: [['0.2']],
            gasPrice: await getGas(sdk)
        })).rejects.toMatchObject({'reason': 'cannot estimate gas; transaction may fail or may require manual gas limit'});
        
        await expect(proxy.setReceivers({
            collections: ['0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8'],
            newReceivers: ['0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8'],
            gasPrice: await getGas(sdk)
        })).rejects.toMatchObject({'reason': 'cannot estimate gas; transaction may fail or may require manual gas limit'});
        
    }, 60000);
});