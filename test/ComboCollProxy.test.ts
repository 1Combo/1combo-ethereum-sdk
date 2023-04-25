import { config as loadEnv } from 'dotenv';
import { describe, beforeAll, it } from '@jest/globals';

import Auth from '../src/lib/Auth/Auth';
import { SDK } from '../src/lib/SDK/sdk';

import { CONTRACT_ADDRESSES, TEMPLATES } from '../src/lib/SDK/constants';
import { Chains } from '../src/lib/Auth/availableChains';

import UUID from '../src/lib/ContractTemplates/UUID';
import ComboCollProxy from '../src/lib/ContractTemplates/ComboCollProxy';
import { getGas } from './__mocks__/utils';

loadEnv();

describe('ComboCollProxy', () => {
    let sdk: SDK;
    let proxy: ComboCollProxy;
    // @ts-ignore
    let uuidGenerator: UUID;
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
            templateName: TEMPLATES.ComboCollProxy,
            contractAddress: CONTRACT_ADDRESSES.GOERLI.ComboCollProxy,
        });
        uuidGenerator = await sdk.loadContract({
            templateName: TEMPLATES.UUID,
            contractAddress: CONTRACT_ADDRESSES.GOERLI.UUID,
        });
    });

    it('read', async() => {
        await proxy.exist({combos: ['0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8']});
        await proxy.comboCollMetasOf({combos: ['0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8']});
        await proxy.pageEscrowAllowances({
            uuidDeployed: uuidGenerator,
            combo: '0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8',
            to: creator,
            pageNum: 1,
            pageSize: 10,
        });

        await proxy.escrowAllowances({
            uuidDeployed: uuidGenerator,
            combo: '',
            to: creator,
            uuids: []
        })
    }, 60000);

    it('write', async() => {
        await expect(proxy.dismantle({
            combo: '0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8',
            comboId: 1,
            gasPrice: await getGas(sdk)
        })).rejects.toMatchObject({'reason': 'cannot estimate gas; transaction may fail or may require manual gas limit'});

        await expect(proxy.setMintPriceBatch({
            combos: ['0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8'],
            pricesInEther: ['0.2'],
            gasPrice: await getGas(sdk)
        })).rejects.toMatchObject({'reason': 'cannot estimate gas; transaction may fail or may require manual gas limit'});
        
        await expect(proxy.setReceivers({
            combos: ['0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8'],
            newReceivers: ['0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8'],
            gasPrice: await getGas(sdk)
        })).rejects.toMatchObject({'reason': 'cannot estimate gas; transaction may fail or may require manual gas limit'});
        
        await expect(proxy.approve({
            combo: '0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8',
            spender: '0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8',
            tokenAddresses: ['0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8'],
            tokenIds: [[1]],
            allowances: [[1]],
            gasPrice: await getGas(sdk)
        })).rejects.toMatchObject({'reason': 'cannot estimate gas; transaction may fail or may require manual gas limit'});
    }, 60000);
});