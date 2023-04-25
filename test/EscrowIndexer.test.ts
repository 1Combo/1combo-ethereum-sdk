import { config as loadEnv } from 'dotenv';
import { describe, beforeAll, it } from '@jest/globals';

import Auth from '../src/lib/Auth/Auth';
import { SDK } from '../src/lib/SDK/sdk';

import { CONTRACT_ADDRESSES, TEMPLATES } from '../src/lib/SDK/constants';
import { Chains } from '../src/lib/Auth/availableChains';

import UUID from '../src/lib/ContractTemplates/UUID';
import EscrowIndexer from '../src/lib/ContractTemplates/EscrowIndexer';

loadEnv();

describe('EscrowIndexer', () => {
    let sdk: SDK;
    let uuidGenerator: UUID;
    let indexer: EscrowIndexer;

    beforeAll(async () => {
        const auth = new Auth({
            privateKey: process.env.KEY,
            projectId: process.env.INFURA_PROJECT_ID,
            secretId: process.env.INFURA_PROJECT_SECRET,
            chainId: Chains.goerli,
        });
        sdk = new SDK(auth);

        uuidGenerator = await sdk.loadContract({
            templateName: TEMPLATES.UUID,
            contractAddress: CONTRACT_ADDRESSES.GOERLI.UUID,
        });

        indexer = await sdk.loadContract({
            templateName: TEMPLATES.EscrowIndexer,
            contractAddress: CONTRACT_ADDRESSES.GOERLI.EscrowIndexer,
        });
    });

    it('all', async() => {
        const uuid = await uuidGenerator.getUUID({ tokenAddress: '0xa0ad8cBcedE83B22377b46C5c301644168e4c454', tokenId: 1});

        let token1 = (await indexer.rootComboOfTokens({
            tokenAddresses: ['0xa0ad8cBcedE83B22377b46C5c301644168e4c454'],
            tokenIds: [[1]]
        }))[0][0];

        let token2 = (await indexer.rootComboOfUUIDs({uuids: [uuid.toNumber()]}))[0];

        expect(token1.tokenAddress).toBe(token2.tokenAddress);
        expect(token1.tokenId.toString()).toBe(token2.tokenId.toString());
    }, 30000);
});