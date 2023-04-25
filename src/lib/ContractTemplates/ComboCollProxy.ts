import { ethers, BigNumber as BN, utils } from 'ethers';
import { Logger, log, ErrorLocation } from '../Logger';
import artifact from './artifacts/ComboCollProxy';
import Escrow from './Escrow';
import UUID from './UUID';
import { isAllValidAddress, addGasPriceToOptions, isAllValidNonNegInteger, isValidPositiveNumber, isValidUUID } from '../utils';
import preparePolygonTransaction from '../ContractTemplates/utils';
import { Chains } from '../Auth/availableChains';

type ContractAddressOptions = {
    contractAddress: string;
};

type MintOptions = {
    combo: string;
    to: string;
    currency: string; // ERC20
    metaHash: string;
    // ingredients: ;
    // itemsToBuy: ;
};

type DismantleOptions = {
    combo: string;
    comboId: number;
    gasPrice?/** Gwei */: string | undefined;
};

type SetMintPriceBatchOptions = {
    combos: Array<string>;
    pricesInEther: Array<string>;
    gasPrice?/** Gwei */: string | undefined;
};

type SetReceiversOptions = {
    combos: Array<string>;
    newReceivers: Array<string>;
    gasPrice?/** Gwei */: string | undefined;
};

type CollectionListOptions = {
    combos: Array<string>;
};

type ComboCollMeta = {
    price: BN;
    creator: string;
    escrow: string;
    escrowIndexer: string;
};

type ApproveOptions = {
    combo: string;
    spender: string;
    tokenAddresses: Array<string>;
    tokenIds: Array<Array<number>>;
    allowances: Array<Array<number>>;
    gasPrice?/** Gwei */: string | undefined;
};

type PageEscrowAllowancesOptions = {
    uuidDeployed: UUID;
    combo: string;
    to: string;
    pageNum: number;
    pageSize: number;
};

type PageEscrowAllowancesResponse = {
    total: BN;
    tokenAddresses: Array<string>;
    tokenIds: Array<BN>;
    allowances: Array<BN>;
};

type EscrowAllowancesOptions = {
    uuidDeployed: UUID;
    combo: string;
    to: string;
    uuids: Array<string | number>;
};

type EscrowAllowance = {
    tokenAddress: string;
    tokenId: BN;
    allowance: BN;
};

export default class ComboCollProxy {
    contractAddress: string;

    private contractDeployed: ethers.Contract;
    private readonly signer;

    private escrowLoaded: Escrow;

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

    private async loadEscrowIfNeeded(combo: string) {
        if (!this.escrowLoaded || await this.escrowLoaded.getComboAddress() != combo) {
            const meta = (await this.comboCollMetasOf({ combos: [combo] }))[0];
            this.escrowLoaded = new Escrow(this.signer);
            this.escrowLoaded.loadContract({ contractAddress: meta.escrow });
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
     * Load an ComboCollProxy contract from an existing contract address. Used by the SDK class
     * @param {object} params object containing all parameters
     * @param {string} params.contractAddress Address of the ComboCollProxy contract to load
     * @returns {ComboCollProxy} Contract
     */
    loadContract(params: ContractAddressOptions): ComboCollProxy {
        if (this.contractAddress || this.contractDeployed) {
            log.throwArgumentError(
                Logger.message.contract_already_loaded,
                'contractAddress',
                this.contractAddress,
                {
                    location: Logger.location.COMBOCOLLPROXY_LOADCONTRACT,
                },
            );
        }

        if (!isAllValidAddress(params.contractAddress)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.COMBOCOLLPROXY_LOADCONTRACT,
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
                location: Logger.location.COMBOCOLLPROXY_LOADCONTRACT,
                error,
            });
        }
    }

    /**
     * 
     * @todo TODO: metaHash is unknown
     */
    async mint(params: MintOptions): Promise<ethers.providers.TransactionResponse> {
        return null as unknown as Promise<ethers.providers.TransactionResponse>;
    }

