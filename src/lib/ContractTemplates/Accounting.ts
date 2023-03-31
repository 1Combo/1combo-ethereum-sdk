import { BigNumber, ethers } from 'ethers';
import { Logger, log, ErrorLocation } from '../Logger';
import artifact from './artifacts/Accounting';
import { isAllValidAddress, isValidPositiveNumber } from '../utils';

type ContractAddressOptions = {
    contractAddress: string;
};

type ReceiversOfOptions = {
    collections: Array<string>;
};

type CollectionsOfOptions = {
    receiver: string;
};

type PageCollectionsOfOptions = {
    receiver: string;
    pageNum: number;
    pageSize: number;
};

type PageCollectionsOfResponse = {
    total: BigNumber;
    collections: Array<string>;
};

export default class Accounting {
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
     * Load an Accounting contract from an existing contract address. Used by the SDK class
     * @param {object} params object containing all parameters
     * @param {string} params.contractAddress Address of the Accounting contract to load
     * @returns {Accounting} Contract
     */
    loadContract(params: ContractAddressOptions): Accounting {
        if (this.contractAddress || this.contractDeployed) {
            log.throwArgumentError(
                Logger.message.contract_already_loaded,
                'contractAddress',
                this.contractAddress,
                {
                    location: Logger.location.ACCOUNTING_LOADCONTRACT,
                },
            );
        }

        if (!isAllValidAddress(params.contractAddress)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.ACCOUNTING_LOADCONTRACT,
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
                location: Logger.location.ACCOUNTING_LOADCONTRACT,
                error,
            });
        }
    }

    /**
     * Returns receiver address of earnings of specified collection
     * @param {object} params object containing all parameters
     * @param {Array<string>} params.collections - collection address
     * @returns {Promise<Array<string>>} List of receiver address
     */
    async receiversOf(params: ReceiversOfOptions): Promise<Array<string>> {
        this.assertContractLoaded(Logger.location.ACCOUNTING_RECEIVERSOF);

        if (!isAllValidAddress(params.collections)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.ACCOUNTING_RECEIVERSOF,
            });
        }

        try {
            return this.contractDeployed.receiversOf(params.collections);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.ACCOUNTING_RECEIVERSOF,
                error,
            });
        }
    }

    /**
     * Returns collections whose receiver is the specified address
     * @param {object} params object containing all parameters
     * @param {string} params.receiver - receiver address to query
     * @returns {Promise<Array<string>>} List of collection address
     */
    async collectionsOf(params: CollectionsOfOptions): Promise<Array<string>> {
        this.assertContractLoaded(Logger.location.ACCOUNTING_COLLECTIONSOF);

        if (!isAllValidAddress(params.receiver)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.ACCOUNTING_COLLECTIONSOF,
            });
        }

        try {
            return this.contractDeployed.collectionsOf(params.receiver);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.ACCOUNTING_COLLECTIONSOF,
                error,
            });
        }
    }

    /**
     * Returns collections whose receiver is the specified address by page
     * @param {object} params object containing all parameters
     * @param {string} params.receiver - receiver address to query
     * @param {number} params.pageNum - page number to query, start from 1
     * @param {number} params.pageSize - page size
     * @returns {Promise<PageCollectionsOfResponse>} List of collection address
     */
    async pageCollectionsOf(params: PageCollectionsOfOptions): Promise<PageCollectionsOfResponse> {
        this.assertContractLoaded(Logger.location.ACCOUNTING_PAGECOLLECTIONSOF);

        if (!isAllValidAddress(params.receiver)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.ACCOUNTING_PAGECOLLECTIONSOF,
            });
        }

        if (!isValidPositiveNumber(params.pageNum) || !isValidPositiveNumber(params.pageSize)) {
            log.throwMissingArgumentError(Logger.message.invalid_page_param, {
                location: Logger.location.ACCOUNTING_PAGECOLLECTIONSOF,
            });
        }

        try {
            const resp = (await this.contractDeployed.pageCollectionsOf(params.receiver, params.pageNum, params.pageSize)) as Array<any>;
            return {
                total: resp[0],
                collections: resp[1],
            };
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.ACCOUNTING_PAGECOLLECTIONSOF,
                error,
            });
        }
    }
}