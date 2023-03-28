import { config as loadEnv } from 'dotenv';
import { describe, beforeAll, it } from '@jest/globals';

import Auth from '../src/lib/Auth/Auth';
import { SDK } from '../src/lib/SDK/sdk';

import { generateTestPrivateKeyOrHash } from './__mocks__/utils';
import { TEMPLATES } from '../src/lib/SDK/constants';
import { Chains } from '../src/lib/Auth/availableChains';

import ComboCollCore from '../src/lib/ContractTemplates/ComboCollCore';
import { ZERO_ADDRESS } from '../src/lib/constants';

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
            chainId: Chains.goerli,
        });
        sdk = new SDK(auth);
        core = await sdk.loadContract({
            templateName: TEMPLATES.ComboCollCore,
            contractAddress: GOERLI_COMBOCOLLCORE_ADDRESS_1,
        });
    });

    it('royaltyInfo', async() => {
        const info = await core.royaltyInfo({
            tokenId: 1,
            sellPrice: 10000,
        });
        expect(info.receiver).toBe(GOERLI_COMBOCOLLCORE_ADDRESS_1);
        expect(info.royaltyAmount.toNumber()).toBe(250);
    });

    it('getComboRules', async() => {
        const rules = await core.getComboRules();
        expect(rules.factors.length).toBe(2);

        expect(rules.factors[0].max.toNumber()).toBe(1);
        expect(rules.factors[0].min.toNumber()).toBe(1);
        expect(rules.factors[0].limit.toNumber()).toBe(0);
        expect(rules.factors[0].setId).toBe(0);
        expect(rules.factors[0].collection).toBe('0xf5ee72eD90f2015939CF6Fc956F201a04278A011');
        expect(rules.factors[0].lock).toBe(true);

        expect(rules.factors[1].max.toNumber()).toBe(7);
        expect(rules.factors[1].min.toNumber()).toBe(1);
        expect(rules.factors[1].limit.toNumber()).toBe(1);
        expect(rules.factors[1].setId).toBe(10000002);
        expect(rules.factors[1].collection).toBe(ZERO_ADDRESS);
        expect(rules.factors[1].lock).toBe(false);
    });

    it('getIngredients/getLimitedTokenUsages', async() => {
        const ingredients = await core.getIngredients({comboIds: [1]});
        expect(JSON.stringify(ingredients)).toBe('[[[{"type":"BigNumber","hex":"0x500000ab"},{"type":"BigNumber","hex":"0x01"},10000002,1,false,true],[{"type":"BigNumber","hex":"0x0150000002"},{"type":"BigNumber","hex":"0x01"},0,2,true,false]]]');

        const uuid = ingredients[0][0].uuid.toString();
        const usages = await core.getLimitedTokenUsages({
            setIds: [ingredients[0][0].setId],
            uuids: [uuid]
        });
        expect(usages[0].toNumber()).toBeGreaterThan(0);
    }, 10000);
});