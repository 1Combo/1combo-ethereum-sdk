import { BigNumber, ethers } from 'ethers';
import { Logger, log, ErrorLocation } from '../Logger';
import artifact from './artifacts/Escrow';
import { isAllValidAddress, isValidPositiveNumber, isValidUUID } from '../utils';

type ContractAddressOptions = {
    contractAddress: string;
};

type PageAllowancesOptions = {
    to: string;
    pageNum: number;
    pageSize: number;
};

type PageAllowancesResponse = {
    total: BigNumber;
    uuids: Array<BigNumber>;
    allowances: Array<BigNumber>;
};

type AllowancesOptions = {
    to: string;
    uuids: Array<number | string>;
};

export default class Escrow {
    private combo: string;
    contractAddress: string;

    private contractDeployed: ethers.Contract;
    private readonly signer;

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

    constructor(signer: ethers.Wallet | ethers.providers.JsonRpcSigner) {
        this.signer = signer;
    }
    /**
     * Load an Escrow contract from an existing contract address. Used by the ComboCollProxy
     * @param {object} params object containing all parameters
     * @param {string} params.contractAddress Address of the Escrow contract to load
     */
    loadContract(params: ContractAddressOptions) {
        if (this.contractAddress || this.contractDeployed) {
            log.throwArgumentError(
                Logger.message.contract_already_loaded,
                'contractAddress',
                this.contractAddress,
                {
                    location: Logger.location.ESCROW_LOADCONTRACT,
                },
            );
        }

        if (!isAllValidAddress(params.contractAddress)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.ESCROW_LOADCONTRACT,
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
                location: Logger.location.ESCROW_LOADCONTRACT,
                error,
            });
        }
    }

    /**
     * Returns address of combo collection that is associated with this escrow.
     * @returns {Promise<string>}
     */
    async getComboAddress(): Promise<string> {
        this.assertContractLoaded(Logger.location.ESCROW_GETCOMBOADDRESS);

        try {
            if (!isAllValidAddress(this.combo)) {
                this.combo = await this.contractDeployed.combo();
            }
            return this.combo;
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.ESCROW_GETCOMBOADDRESS,
                error,
            });
        }
    }

    /**
     * Returns approvals from NFT holders by page
     * @param {object} params object containing all parameters
     * @param {string} params.to - address of the spender who gets approved
     * @param {number} params.pageNum - page number to query, start from 1
     * @param {number} params.pageSize - page size
     * @returns {Promise<PageAllowancesResponse>}
     */
    async pageAllowances(params: PageAllowancesOptions): Promise<PageAllowancesResponse> {
        this.assertContractLoaded(Logger.location.ESCROW_PAGEALLOWANCES);

        if (!params.to || !ethers.utils.isAddress(params.to)) {
            log.throwMissingArgumentError(Logger.message.invalid_to_address, {
                location: Logger.location.ESCROW_PAGEALLOWANCES,
            });
        }

        if (!isValidPositiveNumber(params.pageNum) || !isValidPositiveNumber(params.pageSize)) {
            log.throwMissingArgumentError(Logger.message.invalid_page_param, {
                location: Logger.location.ESCROW_PAGEALLOWANCES,
            });
        }

        try {
            const result = (await this.contractDeployed.pageAllowances(params.to, params.pageNum, params.pageSize)) as Array<any>;
            return {
                total: result[0],
                uuids: result[1],
                allowances: result[2],
            }
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.ESCROW_PAGEALLOWANCES,
                error,
            });
        }
    }

    /**
     * Returns approvals to `to`
     * @param {object} params object containing all parameters
     * @param {string} params.to - address of the spender who gets approved
     * @param {Array<string|number>} params.uuids - uuid of token that has been approved to `to`
     * @returns {Promise<Array<BigNumber>>}
     */
    async allowances(params: AllowancesOptions): Promise<Array<BigNumber>> {
        this.assertContractLoaded(Logger.location.ESCROW_ALLOWANCES);

        if (!params.to || !ethers.utils.isAddress(params.to)) {
            log.throwMissingArgumentError(Logger.message.invalid_to_address, {
                location: Logger.location.ESCROW_ALLOWANCES,
            });
        }

        params.uuids.forEach(uuid => {
            if (!isValidUUID(uuid)) {
                log.throwMissingArgumentError(Logger.message.no_uuid_or_not_valid, {
                    location: Logger.location.ESCROW_ALLOWANCES,
                });
            }
        });

        try {
            return this.contractDeployed.allowances(params.to, params.uuids);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.ESCROW_ALLOWANCES,
                error,
            });
        }
    }
}