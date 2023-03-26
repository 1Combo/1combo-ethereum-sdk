import { ethers, utils, BigNumber as BN } from 'ethers';
import BaseERC1155 from '../ContractComponents/baseERC1155';
import { Logger, log, ErrorLocation } from '../Logger';
import artifact from './artifacts/Collection';
import { isValidNonNegInteger, addGasPriceToOptions, isAllValidAddress, isAllValidNonNegInteger } from '../utils';
import preparePolygonTransaction from '../ContractTemplates/utils';
import { Chains } from '../Auth/availableChains';

type ContractAddressOptions = {
    contractAddress: string;
};

type TotalSupplyOptions = {
    tokenId: number;
};

type RoyaltyInfoOptions = {
    tokenId: number;
    sellPrice: number;
};

type RoyaltyInfo = {
    receiver: string;
    royaltyAmount: BN;
};

type AddItemsOptions = {
    maxSupplies: Array<number>;
    sellPrices: Array<string>;
    metaHashes: Array<string>;
    gas?: string;
};

type SetPricesOptions = {
    tokenIds: Array<number>;
    sellPrices: Array<string>;
    gas?: string;
};

type MetadatasOfOptions = {
    tokenIds: Array<number>;
};

type Metadata = {
    totalSupply: BN;
    maxSupply: BN;
    price: BN;
};

export default class Collection {
    contractAddress: string;
    baseERC1155: BaseERC1155;

    private contractDeployed: ethers.Contract;
    private readonly signer;

    constructor(signer: ethers.Wallet | ethers.providers.JsonRpcSigner) {
        this.signer = signer;
        this.baseERC1155 = new BaseERC1155();
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
   * Load an Collection contract from an existing contract address. Used by the SDK class
   * @param {object} params object containing all parameters
   * @param {string} params.contractAddress Address of the Collection contract to load
   * @returns {Collection} Contract
   */
    loadContract(params: ContractAddressOptions): Collection {
        if (this.contractAddress || this.contractDeployed) {
            log.throwArgumentError(
                Logger.message.contract_already_loaded,
                'contractAddress',
                this.contractAddress,
                {
                    location: Logger.location.COLLECTION_LOADCONTRACT,
                },
            );
        }

        if (!isAllValidAddress(params.contractAddress)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.COLLECTION_LOADCONTRACT,
            });
        }

