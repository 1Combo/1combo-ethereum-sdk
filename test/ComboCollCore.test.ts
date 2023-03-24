import { config as loadEnv } from 'dotenv';
import { describe, beforeAll, it } from '@jest/globals';

import Auth from '../src/lib/Auth/Auth';
import { SDK } from '../src/lib/SDK/sdk';

import { generateTestPrivateKeyOrHash } from './__mocks__/utils';
import { TEMPLATES } from '../src/lib/constants';

import ComboCollCore from '../src/lib/ContractTemplates/ComboCollCore';

loadEnv();

describe('ComboCollCore', () => {

    const GOERLI_COMBOCOLLCORE_ADDRESS_1 = '0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8';

    let sdk: SDK;
    let core: ComboCollCore;

    beforeAll(async () => {
        const auth = new Auth({
            privateKey: generateTestPrivateKeyOrHash(),
            // rpcUrl: process.env.EVM_RPC_URL,
            projectId: process.env.INFURA_PROJECT_ID,
            secretId: process.env.INFURA_PROJECT_SECRET,
            chainId: 5,
        });
        sdk = new SDK(auth);
        core = await sdk.loadContract({
            template: TEMPLATES.ComboCollCore,
            contractAddress: GOERLI_COMBOCOLLCORE_ADDRESS_1,
        });
    });

    describe('royaltyInfo', () => {
        it('ok', async() => {
            const info = await core.royaltyInfo({
                tokenId: 1,
                sellPrice: 10000,
            });
            expect(info.receiver).toBe(GOERLI_COMBOCOLLCORE_ADDRESS_1);
            expect(info.royaltyAmount.toNumber()).toBe(250);
        });
    });
});