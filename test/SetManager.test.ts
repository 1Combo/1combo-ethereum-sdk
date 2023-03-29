import { config as loadEnv } from 'dotenv';
import { describe, beforeAll, it } from '@jest/globals';

import Auth from '../src/lib/Auth/Auth';
import { SDK } from '../src/lib/SDK/sdk';

import { CONTRACT_ADDRESSES, TEMPLATES } from '../src/lib/SDK/constants';
import { Chains } from '../src/lib/Auth/availableChains';

import SetManager from '../src/lib/ContractTemplates/SetManager';

loadEnv();

async function getGas(sdk: SDK) {
    return (parseFloat(await sdk.getGasPrice()) + 5).toString();
}

describe('SetManager', () => {
    let sdk: SDK;
    let setManager: SetManager;
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
        setManager = await sdk.loadContract({
            templateName: TEMPLATES.SetManager,
            contractAddress: CONTRACT_ADDRESSES.GOERLI.SetManager,
        });
    });

    it('read', async() => {
        const totalSet = await setManager.totalSet();
        console.log('totalSet', totalSet.total.toNumber(), totalSet.startId);

        const types = await setManager.collectionTypesOf({collections: ['0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8']});
        console.log('types', types[0]);

        const sets = await setManager.getSets({setIds: [10000000]});
        console.log('set 1e7', JSON.stringify(sets[0]));

        const setIdsOfCreator = await setManager.setIdsOfCreator({
            creator: '0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8',
            pageNum: 1,
            pageSize: 10
        });
        console.log('setIdsOfCreator', JSON.stringify(setIdsOfCreator));

        const collectionsOf = await setManager.collectionsOf({
            setId: 10000000,
            categoryId: 0,
            pageNum: 1,
            pageSize: 10
        });
        console.log('collectionsOf', JSON.stringify(collectionsOf));

        const setHasAll = await setManager.isSetContainsAllCollections({
            setIds: [10000000],
            setCollections: [['0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8']],
        });
        console.log('setHasAll', setHasAll);

        const collectionInAll = await setManager.verifyCollectionInSet({
            collections: ['0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8'],
            collectionSets: [[10000000]]
        });
        console.log('collectionInAll', JSON.stringify(collectionInAll));
    }, 60000);

    it('write', async() => {
        await expect(setManager.initCollectionTypes({
            collections: ['0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8'],
            gasPrice: await getGas(sdk),
        })).rejects.toMatchObject({'reason': 'cannot estimate gas; transaction may fail or may require manual gas limit'});

        await setManager.createSet({
            name: 'sdk',
            metadataURI: '',
            initialCategoryNames: ['test1'],
            initialCategoryCollections: [],
            gasPrice: await getGas(sdk),
        });

        const setId = (await setManager.setIdsOfCreator({
            creator: creator,
            pageNum: 1,
            pageSize: 10,
        })).setIds[0];
        console.log('created set', setId);

        await setManager.renameSet({
            setId: setId,
            newName: 'sdk test',
            gasPrice: await getGas(sdk),
        });

        await setManager.renameCategroy({
            setId: setId,
            categoryId: 0,
            newName: 'test11',
            gasPrice: await getGas(sdk),
        })

        await setManager.addCollections({
            setId: setId,
            categoryIds: [0],
            categoryCollections: [['0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8']],
            gasPrice: await getGas(sdk),
        });

        await setManager.addCategories({
            setId: setId,
            newCategoryNames: ['test2'],
            initialCategoryCollections: [],
            gasPrice: await getGas(sdk),
        });

        await setManager.changeCategoriesForCollections({
            setId: setId,
            categoryIds: [1],
            categoryCollections: [['0x0f1Da267B55d47d5aBced9be7542A6b3aE9b52B8']],
            gasPrice: await getGas(sdk),
        });

    }, 120000);
});