import { ethers, BigNumber as BN } from 'ethers';
import { MAX_UINT128 } from '../constants';
import { Logger, log, ErrorLocation } from '../Logger';
import artifact from './artifacts/Indexer';
import { addGasPriceToOptions, isAllValidAddress, isAllValidNonNegInteger } from '../utils';
import preparePolygonTransaction from './utils';
import { Chains } from '../Auth/availableChains';

type ContractAddressOptions = {
    contractAddress: string;
};

type CollectionListOptions = {
    collections: Array<string>;
    gasPrice?/** Gwei */: string;
};

type GetUUIDOptions = {
    mustExist: boolean;
    tokenAddresses: Array<string>;
    tokenIds: Array<Array<number | string>>;
};

type RootComboOfTokensOptions = {
    tokenAddresses: Array<string>;
    tokenIds: Array<Array<number | string>>;
};

type RootComboOfUUIDsOptions = {
    uuids: Array<number | string>;
};

type Token = {
    tokenAddress: string;
    tokenId: BN;
};

type TokensOfOptions = {
    uuids: Array<number | string>;
};

export default class Indexer {
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
   * Load an Indexer contract from an existing contract address. Used by the SDK class
   * @param {object} params object containing all parameters
   * @param {string} params.contractAddress Address of the Indexer contract to load
   * @returns {Indexer} Contract
   */
    loadContract(params: ContractAddressOptions): Indexer {
        if (this.contractAddress || this.contractDeployed) {
            log.throwArgumentError(
                Logger.message.contract_already_loaded,
                'contractAddress',
                this.contractAddress,
                {
                    location: Logger.location.INDEXER_LOADCONTRACT,
                },
            );
        }

        if (!isAllValidAddress(params.contractAddress)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.INDEXER_LOADCONTRACT,
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
                location: Logger.location.INDEXER_LOADCONTRACT,
                error,
            });
        }
    }

    /**
     * Registers new collections to 1Combo to initialize uuid generator
     * @param {object} params object containing all parameters
     * @param {Array<string>} params.collections collection addresses
     * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
     */
    async registerCollections(params: CollectionListOptions): Promise<ethers.providers.TransactionResponse> {
        this.assertContractLoaded(Logger.location.INDEXER_REGISTERCOLLECTIONS);

        if (!isAllValidAddress(params.collections)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.INDEXER_REGISTERCOLLECTIONS,
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
            else options = addGasPriceToOptions({ }, params.gasPrice, Logger.location.INDEXER_REGISTERCOLLECTIONS);

            return this.contractDeployed.registerCollections(params.collections, options);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.INDEXER_REGISTERCOLLECTIONS,
                error,
            });
        }
    }

    /**
     * Returns the uuid of a token on 1Combo
     * @param {object} params object containing all parameters
     * @param {bool} params.mustExist throw error if specified token does not exist when mustExist = true
     * @param {Array<string>} params.collections collection addresses
     * @param {Array<Array<number>>} params.tokenIds tokens of the corresponding collection
     * @returns {Promise<Array<Array<BN>>>} List of uuid of the specified tokens
     */
    async getUUID(params: GetUUIDOptions): Promise<Array<Array<BN>>> {
        this.assertContractLoaded(Logger.location.INDEXER_GETUUID);
        this.assertArrayLengthEqual(params.tokenAddresses, params.tokenIds, Logger.location.INDEXER_GETUUID);

        if (!isAllValidAddress(params.tokenAddresses)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.INDEXER_GETUUID,
            });
        }

        if (!isAllValidNonNegInteger(params.tokenIds)) {
            log.throwMissingArgumentError(Logger.message.no_tokenId_or_not_valid, {
                location: Logger.location.INDEXER_GETUUID,
            });
        }

        try {
            return this.contractDeployed.getUUID(params.tokenAddresses, params.tokenIds, params.mustExist);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.INDEXER_GETUUID,
                error,
            });
        }
    }

    /**
     * Returns the root combo token to which an ERC721 token belongs to, zero address and
     * id will be returned if not found
     * @param {object} params object containing all parameters
     * @param {Array<string>} params.collections collection addresses, must be an ERC721 contract
     * @param {Array<Array<number>>} params.tokenIds tokens of the corresponding collection
     * @returns {Promise<Array<Array<Token>>>} List of root combo token
     */
    async rootComboOfTokens(params: RootComboOfTokensOptions): Promise<Array<Array<Token>>> {
        this.assertContractLoaded(Logger.location.INDEXER_ROOTCOMBOOFTOKENS);
        this.assertArrayLengthEqual(params.tokenAddresses, params.tokenIds, Logger.location.INDEXER_ROOTCOMBOOFTOKENS);

        if (!isAllValidAddress(params.tokenAddresses)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.INDEXER_ROOTCOMBOOFTOKENS,
            });
        }

        if (!isAllValidNonNegInteger(params.tokenIds)) {
            log.throwMissingArgumentError(Logger.message.no_tokenId_or_not_valid, {
                location: Logger.location.INDEXER_ROOTCOMBOOFTOKENS,
            });
        }

        try {
            return this.contractDeployed['rootCombosOf(address[],uint256[][])'](params.tokenAddresses, params.tokenIds);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.INDEXER_ROOTCOMBOOFTOKENS,
                error,
            });
        }
    }

    /**
     * Returns the root combo token to which a uuid belongs to, zero address and
     * id will be returned if not found
     * @param {object} params object containing all parameters
     * @param {number | string} params.uuids uuids to query
     * @returns {Promise<Array<Token>>} List of root combo token
     */
    async rootComboOfUUIDs(params: RootComboOfUUIDsOptions): Promise<Array<Token>> {
        this.assertContractLoaded(Logger.location.INDEXER_ROOTCOMBOOFUUIDS);

        const uuids = params.uuids.map(v => {
            const uuid = BN.from(v);
            if (uuid.isNegative() || uuid.gt(MAX_UINT128)) {
                log.throwMissingArgumentError(Logger.message.no_uuid_or_not_valid, {
                    location: Logger.location.INDEXER_ROOTCOMBOOFUUIDS,
                });
            }
            return uuid;
        });

        try {
            return this.contractDeployed['rootCombosOf(uint128[])'](uuids);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.INDEXER_ROOTCOMBOOFUUIDS,
                error,
            });
        }
    }

    /**
     * Returns token address and token id that correspond to the specified uuid, zero address and
     * id will be returned if not found
     * @param {object} params object containing all parameters
     * @param {number | string} params.uuids uuids to query
     * @returns {Promise<Array<Token>>} List of token
     */
    async tokensOf(params: TokensOfOptions): Promise<Array<Token>> {
        this.assertContractLoaded(Logger.location.INDEXER_TOKENSOF);

        const uuids = params.uuids.map(v => {
            const uuid = BN.from(v);
            if (uuid.isNegative() || uuid.gt(MAX_UINT128)) {
                log.throwMissingArgumentError(Logger.message.no_uuid_or_not_valid, {
                    location: Logger.location.INDEXER_TOKENSOF,
                });
            }
            return uuid;
        });

        try {
            return this.contractDeployed.tokensOf(uuids);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.INDEXER_TOKENSOF,
                error,
            });
        }
    }

}