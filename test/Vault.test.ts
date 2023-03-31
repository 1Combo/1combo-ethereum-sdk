import { config as loadEnv } from 'dotenv';
import { describe, beforeAll, it } from '@jest/globals';

import Auth from '../src/lib/Auth/Auth';
import { SDK } from '../src/lib/SDK/sdk';

import { CONTRACT_ADDRESSES, TEMPLATES } from '../src/lib/SDK/constants';
import { Chains } from '../src/lib/Auth/availableChains';

import Vault from '../src/lib/ContractTemplates/Vault';

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
        let claimables1 = await vault.claimablesOfCollections({collections: ['0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8']});
        let claimables2 = await vault.claimablesOfCollectionsTarget({
            erc20: '0xef274b03dC8A3e85a654fE49c1E42d44B913cfB4',
            collections: ['0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8']
        });
        expect(claimables1[0].erc20Amount.eq(claimables2[0].erc20Amount)).toBe(true);
        expect(claimables1[0].ethAmount.eq(claimables2[0].ethAmount)).toBe(true);
        expect(claimables1[0].token).toBe(claimables2[0].token);
        console.log(claimables1);

        claimables1 = await vault.claimablesOfReceivers({receivers: ['0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8']});
        claimables2 = await vault.claimablesOfReceiversTarget({
            erc20: '0xef274b03dC8A3e85a654fE49c1E42d44B913cfB4',
            receivers: ['0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8']
        });
        expect(claimables1[0].erc20Amount.eq(claimables2[0].erc20Amount)).toBe(true);
        expect(claimables1[0].ethAmount.eq(claimables2[0].ethAmount)).toBe(true);
        expect(claimables1[0].token).toBe(claimables2[0].token);
        console.log(claimables2);

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