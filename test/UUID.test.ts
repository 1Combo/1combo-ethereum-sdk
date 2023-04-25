import { config as loadEnv } from 'dotenv';
import { describe, beforeAll, it } from '@jest/globals';

import Auth from '../src/lib/Auth/Auth';
import { SDK } from '../src/lib/SDK/sdk';

import { CONTRACT_ADDRESSES, TEMPLATES } from '../src/lib/SDK/constants';
import { Chains } from '../src/lib/Auth/availableChains';

import UUID from '../src/lib/ContractTemplates/UUID';

loadEnv();

describe('UUID', () => {
    let sdk: SDK;
    let uuidGenerator: UUID;

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
    });

    it('write', async () => {
        let gas = await sdk.getGasPrice();
        await uuidGenerator.registerCollections({
            collections: [
                '0xa1E0345046CFDFE30914B2d13e800FBadC856144'
            ],
            gasPrice: (parseFloat(gas) + 10).toString(),
        });

        gas = await sdk.getGasPrice();
        await uuidGenerator.getOrGenerateUUID({
            tokenAddresses: [
                '0xa0ad8cBcedE83B22377b46C5c301644168e4c454'
            ],
            tokenIds: [[1]],
            gasPrice: (parseFloat(gas) + 10).toString(),
        });
    }, 100000);

    it('read', async () => {
        const uuid = await uuidGenerator.getUUID({ tokenAddress: '0xa0ad8cBcedE83B22377b46C5c301644168e4c454', tokenId: 1});
        console.log(uuid.toNumber());

        const uuids = await uuidGenerator.getUUIDBatch({ tokenAddresses: ['0xa1E0345046CFDFE30914B2d13e800FBadC856144'], tokenIds: [[1]]});
        console.log(uuids);

        const token = await uuidGenerator.tokenOf({ uuid: uuid.toNumber()});
        console.log(token);

        const tokens = await uuidGenerator.tokensOf({ uuids: [uuids[0][0].toNumber()] });
        console.log(tokens);
    }, 30000);
});