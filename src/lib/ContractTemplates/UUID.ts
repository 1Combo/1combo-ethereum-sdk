import { ethers, BigNumber as BN } from 'ethers';
import { MAX_UINT128 } from '../constants';
import { Logger, log, ErrorLocation } from '../Logger';
import artifact from './artifacts/UUID';
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

type GetOrGenerateUUIDOptions = {
    tokenAddresses: Array<string>;
    tokenIds: Array<Array<number | string>>;
    gasPrice?/** Gwei */: string;
};

type GetUUIDBatchOptions = {
    tokenAddresses: Array<string>;
    tokenIds: Array<Array<number | string>>;
};

type GetUUIDOptions = {
    tokenAddress: string;
    tokenId: number | string;
};

type Token = {
    tokenAddress: string;
    tokenId: BN;
};

type TokenOfOptions = {
    uuid: number | string;
};

type TokensOfOptions = {
    uuids: Array<number | string>;
};

export default class UUID {
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
     * Load an UUID contract from an existing contract address. Used by the SDK class
     * @param {object} params object containing all parameters
     * @param {string} params.contractAddress Address of the UUID contract to load
     * @returns {UUID} Contract
     */
    loadContract(params: ContractAddressOptions): UUID {
        if (this.contractAddress || this.contractDeployed) {
            log.throwArgumentError(
                Logger.message.contract_already_loaded,
                'contractAddress',
                this.contractAddress,
                {
                    location: Logger.location.UUID_LOADCONTRACT,
                },
            );
        }

        if (!isAllValidAddress(params.contractAddress)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.UUID_LOADCONTRACT,
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
                location: Logger.location.UUID_LOADCONTRACT,
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
        this.assertContractLoaded(Logger.location.UUID_REGISTERCOLLECTIONS);

        if (!isAllValidAddress(params.collections)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.UUID_REGISTERCOLLECTIONS,
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
            else options = addGasPriceToOptions({}, params.gasPrice, Logger.location.UUID_REGISTERCOLLECTIONS);

            return this.contractDeployed.registerCollections(params.collections, options);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.UUID_REGISTERCOLLECTIONS,
                error,
            });
        }
    }

    /**
     * Returns the uuid of a token on 1Combo, registering collection if absent.
     * @param {object} params object containing all parameters
     * @param {Array<string>} params.tokenAddresses collection addresses
     * @param {Array<Array<number>>} params.tokenIds tokens of the corresponding collection
     * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
     */
    async getOrGenerateUUID(params: GetOrGenerateUUIDOptions): Promise<ethers.providers.TransactionResponse> {
        this.assertContractLoaded(Logger.location.UUID_GETORGENERATEUUID);

        if (!isAllValidAddress(params.tokenAddresses)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.UUID_GETORGENERATEUUID,
            });
        }

        if (!isAllValidNonNegInteger(params.tokenIds)) {
            log.throwMissingArgumentError(Logger.message.no_tokenId_or_not_valid, {
                location: Logger.location.UUID_GETORGENERATEUUID,
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
            else options = addGasPriceToOptions({}, params.gasPrice, Logger.location.UUID_GETORGENERATEUUID);

            return this.contractDeployed.getOrGenerateUUID(params.tokenAddresses, params.tokenIds, options);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.UUID_GETORGENERATEUUID,
                error,
            });
        }
    }

    /**
     * Returns the uuids of tokens on 1Combo, throws error if specified token does not exist
     * @param {object} params object containing all parameters
     * @param {Array<string>} params.collections collection addresses
     * @param {Array<Array<number>>} params.tokenIds tokens of the corresponding collection
     * @returns {Promise<Array<Array<BN>>>} List of uuid of the specified tokens
     */
    async getUUIDBatch(params: GetUUIDBatchOptions): Promise<Array<Array<BN>>> {
        this.assertContractLoaded(Logger.location.UUID_GETUUIDBATCH);
        this.assertArrayLengthEqual(params.tokenAddresses, params.tokenIds, Logger.location.UUID_GETUUIDBATCH);

        if (!isAllValidAddress(params.tokenAddresses)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.UUID_GETUUIDBATCH,
            });
        }

        if (!isAllValidNonNegInteger(params.tokenIds)) {
            log.throwMissingArgumentError(Logger.message.no_tokenId_or_not_valid, {
                location: Logger.location.UUID_GETUUIDBATCH,
            });
        }

        try {
            return this.contractDeployed.getUUIDBatch(params.tokenAddresses, params.tokenIds);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.UUID_GETUUIDBATCH,
                error,
            });
        }
    }

    /**
     * Returns the uuid of a token on 1Combo, throws error if specified token does not exist
     * @param {object} params object containing all parameters
     * @param {string} params.tokenAddress collection addresses
     * @param {number} params.tokenId token id
     * @returns {Promise<BN>} uuid
     */
    async getUUID(params: GetUUIDOptions): Promise<BN> {
        this.assertContractLoaded(Logger.location.UUID_GETUUID);

        if (!isAllValidAddress(params.tokenAddress)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.UUID_GETUUID,
            });
        }

        if (!isAllValidNonNegInteger(params.tokenId)) {
            log.throwMissingArgumentError(Logger.message.no_tokenId_or_not_valid, {
                location: Logger.location.UUID_GETUUID,
            });
        }

        try {
            return this.contractDeployed.getUUID(params.tokenAddress, params.tokenId);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.UUID_GETUUID,
                error,
            });
        }
    }

    /**
     * Returns token address and token id that correspond to the specified uuid, zero address and
     * id will be returned if not found
     * @param {object} params object containing all parameters
     * @param {number | string} params.uuid uuid to query
     * @returns {Promise<Token>} token
     */
    async tokenOf(params: TokenOfOptions): Promise<Token> {
        this.assertContractLoaded(Logger.location.UUID_TOKENOF);

        const uuid = BN.from(params.uuid);
        if (uuid.isNegative() || uuid.gt(MAX_UINT128)) {
            log.throwMissingArgumentError(Logger.message.no_uuid_or_not_valid, {
                location: Logger.location.UUID_TOKENOF,
            });
        }

        try {
            return this.contractDeployed.tokenOf(uuid);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.UUID_TOKENOF,
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
        this.assertContractLoaded(Logger.location.UUID_TOKENSOF);

        const uuids = params.uuids.map(v => {
            const uuid = BN.from(v);
            if (uuid.isNegative() || uuid.gt(MAX_UINT128)) {
                log.throwMissingArgumentError(Logger.message.no_uuid_or_not_valid, {
                    location: Logger.location.UUID_TOKENSOF,
                });
            }
            return uuid;
        });

        try {
            return this.contractDeployed.tokensOf(uuids);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.UUID_TOKENSOF,
                error,
            });
        }
    }

}