    /**
     * 
     * @todo TODO: metaHash is unknown
     */
    async edit(params: MintOptions): Promise<ethers.providers.TransactionResponse> {
        return null as unknown as Promise<ethers.providers.TransactionResponse>;
    }

    /**
     * Dismantles a combo
     * @param {object} params object containing all parameters
     * @param {string} params.combo address of combo collection
     * @param {number} params.comboId combo
     * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
     */
    async dismantle(params: DismantleOptions): Promise<ethers.providers.TransactionResponse> {
        this.assertContractLoaded(Logger.location.COMBOCOLLPROXY_DISMANTLE);

        if (!isAllValidAddress(params.combo)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.COMBOCOLLPROXY_DISMANTLE,
            });
        }

        if (!isAllValidNonNegInteger(params.comboId)) {
            log.throwMissingArgumentError(Logger.message.invalid_token_address, {
                location: Logger.location.COMBOCOLLPROXY_DISMANTLE,
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
            else options = addGasPriceToOptions({}, params.gasPrice, Logger.location.COMBOCOLLPROXY_ADDGASPRICETOOPTIONS);

            return this.contractDeployed.dismantle(params.combo, params.comboId, options);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COMBOCOLLPROXY_SETMINTPRICEBATCH,
                error,
            });
        }
    }

    /**
     * Sets the price (in Ether) of the mint
     * @param {object} params object containing all parameters
     * @param {Array<string>} params.combos address of combo collection
     * @param {Array<string>} params.prices corresponding to combo
     * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
     */
    async setMintPriceBatch(params: SetMintPriceBatchOptions): Promise<ethers.providers.TransactionResponse> {
        this.assertContractLoaded(Logger.location.COMBOCOLLPROXY_SETMINTPRICEBATCH);
        this.assertArrayLengthEqual(params.combos, params.pricesInEther, Logger.location.COMBOCOLLPROXY_SETMINTPRICEBATCH);

        if (!isAllValidAddress(params.combos)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.COMBOCOLLPROXY_SETMINTPRICEBATCH,
            });
        }

        try {
            const priceInWeis = params.pricesInEther.map(price => utils.parseEther(price));

            const chainId = await this.contractDeployed.signer.getChainId();
            let options;
            // If Polygon mainnet, set up options propperly to avoid underpriced transaction error
            if (chainId === Chains.polygon)
                options = await preparePolygonTransaction(
                    await this.contractDeployed.signer.getTransactionCount(),
                );
            else options = addGasPriceToOptions({}, params.gasPrice, Logger.location.COMBOCOLLPROXY_ADDGASPRICETOOPTIONS);

            return this.contractDeployed.setMintPriceBatch(params.combos, priceInWeis, options);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COMBOCOLLPROXY_SETMINTPRICEBATCH,
                error,
            });
        }
    }

    /**
     * Sets new receiver address of earnings of the specified collection, only
     * creator of the collection is allowed
     * @param {object} params object containing all parameters
     * @param {Array<string>} params.combos addresses of combo collection
     * @param {Array<string>} params.newReceivers new receiver address corresponding to combo
     * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
     */
    async setReceivers(params: SetReceiversOptions): Promise<ethers.providers.TransactionResponse> {
        this.assertContractLoaded(Logger.location.COMBOCOLLPROXY_SETRECEIVERS);
        this.assertArrayLengthEqual(params.combos, params.newReceivers, Logger.location.COMBOCOLLPROXY_SETRECEIVERS);

        if (!isAllValidAddress(params.combos)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.COMBOCOLLPROXY_SETRECEIVERS,
            });
        }

        if (!isAllValidAddress(params.newReceivers)) {
            log.throwMissingArgumentError(Logger.message.invalid_receiver_address, {
                location: Logger.location.COMBOCOLLPROXY_SETRECEIVERS,
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
            else options = addGasPriceToOptions({}, params.gasPrice, Logger.location.COMBOCOLLPROXY_ADDGASPRICETOOPTIONS);

            return this.contractDeployed.setReceivers(params.combos, params.newReceivers, options);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COMBOCOLLPROXY_SETRECEIVERS,
                error,
            });
        }
    }

    /**
     * Approves someone else to mint combo without owning NFT
     * @param {object} params object containing all parameters
     * @param {string} params.combo combo collection where to use this approval
     * @param {string} params.spender who is this approval for
     * @param {Array<string>} params.tokenAddresses collection address
     * @param {Array<Array<number>>} params.tokenIds token of corresponding collection
     * @param {Array<Array<number>>} params.allowances
     * @returns {Promise<ethers.providers.TransactionResponse>} List of boolean
     */
    async approve(params: ApproveOptions): Promise<ethers.providers.TransactionResponse> {
        this.assertContractLoaded(Logger.location.COMBOCOLLPROXY_APPROVE);
        this.assertArrayLengthEqual(params.tokenAddresses, params.tokenIds, Logger.location.COMBOCOLLPROXY_APPROVE);
        this.assertArrayLengthEqual(params.tokenAddresses, params.allowances, Logger.location.COMBOCOLLPROXY_APPROVE);

        if (!isAllValidAddress(params.combo)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.COMBOCOLLPROXY_APPROVE,
            });
        }

        if (!isAllValidAddress(params.spender)) {
            log.throwMissingArgumentError(Logger.message.invalid_to_address, {
                location: Logger.location.COMBOCOLLPROXY_APPROVE,
            });
        }

        if (!isAllValidAddress(params.tokenAddresses)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.COMBOCOLLPROXY_APPROVE,
            });
        }

        if (!isAllValidNonNegInteger(params.tokenIds)) {
            log.throwMissingArgumentError(Logger.message.no_tokenId_or_not_valid, {
                location: Logger.location.COMBOCOLLPROXY_APPROVE,
            });
        }

        if (!isAllValidNonNegInteger(params.allowances)) {
            log.throwMissingArgumentError(Logger.message.amount_must_be_integer, {
                location: Logger.location.COMBOCOLLPROXY_APPROVE,
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
            else options = addGasPriceToOptions({}, params.gasPrice, Logger.location.COMBOCOLLPROXY_ADDGASPRICETOOPTIONS);

            return this.contractDeployed.approve(
                params.combo,
                params.spender,
                params.tokenAddresses,
                params.tokenIds,
                params.allowances,
                options,
            );
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COMBOCOLLPROXY_APPROVE,
                error,
            });
        }
    }

    /**
     * Checks if a combo collection exists in ComboCollProxy
     * @param {object} params object containing all parameters
     * @param {Array<string>} params.collections collection addresses
     * @returns {Promise<Array<boolean>>} List of boolean
     */
    async exist(params: CollectionListOptions): Promise<Array<boolean>> {
        this.assertContractLoaded(Logger.location.COMBOCOLLPROXY_EXIST);

        params.combos.forEach(combo => {
            if (!combo || !ethers.utils.isAddress(combo)) {
                log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                    location: Logger.location.COMBOCOLLPROXY_EXIST,
                });
            }
        });

        try {
            return this.contractDeployed.exist(params.combos);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COMBOCOLLPROXY_EXIST,
                error,
            });
        }
    }

    /**
     * Returns meta info about combo collection
     * @param {object} params object containing all parameters
     * @param {Array<string>} params.collections collection addresses
     * @returns {Promise<Array<ComboCollMeta>>}
     */
    async comboCollMetasOf(params: CollectionListOptions): Promise<Array<ComboCollMeta>> {
        this.assertContractLoaded(Logger.location.COMBOCOLLPROXY_COMBOCOLLMETASOF);

        params.combos.forEach(combo => {
            if (!combo || !ethers.utils.isAddress(combo)) {
                log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                    location: Logger.location.COMBOCOLLPROXY_COMBOCOLLMETASOF,
                });
            }
        });

        try {
            return this.contractDeployed.comboCollMetasOf(params.combos);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COMBOCOLLPROXY_COMBOCOLLMETASOF,
                error,
            });
        }
    }

    /**
     * Returns approvals from NFT holders on specified combo collection by page
     * @param {object} params object containing all parameters
     * @param {string} params.combo - combo collection
     * @param {string} params.to - address of the spender who gets approved
     * @param {number} params.pageNum - page number to query, start from 1
     * @param {number} params.pageSize - page size
     * @returns {Promise<PageEscrowAllowancesResponse>}
     */
    async pageEscrowAllowances(params: PageEscrowAllowancesOptions): Promise<PageEscrowAllowancesResponse> {
        this.assertContractLoaded(Logger.location.COMBOCOLLPROXY_PAGEESCROWALLOWANCES);

        if (!isAllValidAddress(params.combo)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.COMBOCOLLPROXY_PAGEESCROWALLOWANCES,
            });
        }

        if (!isAllValidAddress(params.to)) {
            log.throwMissingArgumentError(Logger.message.invalid_to_address, {
                location: Logger.location.COMBOCOLLPROXY_PAGEESCROWALLOWANCES,
            });
        }

        if (!isValidPositiveNumber(params.pageNum) || !isValidPositiveNumber(params.pageSize)) {
            log.throwMissingArgumentError(Logger.message.invalid_page_param, {
                location: Logger.location.COMBOCOLLPROXY_PAGEESCROWALLOWANCES,
            });
        }

        try {
            await this.loadEscrowIfNeeded(params.combo);

            const authorities = await this.escrowLoaded.pageAllowances({
                to: params.to,
                pageNum: params.pageNum,
                pageSize: params.pageSize,
            });

            const ret = {
                total: authorities.total,
                allowances: authorities.allowances,
                tokenAddresses: new Array<string>(),
                tokenIds: new Array<BN>(),
            };

            const tokens = await params.uuidDeployed.tokensOf({ uuids: authorities.uuids.map(uuid => uuid.toString()) });
            tokens.forEach(token => {
                ret.tokenAddresses.push(token.tokenAddress);
                ret.tokenIds.push(token.tokenId);
            });

            return ret;
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COMBOCOLLPROXY_PAGEESCROWALLOWANCES,
                error,
            });
        }
    }

    /**
     * Returns approvals from NFT holders on specified combo collection by page
     * @param {object} params object containing all parameters
     * @param {string} params.combo - combo collection
     * @param {string} params.to - address of the spender who gets approved
     * @param {Array<string|number>} params.uuids - uuid of token to query
     * @returns {Promise<Array<EscrowAllowance>>}
     */
    async escrowAllowances(params: EscrowAllowancesOptions): Promise<Array<EscrowAllowance>> {
        this.assertContractLoaded(Logger.location.COMBOCOLLPROXY_ESCROWALLOWANCES);

        if (!isAllValidAddress(params.combo)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.COMBOCOLLPROXY_ESCROWALLOWANCES,
            });
        }

        if (!isAllValidAddress(params.to)) {
            log.throwMissingArgumentError(Logger.message.invalid_to_address, {
                location: Logger.location.COMBOCOLLPROXY_ESCROWALLOWANCES,
            });
        }

        params.uuids.forEach(uuid => {
            if (!isValidUUID(uuid)) {
                log.throwMissingArgumentError(Logger.message.no_uuid_or_not_valid, {
                    location: Logger.location.COMBOCOLLPROXY_ESCROWALLOWANCES,
                });
            }
        });

        try {
            await this.loadEscrowIfNeeded(params.combo);

            const allowances = await this.escrowLoaded.allowances({
                to: params.to,
                uuids: params.uuids,
            });

            const ret: Array<EscrowAllowance> = new Array();
            const tokens = await params.uuidDeployed.tokensOf({ uuids: params.uuids });
            tokens.forEach((token, index) => {
                ret.push({
                    tokenAddress: token.tokenAddress,
                    tokenId: token.tokenId,
                    allowance: allowances[index],
                });
            });

            return ret;
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COMBOCOLLPROXY_ESCROWALLOWANCES,
                error,
            });
        }
    }
}