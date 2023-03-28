import { ethers, BigNumber as BN } from 'ethers';
import { Logger, log, ErrorLocation } from '../Logger';
import artifact from './artifacts/CollectionFactory';
import { isAllValidAddress, isValidPositiveNumber } from '../utils';

type ContractAddressOptions = {
    contractAddress: string;
};

type InitialItem = {
    price: string;
    metaHash: string;
    maxSupply: number;
};

type DeployCollectionOptions = {
    name: string;
    symbol: string;
    contractURI: string;
    initialItems: Array<InitialItem>;
    gasPrice?/** Gwei */: string;
};

type GetCollectionsOptions = {
    pageNum: number;
    pageSize: number;
};

type GetCollectionsByCreatorOptions = {
    creator: string;
    pageNum: number;
    pageSize: number;
};

type GetCollectionsReturn = {
    total: BN;
    collections: Array<string>;
};

export default class CollectionFactory {
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

    /**
     * Load an CollectionFactory contract from an existing contract address. Used by the SDK class
     * @param {object} params object containing all parameters
     * @param {string} params.contractAddress Address of the CollectionFactory contract to load
     * @returns {CollectionFactory} Contract
     */
    loadContract(params: ContractAddressOptions): CollectionFactory {
        if (this.contractAddress || this.contractDeployed) {
            log.throwArgumentError(
                Logger.message.contract_already_loaded,
                'contractAddress',
                this.contractAddress,
                {
                    location: Logger.location.COLLECTIONFACTORY_LOADCONTRACT,
                },
            );
        }

        if (!isAllValidAddress(params.contractAddress)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.COLLECTIONFACTORY_LOADCONTRACT,
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
                location: Logger.location.COLLECTIONFACTORY_LOADCONTRACT,
                error,
            });
        }
    }

    /**
     * @todo TODO: contractURI is unknown
     */
    async deploy(params: DeployCollectionOptions): Promise<ethers.providers.TransactionResponse> {
        return null as unknown as Promise<ethers.providers.TransactionResponse>;
    }

    /**
     * Returns total number of collections
     * @returns {Promise<BigNumber>} Total number
     */
    async totalCollection(): Promise<BN> {
        this.assertContractLoaded(Logger.location.COLLECTIONFACTORY_TOTALCOLLECTION);

        try {
            return this.contractDeployed.totalCollection();
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COLLECTIONFACTORY_TOTALCOLLECTION,
                error,
            });
        }
    }

    /**
     * Querys deployed collections by page
     * @param {object} params object containing all parameters
     * @param {number} params.pageNum - page number to query, start from 1
     * @param {number} params.pageSize - page size, must be greater than 0
     * @returns {Promise<GetCollectionsReturn>} Total number of collections and 
     * collection addresses for current page
     */
    async getCollections(params: GetCollectionsOptions): Promise<GetCollectionsReturn> {
        this.assertContractLoaded(Logger.location.COLLECTIONFACTORY_GETCOLLECTIONS);

        if (!isValidPositiveNumber(params.pageNum) || !isValidPositiveNumber(params.pageSize)) {
            log.throwMissingArgumentError(Logger.message.invalid_page_param, {
                location: Logger.location.COLLECTIONFACTORY_GETCOLLECTIONS,
            });
        }

        try {
            return (async () => {
                const result = (await this.contractDeployed.getCollections(params.pageNum, params.pageSize)) as Array<any>;
                return {
                    total: result[0],
                    collections: result[1]
                } as GetCollectionsReturn;
            })();
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COLLECTIONFACTORY_GETCOLLECTIONS,
                error,
            });
        }
    }

    /**
     * Querys collections deployed by specified user by page
     * @param {object} params object containing all parameters
     * @param {string} params.creator - address of deployer to query
     * @param {number} params.pageNum - page number to query, start from 1
     * @param {number} params.pageSize - page size, must be greater than 0
     * @returns {Promise<GetCollectionsReturn>} Total number of collections and 
     * collection addresses for current page
     */
    async getCollectionsByCreator(params: GetCollectionsByCreatorOptions): Promise<GetCollectionsReturn> {
        this.assertContractLoaded(Logger.location.COLLECTIONFACTORY_GETCOLLECTIONSBYCREATOR);

        if (!isAllValidAddress(params.creator)) {
            log.throwMissingArgumentError(Logger.message.invalid_account_address, {
                location: Logger.location.COLLECTIONFACTORY_GETCOLLECTIONSBYCREATOR,
            });
        }

        if (!isValidPositiveNumber(params.pageNum) || !isValidPositiveNumber(params.pageSize)) {
            log.throwMissingArgumentError(Logger.message.invalid_page_param, {
                location: Logger.location.COLLECTIONFACTORY_GETCOLLECTIONSBYCREATOR,
            });
        }

        try {
            return (async () => {
                const result = (await this.contractDeployed.getCollectionsByCreator(params.creator, params.pageNum, params.pageSize)) as Array<any>;
                return {
                    total: result[0],
                    collections: result[1]
                } as GetCollectionsReturn;
            })();
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COLLECTIONFACTORY_GETCOLLECTIONSBYCREATOR,
                error,
            });
        }
    }
}