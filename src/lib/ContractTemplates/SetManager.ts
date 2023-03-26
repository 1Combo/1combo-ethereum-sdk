import { ethers, BigNumber as BN } from 'ethers';
import { Logger, log, ErrorLocation } from '../Logger';
import artifact from './artifacts/SetManager';
import { addGasPriceToOptions, isAllValidAddress, isAllValidNonNegInteger, isValidNonNegInteger, isValidPositiveNumber } from '../utils';
import preparePolygonTransaction from './utils';
import { Chains } from '../Auth/availableChains';

type ContractAddressOptions = {
    contractAddress: string;
};

type TotalSetReturn = {
    total: BN;
    startId: BN;
};

type CollectionListOptions = {
    collections: Array<string>;
};

type InitCollectionTypesOptions = {
    collections: Array<string>;
    gas?: string | undefined;
};

type CreateSetOptions = {
    name: string;
    metadataURI: string;
    initialCategoryNames: Array<string>;
    initialCategoryCollections: Array<Array<string>>;
    gas?: string | undefined;
};

type AddCollectionsOptions = {
    setId: number;
    categoryIds: Array<number>;
    categoryCollections: Array<Array<string>>;
    gas?: string | undefined;
};

type AddCategoriesOptions = {
    setId: number;
    newCategoryNames: Array<string>;
    initialCategoryCollections: Array<Array<string>>;
    gas?: string | undefined;
};

type RenameSetOptions = {
    setId: number;
    newName: string;
    gas?: string | undefined;
};

type RenameCategoryOptions = {
    setId: number;
    categoryId: number;
    newName: string;
    gas?: string | undefined;
};

enum CollectionType {
    UNDEFINED,
    ERC721,
    ERC1155,
    COMBO
};

type GetSetsOptions = {
    setIds: Array<number>;
};

type SetInfo = {
    creator: string;
    name: string;
    uri: string;
    categoryCollNums: Array<BN>;
    categoryIds: Array<BN>;
    categoryNames: Array<string>;
};

type SetIdsOfCreatorOptions = {
    creator: string;
    pageNum: number;
    pageSize: number;
};

type SetIdsOfCreatorReturn = {
    total: BN;
    setIds: Array<BN>;
};

type CollectionsOfOptions = {
    setId: number;
    categoryId: number;
    pageNum: number;
    pageSize: number;
};

type CollectionsOfReturn = {
    total: BN;
    collections: Array<string>;
    collectionTypes: Array<CollectionType>;
};

type VerifyCollectionInSetOptions = {
    collections: Array<string>;
    collectionSets: Array<Array<number>>;
};

type IsSetContainsAllCollectionsOptions = {
    setIds: Array<number>;
    setCollections: Array<Array<string>>;
};

export default class SetManager {
    contractAddress: string;

    private contractDeployed: ethers.Contract;
    private readonly signer;

    constructor(signer: ethers.Wallet | ethers.providers.JsonRpcSigner) {
        this.signer = signer;
    }

    private assertContractLoaded(location: ErrorLocation) {
        if (!this.contractDeployed) {
            log.throwArgumentError(
                Logger.message.contract_not_deployed_or_loaded,
                'contractAddress',
                this.contractAddress,
                {
                    location: location,
                },
            );
        }
    }

    private assertArrayLengthEqual(a: Array<any>, b: Array<any>, location: ErrorLocation) {
        if (a.length != b.length) {
            log.throwArgumentError(
                Logger.message.array_length_mismatched,
                'contractAddress',
                this.contractAddress,
                {
                    location: location,
                },
            );
        }
    }

