import { ethers, utils, BigNumber as BN } from 'ethers';
import BaseERC721 from '../ContractComponents/baseERC721';
import { Logger, log, ErrorLocation } from '../Logger';
import artifact from './artifacts/ComboCollCore';
import { isAllValidAddress, isAllValidNonNegInteger, isValidNonNegInteger, isValidSetId, isValidUUID, addGasPriceToOptions } from '../utils';
import preparePolygonTransaction from '../ContractTemplates/utils';
import { Chains } from '../Auth/availableChains';

type ContractAddressOptions = {
    contractAddress: string;
};

type GetIngredientsOptions = {
    comboIds: Array<number>;
};

type GetLimitedTokenUsagesOptions = {
    uuids: Array<number | string>;
    setIds: Array<number>;
};

type RoyaltyInfoOptions = {
    tokenId: number;
    sellPrice: number;
};

type RoyaltyInfo = {
    receiver: string;
    royaltyAmount: BN;
};

type CollectionMeta = {
    creator: string;
    escrow: string;
    price: BN;
};

type SetPriceOptions = {
    price: string;
    gasPrice?/** Gwei */: string | undefined;
};

type Factor = {
    max: BN;
    min: BN;
    limit: BN;
    setId: number;
    lock: boolean;
    collection: string;
}

type GetComboRulesResponse = {
    factors: Array<Factor>;
};

type Item = {
    uuid: BN;
    amount: BN;
    setId: number;
    typ: number;
    lock: boolean;
    limit: boolean;
};

export default class ComboCollCore {
    contractAddress: string;
    baseERC721: BaseERC721;

    private contractDeployed: ethers.Contract;
    private readonly signer;

    constructor(signer: ethers.Wallet | ethers.providers.JsonRpcSigner) {
        this.signer = signer;
        this.baseERC721 = new BaseERC721();
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
     * Load an ComboCollCore contract from an existing contract address. Used by the SDK class
     * @param {object} params object containing all parameters
     * @param {string} params.contractAddress Address of the ComboCollCore contract to load
     * @returns {ComboCollCore} Contract
     */
    loadContract(params: ContractAddressOptions): ComboCollCore {
        if (this.contractAddress || this.contractDeployed) {
            log.throwArgumentError(
                Logger.message.contract_already_loaded,
                'contractAddress',
                this.contractAddress,
                {
                    location: Logger.location.COMBOCOLLCORE_LOADCONTRACT,
                },
            );
        }

        if (!isAllValidAddress(params.contractAddress)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.COMBOCOLLCORE_LOADCONTRACT,
            });
        }

