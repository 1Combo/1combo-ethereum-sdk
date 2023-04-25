import { config as loadEnv } from 'dotenv';
import { describe, beforeAll, it } from '@jest/globals';

import Auth from '../src/lib/Auth/Auth';
import { SDK } from '../src/lib/SDK/sdk';

import { CONTRACT_ADDRESSES, TEMPLATES } from '../src/lib/SDK/constants';
import { Chains } from '../src/lib/Auth/availableChains';

import Vault from '../src/lib/ContractTemplates/Vault';
import { ZERO_ADDRESS } from '../src/lib/constants';

loadEnv();

describe('Vault', () => {
    let sdk: SDK;
    let vault: Vault;

    beforeAll(async () => {
        const auth = new Auth({
            privateKey: process.env.KEY,
            projectId: process.env.INFURA_PROJECT_ID,
            secretId: process.env.INFURA_PROJECT_SECRET,
            chainId: Chains.goerli,
        });
        sdk = new SDK(auth);
        vault = await sdk.loadContract({
            templateName: TEMPLATES.Vault,
            contractAddress: CONTRACT_ADDRESSES.GOERLI.Vault,
        });
    });

    it('all', async() => {
        let claimables = (await vault.claimablesOfCollections({
            currencies: [ZERO_ADDRESS],
            collections: ['0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8']
        }))[0];

        expect(claimables.collection).toBe('0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8');
        expect(claimables.token).toBe(ZERO_ADDRESS);
        expect(claimables.pending.toNumber()).toBe(0);
        expect(claimables.totalClaimed.toNumber()).toBe(0);

        // const gas = (parseFloat(await sdk.getGasPrice()) + 5).toString();
        // await vault.claim({gasPrice: gas});

        // fail if no own collections
        // await vault.claimTarget({
        //     erc20: '0xef274b03dC8A3e85a654fE49c1E42d44B913cfB4',
        //     collections: ['0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8'],
        //     gasPrice: gas,
        // })
    }, 30000);
});