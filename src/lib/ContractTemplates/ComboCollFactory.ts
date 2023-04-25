import { ethers, BigNumber as BN } from 'ethers';
import { Logger, log, ErrorLocation } from '../Logger';
import artifact from './artifacts/ComboCollFactory';
import { isAllValidAddress, isValidPositiveNumber } from '../utils';

type ContractAddressOptions = {
    contractAddress: string;
};

type Rule = {
    max: number;
    min: number;
    limit: number;
    setId: number;
    lock: boolean;
    collection: string;
}

type CreateComboOptions = {
    name: string;
    symbol: string;
    contractURI: string;
    mintFee: string;
    rules: Array<Rule>;
};

type GetCollectionsOptions = {
    creator: string;
    pageNum: number;
    pageSize: number;
};

type GetCollectionsResponse = {
    total: BN;
    collections: Array<string>;
};

export default class ComboCollFactory {
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
     * Load an ComboCollFactory contract from an existing contract address. Used by the SDK class
     * @param {object} params object containing all parameters
     * @param {string} params.contractAddress Address of the ComboCollFactory contract to load
     * @returns {ComboCollFactory} Contract
     */
    loadContract(params: ContractAddressOptions): ComboCollFactory {
        if (this.contractAddress || this.contractDeployed) {
            log.throwArgumentError(
                Logger.message.contract_already_loaded,
                'contractAddress',
                this.contractAddress,
                {
                    location: Logger.location.COMBOCOLLFACTORY_LOADCONTRACT,
                },
            );
        }

        if (!isAllValidAddress(params.contractAddress)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.COMBOCOLLFACTORY_LOADCONTRACT,
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
                location: Logger.location.COMBOCOLLFACTORY_LOADCONTRACT,
                error,
            });
        }
    }

    /**
     * 
     * @todo TODO: contractURI is unknown
     */
    async createCombo(params: CreateComboOptions): Promise<ethers.providers.TransactionResponse> {
        return null as unknown as Promise<ethers.providers.TransactionResponse>;
    }

    /**
     * Returns total number of combo collections
     * @returns {Promise<BigNumber>} Total number
     */
    async totalCollection(): Promise<BN> {
        this.assertContractLoaded(Logger.location.COMBOCOLLFACTORY_TOTALCOLLECTION);

        try {
            return this.contractDeployed.totalCollection();
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COMBOCOLLFACTORY_TOTALCOLLECTION,
                error,
            });
        }
    }

    /**
     * Querys combo collections created by specified user by page
     * @param {object} params object containing all parameters
     * @param {string} params.creator - address of deployer to query, `address(0)` refers to all
     * @param {number} params.pageNum - page number to query, start from 1
     * @param {number} params.pageSize - page size, must be greater than 0
     * @returns {Promise<GetCollectionsResponse>}
     */
    async getCollections(params: GetCollectionsOptions): Promise<GetCollectionsResponse> {
        this.assertContractLoaded(Logger.location.COMBOCOLLFACTORY_GETCOLLECTIONS);

        if (!isAllValidAddress(params.creator)) {
            log.throwMissingArgumentError(Logger.message.invalid_account_address, {
                location: Logger.location.COMBOCOLLFACTORY_GETCOLLECTIONS,
            });
        }

        if (!isValidPositiveNumber(params.pageNum) || !isValidPositiveNumber(params.pageSize)) {
            log.throwMissingArgumentError(Logger.message.invalid_page_param, {
                location: Logger.location.COMBOCOLLFACTORY_GETCOLLECTIONS,
            });
        }

        try {
            const result = (await this.contractDeployed.getCollections(params.creator, params.pageNum, params.pageSize)) as Array<any>;
            return {
                total: result[0],
                collections: result[1]
            };
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COMBOCOLLFACTORY_GETCOLLECTIONS,
                error,
            });
        }
    }
}