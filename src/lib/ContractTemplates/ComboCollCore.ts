import { ethers, BigNumber as BN } from 'ethers';
import { MAX_UINT128 } from '../constants';
import BaseERC721 from '../ContractComponents/baseERC721';
import { Logger, log, ErrorLocation } from '../Logger';
import artifact from './artifacts/ComboCollCore';
import { isDefined, isValidNonnegativeInteger } from '../utils';

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

        if (!params.contractAddress || !ethers.utils.isAddress(params.contractAddress)) {
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

    async getComboRules(): Promise<object> {
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

    async getLimitedTokenUsages(params: GetLimitedTokenUsagesOptions): Promise<object> {
        this.assertContractLoaded(Logger.location.COMBOCOLLCORE_GET_LIMITED_TOKEN_USAGES);

        params.uuids.forEach(uuid => {
            if (!isDefined(uuid) || (() => { const v = BN.from(uuid); return v.isNegative() || v.gt(MAX_UINT128) })) {
                log.throwMissingArgumentError(Logger.message.no_uuid_or_not_valid, {
                    location: Logger.location.COMBOCOLLCORE_GET_LIMITED_TOKEN_USAGES,
                });
            }
        });

        params.setIds.forEach(setId => {
            if (!isValidNonnegativeInteger(setId)) {
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

    async getIngredients(params: GetIngredientsOptions): Promise<object> {
        this.assertContractLoaded(Logger.location.COMBOCOLLCORE_GET_INGREDIENTS);

        params.comboIds.forEach(comboId => {
            if (!isValidNonnegativeInteger(comboId)) {
                log.throwMissingArgumentError(Logger.message.no_tokenId_or_not_valid, {
                    location: Logger.location.COMBOCOLLCORE_GET_INGREDIENTS,
                });
            }
        });

        try {
            return this.contractDeployed.getIngredients(params.comboIds);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COMBOCOLLCORE_GET_INGREDIENTS,
                error,
            });
        }
    }

    async royaltyInfo(params: RoyaltyInfoOptions): Promise<RoyaltyInfo> {
        this.assertContractLoaded(Logger.location.COMBOCOLLCORE_ROYALTYINFO);

        if (!isValidNonnegativeInteger(params.tokenId)) {
            log.throwMissingArgumentError(Logger.message.no_tokenId_or_not_valid, {
                location: Logger.location.COMBOCOLLCORE_ROYALTYINFO,
            });
        }

        if (!isValidNonnegativeInteger(params.sellPrice)) {
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
}