        try {
            this.contractAddress = <string>params.contractAddress;

            this.contractDeployed = new ethers.Contract(
                this.contractAddress,
                artifact.abi,
                this.signer,
            );
            this.baseERC1155.setContract(this.contractDeployed);
            return this;
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COLLECTION_LOADCONTRACT,
                error,
            });
        }
    }

    /**
 * Returns total supply of the specified item
 * @returns {Promise<BigNumber>} Total supply
 */
    async totalSupply(params: TotalSupplyOptions): Promise<BN> {
        this.assertContractLoaded(Logger.location.COLLECTION_TOTALSUPPLY);

        if (!isValidNonNegInteger(params.tokenId)) {
            log.throwMissingArgumentError(Logger.message.no_tokenId_or_not_valid, {
                location: Logger.location.COLLECTION_TOTALSUPPLY,
            });
        }

        try {
            return this.contractDeployed.totalSupply(params.tokenId);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COLLECTION_TOTALSUPPLY,
                error,
            });
        }
    }

    /**
 * Returns number of items
 * @returns {Promise<BigNumber>} Total number
 */
    async totalItem(): Promise<BN> {
        this.assertContractLoaded(Logger.location.COLLECTION_TOTALITEM);

        try {
            return this.contractDeployed.totalItem();
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COLLECTION_TOTALITEM,
                error,
            });
        }
    }

    /**
     * Returns metadata of the specified item
     * @param {object} params object containing all parameters
     * @param {number} params.tokenIds - Token ID
     * @returns {Promise<Array>} List of metadata including total supply, maximum supply and sell price
     */
    async metadatasOf(params: MetadatasOfOptions): Promise<Array<Metadata>> {
        this.assertContractLoaded(Logger.location.COLLECTION_METADATASOF);

        if (!isAllValidNonNegInteger(params.tokenIds)) {
            log.throwMissingArgumentError(Logger.message.no_tokenId_or_not_valid, {
                location: Logger.location.COLLECTION_METADATASOF,
            });
        }

        try {
            return this.contractDeployed.metadatasOf(params.tokenIds);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COLLECTION_METADATASOF,
                error,
            });
        }
    }


    /**
     * Returns receiver address and royalty amount based on sell price
     * @param {object} params object containing all parameters
     * @param {number} params.tokenId - Token ID
     * @param {number} params.sellPrice - Sell price
     * @returns {Promise<object>} Object that contains receiver address and bigNumber
     * representing royalty amount based on sell price
     */
    async royaltyInfo(params: RoyaltyInfoOptions): Promise<RoyaltyInfo> {
        this.assertContractLoaded(Logger.location.COLLECTION_ROYALTYINFO);

        if (!isValidNonNegInteger(params.tokenId)) {
            log.throwMissingArgumentError(Logger.message.no_tokenId_or_not_valid, {
                location: Logger.location.COLLECTION_ROYALTYINFO,
            });
        }

        if (!isValidNonNegInteger(params.sellPrice)) {
            log.throwMissingArgumentError(Logger.message.no_sell_price_supplied_or_not_valid, {
                location: Logger.location.COLLECTION_ROYALTYINFO,
            });
        }

        try {
            return this.contractDeployed.royaltyInfo(params.tokenId, params.sellPrice);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COLLECTION_ROYALTYINFO,
                error,
            });
        }
    }

    /**
     * Sets the price (in Ether) of the mint
     * @param {object} params object containing all parameters
     * @param {number} params.tokenIds ID of the token that will be transfered
     * @param {Array<string>} params.sellPrices the price (in Ether) of the mint
     * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
     */
    async setPrices(params: SetPricesOptions): Promise<ethers.providers.TransactionResponse> {
        this.assertContractLoaded(Logger.location.COLLECTION_SETPRICES);

        if (!isAllValidNonNegInteger(params.tokenIds)) {
            log.throwMissingArgumentError(Logger.message.no_tokenId_or_not_valid, {
                location: Logger.location.COLLECTION_SETPRICES,
            });
        }

        try {
            const priceInWeis = params.sellPrices.map(price => utils.parseEther(price));

            const chainId = await this.contractDeployed.signer.getChainId();
            let options;
            // If Polygon mainnet, set up options propperly to avoid underpriced transaction error
            if (chainId === Chains.polygon)
                options = await preparePolygonTransaction(
                    await this.contractDeployed.signer.getTransactionCount(),
                );
            else options = addGasPriceToOptions({ gasLimit: params.gas }, params.gas, Logger.location.COLLECTION_ADDGASPRICETOOPTIONS);

            return this.contractDeployed.setPrices(params.tokenIds, priceInWeis, options);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COLLECTION_SETPRICES,
                error,
            });
        }
    }

    /**
     * Adds new items
     * @param {object} params object containing all parameters
     * @param {number} params.maxSupplies maximum supply of the new item
     * @param {Array<string>} params.sellPrices the mint price (in Ether) of the new item
     * @param {Array<string>} params.metaHashes hash of the new item's metadata
     * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
     */
    async addItems(params: AddItemsOptions): Promise<ethers.providers.TransactionResponse> {
        this.assertContractLoaded(Logger.location.COLLECTION_ADDITEMS);

        if (!isAllValidNonNegInteger(params.maxSupplies)) {
            log.throwMissingArgumentError(Logger.message.no_maxSupply_or_not_valid, {
                location: Logger.location.COLLECTION_ADDITEMS,
            });
        }

        try {
            const priceInWeis = params.sellPrices.map(price => utils.parseEther(price));

            const chainId = await this.contractDeployed.signer.getChainId();
            let options;
            // If Polygon mainnet, set up options propperly to avoid underpriced transaction error
            if (chainId === Chains.polygon)
                options = await preparePolygonTransaction(
                    await this.contractDeployed.signer.getTransactionCount(),
                );
            else options = addGasPriceToOptions({ gasLimit: params.gas }, params.gas, Logger.location.COLLECTION_ADDGASPRICETOOPTIONS);

            return this.contractDeployed.addItems(params.maxSupplies, priceInWeis, params.metaHashes, options);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COLLECTION_ADDITEMS,
                error,
            });
        }
    }
}