    /**
   * Load an SetManager contract from an existing contract address. Used by the SDK class
   * @param {object} params object containing all parameters
   * @param {string} params.contractAddress Address of the SetManager contract to load
   * @returns {SetManager} Contract
   */
    loadContract(params: ContractAddressOptions): SetManager {
        if (this.contractAddress || this.contractDeployed) {
            log.throwArgumentError(
                Logger.message.contract_already_loaded,
                'contractAddress',
                this.contractAddress,
                {
                    location: Logger.location.SETMANAGER_LOADCONTRACT,
                },
            );
        }

        if (!isAllValidAddress(params.contractAddress)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.SETMANAGER_LOADCONTRACT,
            });
        }

        try {
            this.contractAddress = <string>params.contractAddress;

            this.contractDeployed = new ethers.Contract(
                this.contractAddress,
                artifact.abi,
                this.signer,
            );
            return this;
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.SETMANAGER_LOADCONTRACT,
                error,
            });
        }
    }

    /**
     * Returns total number of sets
     * @returns {Promise<TotalSetReturn>} Total number and start id
     */
    async totalSet(): Promise<TotalSetReturn> {
        this.assertContractLoaded(Logger.location.SETMANAGER_TOTALSET);

        try {
            return (async () => {
                const object = (await this.contractDeployed.totalSet()) as Array<any>;
                return {
                    total: object[0],
                    startId: object[1],
                } as TotalSetReturn;
            })();
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.SETMANAGER_TOTALSET,
                error,
            });
        }
    }

    /**
     * Detects collection's type (ERC721/ERC1155/Combo) and cache it into SetManager
     * @param {object} params object containing all parameters
     * @param {Array<string>} params.collections  collection address
     * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
     */
    async initCollectionTypes(params: InitCollectionTypesOptions): Promise<ethers.providers.TransactionResponse> {
        this.assertContractLoaded(Logger.location.SETMANAGER_INITCOLLECTIONTYPE);

        if (!isAllValidAddress(params.collections)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.SETMANAGER_INITCOLLECTIONTYPE,
            });
        }

        try {
            const chainId = await this.contractDeployed.signer.getChainId();
            let options;
            // If Polygon mainnet, set up options propperly to avoid underpriced transaction error
            if (chainId === Chains.polygon)
                options = await preparePolygonTransaction(
                    await this.contractDeployed.signer.getTransactionCount(),
                );
            else options = addGasPriceToOptions({}, params.gas, Logger.location.SETMANAGER_ADDGASPRICETOOPTIONS);

            return this.contractDeployed.initCollectionTypes(params.collections, options);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.SETMANAGER_INITCOLLECTIONTYPE,
                error,
            });
        }
    }

    /**
     * Creates new set
     * @param {object} params object containing all parameters
     * @param {string} params.name of set, optional
     * @param {string} params.metadataURI of set, optional
     * @param {Array<string>} params.initialCategoryNames optional, names of initial categories in new set
     * @param {Array<Array<string>>} params.initialCategoryCollections collections added into corresponding initial category
     * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
     */
    async createSet(params: CreateSetOptions): Promise<ethers.providers.TransactionResponse> {
        this.assertContractLoaded(Logger.location.SETMANAGER_CREATESET);
        this.assertArrayLengthEqual(params.initialCategoryNames, params.initialCategoryCollections, Logger.location.SETMANAGER_CREATESET);

        if (params.name.length == 0) {
            log.throwMissingArgumentError(Logger.message.empty_name, {
                location: Logger.location.SETMANAGER_CREATESET,
            });
        }

        params.initialCategoryNames.forEach(name => {
            if (name.length == 0) {
                log.throwMissingArgumentError(Logger.message.empty_name, {
                    location: Logger.location.SETMANAGER_CREATESET,
                });
            }
        });

        params.initialCategoryCollections.forEach(list => list.forEach(collection => {
            if (!isAllValidAddress(collection)) {
                log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                    location: Logger.location.SETMANAGER_CREATESET,
                });
            }
        }));

        try {
            const chainId = await this.contractDeployed.signer.getChainId();
            let options;
            // If Polygon mainnet, set up options propperly to avoid underpriced transaction error
            if (chainId === Chains.polygon)
                options = await preparePolygonTransaction(
                    await this.contractDeployed.signer.getTransactionCount(),
                );
            else options = addGasPriceToOptions({}, params.gas, Logger.location.SETMANAGER_ADDGASPRICETOOPTIONS);

            return this.contractDeployed.createSet(params.name, params.metadataURI, params.initialCategoryNames, params.initialCategoryCollections, options);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.SETMANAGER_CREATESET,
                error,
            });
        }
    }

    /**
     * Adds collections into specified category of the target set
     * @param {object} params object containing all parameters
     * @param {number} params.setId target set
     * @param {Array<number>} params.categoryIds id of target category
     * @param {Array<Array<string>>} params.categoryCollections collections added into corresponding category
     * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
     */
    async addCollections(params: AddCollectionsOptions): Promise<ethers.providers.TransactionResponse> {
        this.assertContractLoaded(Logger.location.SETMANAGER_ADDCOLLECTIONS);
        this.assertArrayLengthEqual(params.categoryIds, params.categoryCollections, Logger.location.SETMANAGER_ADDCOLLECTIONS);

        if (!isValidNonNegInteger(params.setId)) {
            log.throwMissingArgumentError(Logger.message.invalid_set_id, {
                location: Logger.location.SETMANAGER_ADDCOLLECTIONS,
            });
        }

        params.categoryIds.forEach(id => {
            if (!isValidNonNegInteger(id)) {
                log.throwMissingArgumentError(Logger.message.invalid_category_id, {
                    location: Logger.location.SETMANAGER_ADDCOLLECTIONS,
                });
            }
        });

        params.categoryCollections.forEach(list => list.forEach(collection => {
            if (!isAllValidAddress(collection)) {
                log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                    location: Logger.location.SETMANAGER_ADDCOLLECTIONS,
                });
            }
        }));

        try {
            const chainId = await this.contractDeployed.signer.getChainId();
            let options;
            // If Polygon mainnet, set up options propperly to avoid underpriced transaction error
            if (chainId === Chains.polygon)
                options = await preparePolygonTransaction(
                    await this.contractDeployed.signer.getTransactionCount(),
                );
            else options = addGasPriceToOptions({}, params.gas, Logger.location.SETMANAGER_ADDGASPRICETOOPTIONS);

            return this.contractDeployed.addCollections(params.setId, params.categoryIds, params.categoryCollections, options);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.SETMANAGER_ADDCOLLECTIONS,
                error,
            });
        }
    }

    /**
     * Moves collection from current category it belongs to to another one in the same set
     * @param {object} params object containing all parameters
     * @param {number} params.setId set to operate
     * @param {Array<number>} params.categoryIds id of new category
     * @param {Array<Array<string>>} params.categoryCollections collections to be moved
     * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
     */
    async changeCategoriesForCollections(params: AddCollectionsOptions): Promise<ethers.providers.TransactionResponse> {
        this.assertContractLoaded(Logger.location.SETMANAGER_CHANGECATEGORY);
        this.assertArrayLengthEqual(params.categoryIds, params.categoryCollections, Logger.location.SETMANAGER_CHANGECATEGORY);

        if (!isValidNonNegInteger(params.setId)) {
            log.throwMissingArgumentError(Logger.message.invalid_set_id, {
                location: Logger.location.SETMANAGER_CHANGECATEGORY,
            });
        }

        params.categoryIds.forEach(id => {
            if (!isValidNonNegInteger(id)) {
                log.throwMissingArgumentError(Logger.message.invalid_category_id, {
                    location: Logger.location.SETMANAGER_CHANGECATEGORY,
                });
            }
        });

        params.categoryCollections.forEach(list => list.forEach(collection => {
            if (!isAllValidAddress(collection)) {
                log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                    location: Logger.location.SETMANAGER_CHANGECATEGORY,
                });
            }
        }));

        try {
            const chainId = await this.contractDeployed.signer.getChainId();
            let options;
            // If Polygon mainnet, set up options propperly to avoid underpriced transaction error
            if (chainId === Chains.polygon)
                options = await preparePolygonTransaction(
                    await this.contractDeployed.signer.getTransactionCount(),
                );
            else options = addGasPriceToOptions({}, params.gas, Logger.location.SETMANAGER_ADDGASPRICETOOPTIONS);

            return this.contractDeployed.changeCategoriesForCollections(params.setId, params.categoryIds, params.categoryCollections, options);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.SETMANAGER_CHANGECATEGORY,
                error,
            });
        }
    }

    /**
     * Adds new categories
     * @param {object} params object containing all parameters
     * @param {number} params.setId set to operate
     * @param {Array<string>} params.categories name of new category
     * @param {Array<Array<string>>} params.categoryCollections collections to be added into corresponding new category
     * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
     */
    async addCategories(params: AddCategoriesOptions): Promise<ethers.providers.TransactionResponse> {
        this.assertContractLoaded(Logger.location.SETMANAGER_ADDCATEGORIES);
        this.assertArrayLengthEqual(params.newCategoryNames, params.initialCategoryCollections, Logger.location.SETMANAGER_ADDCATEGORIES);

        if (!isValidNonNegInteger(params.setId)) {
            log.throwMissingArgumentError(Logger.message.invalid_set_id, {
                location: Logger.location.SETMANAGER_ADDCATEGORIES,
            });
        }

        params.newCategoryNames.forEach(name => {
            if (name.length == 0) {
                log.throwMissingArgumentError(Logger.message.empty_name, {
                    location: Logger.location.SETMANAGER_ADDCATEGORIES,
                });
            }
        });

        params.initialCategoryCollections.forEach(list => list.forEach(collection => {
            if (!isAllValidAddress(collection)) {
                log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                    location: Logger.location.SETMANAGER_ADDCATEGORIES,
                });
            }
        }));

        try {
            const chainId = await this.contractDeployed.signer.getChainId();
            let options;
            // If Polygon mainnet, set up options propperly to avoid underpriced transaction error
            if (chainId === Chains.polygon)
                options = await preparePolygonTransaction(
                    await this.contractDeployed.signer.getTransactionCount(),
                );
            else options = addGasPriceToOptions({}, params.gas, Logger.location.SETMANAGER_ADDGASPRICETOOPTIONS);

            return this.contractDeployed.addCategories(params.setId, params.newCategoryNames, params.initialCategoryCollections, options);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.SETMANAGER_ADDCATEGORIES,
                error,
            });
        }
    }

    /**
     * Renames a set
     * @param {object} params object containing all parameters
     * @param {number} params.setId set to operate
     * @param {string} params.newName the new name to set
     * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
     */
    async renameSet(params: RenameSetOptions): Promise<ethers.providers.TransactionResponse> {
        this.assertContractLoaded(Logger.location.SETMANAGER_RENAMESET);

        if (!isValidNonNegInteger(params.setId)) {
            log.throwMissingArgumentError(Logger.message.invalid_set_id, {
                location: Logger.location.SETMANAGER_RENAMESET,
            });
        }

        if (params.newName.length == 0) {
            log.throwMissingArgumentError(Logger.message.empty_name, {
                location: Logger.location.SETMANAGER_RENAMESET,
            });
        }

        try {
            const chainId = await this.contractDeployed.signer.getChainId();
            let options;
            // If Polygon mainnet, set up options propperly to avoid underpriced transaction error
            if (chainId === Chains.polygon)
                options = await preparePolygonTransaction(
                    await this.contractDeployed.signer.getTransactionCount(),
                );
            else options = addGasPriceToOptions({}, params.gas, Logger.location.SETMANAGER_ADDGASPRICETOOPTIONS);

            return this.contractDeployed.renameSet(params.setId, params.newName, options);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.SETMANAGER_RENAMESET,
                error,
            });
        }
    }

    /**
     * Renames a category in target set
     * @param {object} params object containing all parameters
     * @param {number} params.setId target set
     * @param {number} params.categoryId category to operate
     * @param {string} params.newName the new name to set
     * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
     */
    async renameCategroy(params: RenameCategoryOptions): Promise<ethers.providers.TransactionResponse> {
        this.assertContractLoaded(Logger.location.SETMANAGER_RENAMECATEGORY);

        if (!isValidNonNegInteger(params.setId)) {
            log.throwMissingArgumentError(Logger.message.invalid_set_id, {
                location: Logger.location.SETMANAGER_RENAMECATEGORY,
            });
        }

        if (!isValidNonNegInteger(params.categoryId)) {
            log.throwMissingArgumentError(Logger.message.invalid_category_id, {
                location: Logger.location.SETMANAGER_RENAMECATEGORY,
            });
        }

        if (params.newName.length == 0) {
            log.throwMissingArgumentError(Logger.message.empty_name, {
                location: Logger.location.SETMANAGER_RENAMECATEGORY,
            });
        }

        try {
            const chainId = await this.contractDeployed.signer.getChainId();
            let options;
            // If Polygon mainnet, set up options propperly to avoid underpriced transaction error
            if (chainId === Chains.polygon)
                options = await preparePolygonTransaction(
                    await this.contractDeployed.signer.getTransactionCount(),
                );
            else options = addGasPriceToOptions({}, params.gas, Logger.location.SETMANAGER_ADDGASPRICETOOPTIONS);

            return this.contractDeployed.renameCategroy(params.setId, params.categoryId, params.newName, options);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.SETMANAGER_RENAMECATEGORY,
                error,
            });
        }
    }


    /**
     * Returns type of collection, UNDEFINED will be returned if not initialized in SetManager before
     * @param {object} params object containing all parameters
     * @param {Array<string>} params.collections collection address
     * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
     */
    async collectionTypesOf(params: CollectionListOptions): Promise<Array<CollectionType>> {
        this.assertContractLoaded(Logger.location.SETMANAGER_COLLECTIONTYPESOF);

        if (!isAllValidAddress(params.collections)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.SETMANAGER_COLLECTIONTYPESOF,
            });
        }

        try {
            return this.contractDeployed.collectionTypesOf(params.collections);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.SETMANAGER_COLLECTIONTYPESOF,
                error,
            });
        }
    }

    /**
     * Returns set info
     * @param {object} params object containing all parameters
     * @param {Array<number>} params.setIds sets to query
     * @returns {Promise<Array<SetInfo>>} List of SetInfo
     */
    async getSets(params: GetSetsOptions): Promise<Array<SetInfo>> {
        this.assertContractLoaded(Logger.location.SETMANAGER_GETSETS);

        if (!isAllValidNonNegInteger(params.setIds)) {
            log.throwMissingArgumentError(Logger.message.invalid_set_id, {
                location: Logger.location.SETMANAGER_GETSETS,
            });
        }

        try {
            return this.contractDeployed.getSets(params.setIds);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.SETMANAGER_GETSETS,
                error,
            });
        }
    }

    /**
     * Querys set id created by specified user by page
     * @param {object} params object containing all parameters
     * @param {string} params.creator - address of user
     * @param {number} params.pageNum - page number to query, start from 1
     * @param {number} params.pageSize - page size, must be greater than 0
     * @returns {Promise<SetIdsOfCreatorReturn>} Total number and sets for current page
     */
    async setIdsOfCreator(params: SetIdsOfCreatorOptions): Promise<SetIdsOfCreatorReturn> {
        this.assertContractLoaded(Logger.location.SETMANAGER_SETIDSOFCREATOR);

        if (!isValidPositiveNumber(params.pageNum) || !isValidPositiveNumber(params.pageSize)) {
            log.throwMissingArgumentError(Logger.message.invalid_page_param, {
                location: Logger.location.SETMANAGER_SETIDSOFCREATOR,
            });
        }

        try {
            return (async () => {
                const result = (await this.contractDeployed.setIdsOfCreator(params.creator, params.pageNum, params.pageSize)) as Array<any>;
                return {
                    total: result[0],
                    setIds: result[1]
                } as SetIdsOfCreatorReturn;
            })();
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.SETMANAGER_SETIDSOFCREATOR,
                error,
            });
        }
    }

    /**
     * Querys collections in specified category of target set by page
     * @param {object} params object containing all parameters
     * @param {number} params.setId
     * @param {number} params.categoryId
     * @param {number} params.pageNum - page number to query, start from 1
     * @param {number} params.pageSize - page size, must be greater than 0
     * @returns {Promise<CollectionsOfReturn>}
     */
    async collectionsOf(params: CollectionsOfOptions): Promise<CollectionsOfReturn> {
        this.assertContractLoaded(Logger.location.SETMANAGER_COLLECTIONSOF);

        if (!isAllValidNonNegInteger(params.setId)) {
            log.throwMissingArgumentError(Logger.message.invalid_set_id, {
                location: Logger.location.SETMANAGER_COLLECTIONSOF,
            });
        }

        if (!isAllValidNonNegInteger(params.categoryId)) {
            log.throwMissingArgumentError(Logger.message.invalid_category_id, {
                location: Logger.location.SETMANAGER_COLLECTIONSOF,
            });
        }

        if (!isValidPositiveNumber(params.pageNum) || !isValidPositiveNumber(params.pageSize)) {
            log.throwMissingArgumentError(Logger.message.invalid_page_param, {
                location: Logger.location.SETMANAGER_COLLECTIONSOF,
            });
        }

        try {
            return (async () => {
                const result = (await this.contractDeployed.collectionsOf(
                    params.setId,
                    params.categoryId,
                    params.pageNum,
                    params.pageSize
                )) as Array<any>;
                return {
                    total: result[0],
                    collections: result[1],
                    collectionTypes: result[2]
                } as CollectionsOfReturn;
            })();
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.SETMANAGER_COLLECTIONSOF,
                error,
            });
        }
    }

    /**
     * Checks if a collection is in target sets
     * @param {object} params object containing all parameters
     * @param {Array<string>} params.collections 
     * @param {Array<Array<number>>} params.collectionSets sets to check corresponding to collection
     * @returns {Promise<Array<CollectionType>>} Returns empty list as long as one collection not in any set
     */
    async verifyCollectionInSet(params: VerifyCollectionInSetOptions): Promise<Array<CollectionType>> {
        this.assertContractLoaded(Logger.location.SETMANAGER_VERIFYCOLLECTIONINSET);
        this.assertArrayLengthEqual(params.collections, params.collectionSets, Logger.location.SETMANAGER_VERIFYCOLLECTIONINSET)

        if (!isAllValidAddress(params.collections)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.SETMANAGER_VERIFYCOLLECTIONINSET,
            });
        }

        if (!isAllValidNonNegInteger(params.collectionSets)) {
            log.throwMissingArgumentError(Logger.message.invalid_set_id, {
                location: Logger.location.SETMANAGER_VERIFYCOLLECTIONINSET,
            });
        }

        try {
            return this.contractDeployed.verifyCollectionInSet(params.collections, params.collectionSets);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.SETMANAGER_VERIFYCOLLECTIONINSET,
                error,
            });
        }
    }

    /**
     * Checks if a set contains all of target collections
     * @param {object} params object containing all parameters
     * @param {Array<number>} params.setIds 
     * @param {Array<Array<string>>} params.setCollections
     * @returns {Promise<boolean>}
     */
    async isSetContainsAllCollections(params: IsSetContainsAllCollectionsOptions): Promise<boolean> {
        this.assertContractLoaded(Logger.location.SETMANAGER_ISSETCONTAINSALLCOLLECTIONS);
        this.assertArrayLengthEqual(params.setIds, params.setCollections, Logger.location.SETMANAGER_ISSETCONTAINSALLCOLLECTIONS)

        params.setCollections.forEach(list => {
            if (!isAllValidAddress(list)) {
                log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                    location: Logger.location.SETMANAGER_ISSETCONTAINSALLCOLLECTIONS,
                });
            }
        });

        if (!isAllValidNonNegInteger(params.setIds)) {
            log.throwMissingArgumentError(Logger.message.invalid_set_id, {
                location: Logger.location.SETMANAGER_ISSETCONTAINSALLCOLLECTIONS,
            });
        }

        try {
            return this.contractDeployed.isSetContainsAllCollections(params.setIds, params.setCollections);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.SETMANAGER_ISSETCONTAINSALLCOLLECTIONS,
                error,
            });
        }
    }
}