        try {
            this.contractAddress = <string>params.contractAddress;

            this.contractDeployed = new ethers.Contract(
                this.contractAddress,
                artifact.abi,
                this.signer,
            );
            this.baseERC721.setContract(this.contractDeployed);
            return this;
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COMBOCOLLCORE_LOADCONTRACT,
                error,
            });
        }
    }

    /**
     * Returns combination rules of this combo collection
     * @returns {Promise<GetComboRulesResponse>}
     */
    async getComboRules(): Promise<GetComboRulesResponse> {
        this.assertContractLoaded(Logger.location.COMBOCOLLCORE_GET_COMBO_RULES);

        try {
            return this.contractDeployed.getComboRules();
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COMBOCOLLCORE_GET_COMBO_RULES,
                error,
            });
        }
    }

    /**
     * Returns usage count of token that is limited
     * @returns {Promise<Array<BigNumber>>}
     */
    async getLimitedTokenUsages(params: GetLimitedTokenUsagesOptions): Promise<Array<BN>> {
        this.assertContractLoaded(Logger.location.COMBOCOLLCORE_GET_LIMITED_TOKEN_USAGES);

        params.uuids.forEach(uuid => {
            if (!isValidUUID(uuid)) {
                log.throwMissingArgumentError(Logger.message.no_uuid_or_not_valid, {
                    location: Logger.location.COMBOCOLLCORE_GET_LIMITED_TOKEN_USAGES,
                });
            }
        });

        params.setIds.forEach(setId => {
            if (!isValidSetId(setId)) {
                log.throwMissingArgumentError(Logger.message.no_setId_or_not_valid, {
                    location: Logger.location.COMBOCOLLCORE_GET_LIMITED_TOKEN_USAGES,
                });
            }
        });

        try {
            return this.contractDeployed.getLimitedTokenUsages(params.uuids, params.setIds);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COMBOCOLLCORE_GET_LIMITED_TOKEN_USAGES,
                error,
            });
        }
    }

    /**
     * Returns ingredients of specified combos
     * @returns {Promise<Array<Array<Item>>>}
     */
    async getIngredients(params: GetIngredientsOptions): Promise<Array<Array<Item>>> {
        this.assertContractLoaded(Logger.location.COMBOCOLLCORE_GET_INGREDIENTS);

        if (!isAllValidNonNegInteger(params.comboIds)) {
            log.throwMissingArgumentError(Logger.message.no_tokenId_or_not_valid, {
                location: Logger.location.COMBOCOLLCORE_GET_INGREDIENTS,
            });
        }

        try {
            return this.contractDeployed.getIngredients(params.comboIds);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COMBOCOLLCORE_GET_INGREDIENTS,
                error,
            });
        }
    }

    /**
     * Returns royalty info.
     * @returns {Promise<RoyaltyInfo>}
     */
    async royaltyInfo(params: RoyaltyInfoOptions): Promise<RoyaltyInfo> {
        this.assertContractLoaded(Logger.location.COMBOCOLLCORE_ROYALTYINFO);

        if (!isValidNonNegInteger(params.tokenId)) {
            log.throwMissingArgumentError(Logger.message.no_tokenId_or_not_valid, {
                location: Logger.location.COMBOCOLLCORE_ROYALTYINFO,
            });
        }

        if (!isValidNonNegInteger(params.sellPrice)) {
            log.throwMissingArgumentError(Logger.message.no_sell_price_supplied_or_not_valid, {
                location: Logger.location.COMBOCOLLCORE_ROYALTYINFO,
            });
        }

        try {
            return this.contractDeployed.royaltyInfo(params.tokenId, params.sellPrice);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COMBOCOLLCORE_ROYALTYINFO,
                error,
            });
        }
    }

    /**
     * Returns metadata about this combo collection.
     * @returns {Promise<CollectionMeta>}
     */
    async collectionMeta(): Promise<CollectionMeta> {
        this.assertContractLoaded(Logger.location.COMBOCOLLCORE_COLLECTIONMETA);
        try {
            return this.contractDeployed.collectionMeta();
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COMBOCOLLCORE_COLLECTIONMETA,
                error,
            });
        }
    }

    /**
     * Sets the price (in Ether) paid for mintint/editing a combo
     * @param {object} params object containing all parameters
     * @param {number} params.price the price in `ether`
     * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
     */
    async setPrice(params: SetPriceOptions): Promise<ethers.providers.TransactionResponse> {
        this.assertContractLoaded(Logger.location.COMBOCOLLCORE_SETPRICE);

        try {
            const priceInWeis = utils.parseEther(params.price);

            const chainId = await this.contractDeployed.signer.getChainId();
            let options;
            // If Polygon mainnet, set up options propperly to avoid underpriced transaction error
            if (chainId === Chains.polygon)
                options = await preparePolygonTransaction(
                    await this.contractDeployed.signer.getTransactionCount(),
                );
            else options = addGasPriceToOptions({}, params.gasPrice, Logger.location.COMBOCOLLCORE_SETPRICE);

            return this.contractDeployed.setPrice(priceInWeis, options);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COMBOCOLLCORE_SETPRICE,
                error,
            });
        }
    }
}