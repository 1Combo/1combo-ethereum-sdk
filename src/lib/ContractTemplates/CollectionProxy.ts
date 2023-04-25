import { ethers, utils, BigNumber as BN } from 'ethers';
import { Logger, log, ErrorLocation } from '../Logger';
import artifact from './artifacts/CollectionProxy';
import { isValidNonNegInteger, addGasPriceToOptions, isValidPositiveNumber, isAllValidAddress, isAllValidNonNegInteger } from '../utils';
import preparePolygonTransaction from './utils';
import { Chains } from '../Auth/availableChains';

type ContractAddressOptions = {
    contractAddress: string;
};

type AddItemsOptions = {
    collections: Array<string>;
    maxSupplies: Array<Array<number>>;
    sellPricesInEther: Array<Array<string>>;
    metaHashes: Array<Array<string>>;
    gasPrice?/** Gwei */: string;
};

type MintOptions = {
    to: string;
    currency: string;   // ERC20 address
    collections: Array<string>;
    tokenIds: Array<Array<number>>;
    amounts: Array<Array<number>>;
    gasPrice?/** Gwei */: string | undefined;
};

type SetPricesOptions = {
    collections: Array<string>;
    tokenIds: Array<Array<number>>;
    sellPricesInEther: Array<Array<string>>;
    gasPrice?/** Gwei */: string | undefined;
};

type SetReceiversOptions = {
    collections: Array<string>;
    newReceivers: Array<string>;
    gasPrice?/** Gwei */: string | undefined;
};

type PricesOfOptions = {
    collections: Array<string>;
    tokenIds: Array<Array<number>>;
};

type CollectionListOptions = {
    collections: Array<string>;
};

type CollectionMetadata = {
    creator: string
};

export default class CollectionProxy {
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
   * Load an CollectionProxy contract from an existing contract address. Used by the SDK class
   * @param {object} params object containing all parameters
   * @param {string} params.contractAddress Address of the CollectionProxy contract to load
   * @returns {CollectionProxy} Contract
   */
    loadContract(params: ContractAddressOptions): CollectionProxy {
        if (this.contractAddress || this.contractDeployed) {
            log.throwArgumentError(
                Logger.message.contract_already_loaded,
                'contractAddress',
                this.contractAddress,
                {
                    location: Logger.location.COLLECTIONPROXY_LOADCONTRACT,
                },
            );
        }

        if (!params.contractAddress || !ethers.utils.isAddress(params.contractAddress)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.COLLECTIONPROXY_LOADCONTRACT,
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
                location: Logger.location.COLLECTIONPROXY_LOADCONTRACT,
                error,
            });
        }
    }

    /**
     * Checks if a collection exists in CollectionProxy
     * @param {object} params object containing all parameters
     * @param {Array<string>} params.collections collection addresses
     * @returns {Promise<Array<boolean>>} List of boolean
     */
    async exist(params: CollectionListOptions): Promise<Array<boolean>> {
        this.assertContractLoaded(Logger.location.COLLECTIONPROXY_EXIST);

        params.collections.forEach(collection => {
            if (!collection || !ethers.utils.isAddress(collection)) {
                log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                    location: Logger.location.COLLECTIONPROXY_EXIST,
                });
            }
        });

        try {
            return this.contractDeployed.exist(params.collections);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COLLECTIONPROXY_EXIST,
                error,
            });
        }
    }

    /**
     * Returns the specified collection's summary info in CollectionProxy 
     * @param {object} params object containing all parameters
     * @param {Array<string>} params.collections collection addresses
     * @returns {Promise<Array<CollectionMetadata>>} List of summary info
     */
    async collectionMetasOf(params: CollectionListOptions): Promise<Array<CollectionMetadata>> {
        this.assertContractLoaded(Logger.location.COLLECTIONPROXY_COLLECTIONMETASOF);

        params.collections.forEach(collection => {
            if (!collection || !ethers.utils.isAddress(collection)) {
                log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                    location: Logger.location.COLLECTIONPROXY_COLLECTIONMETASOF,
                });
            }
        });

        try {
            return this.contractDeployed.collectionMetasOf(params.collections);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COLLECTIONPROXY_COLLECTIONMETASOF,
                error,
            });
        }
    }

    /**
     * Returns sell price of the specified item
     * @param {object} params object containing all parameters
     * @param {Array<string>} params.collections collection addresses
     * @param {Array<Array<number>>} params.tokenIds tokens of the corresponding collection
     * @returns {Promise<Array<Array<BN>>>} sell price of the corresponding item
     */
    async pricesOf(params: PricesOfOptions): Promise<Array<Array<BN>>> {
        this.assertContractLoaded(Logger.location.COLLECTIONPROXY_PRICESOF);
        this.assertArrayLengthEqual(params.collections, params.tokenIds, Logger.location.COLLECTIONPROXY_PRICESOF);

        if (!isAllValidAddress(params.collections)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.COLLECTIONPROXY_PRICESOF,
            });
        }

        if (!isAllValidNonNegInteger(params.tokenIds)) {
            log.throwMissingArgumentError(Logger.message.no_tokenId_or_not_valid, {
                location: Logger.location.COLLECTIONPROXY_PRICESOF,
            });
        }

        try {
            return this.contractDeployed.pricesOf(params.collections, params.tokenIds);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COLLECTIONPROXY_PRICESOF,
                error,
            });
        }
    }

    /**
     * Sets the price (in Ether) of the mint, only creator of the collection is allowed
     * @param {object} params object containing all parameters
     * @param {Array<string>} params.collections collection addresses
     * @param {Array<Array<number>>} params.tokenIds tokens of the corresponding collection
     * @param {Array<Array<string>>} params.sellPrices sell price of the corresponding token
     * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
     */
    async setPrices(params: SetPricesOptions): Promise<ethers.providers.TransactionResponse> {
        this.assertContractLoaded(Logger.location.COLLECTIONPROXY_SETPRICES);
        this.assertArrayLengthEqual(params.collections, params.tokenIds, Logger.location.COLLECTIONPROXY_SETPRICES);
        this.assertArrayLengthEqual(params.collections, params.sellPricesInEther, Logger.location.COLLECTIONPROXY_SETPRICES);

        if (!isAllValidAddress(params.collections)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.COLLECTIONPROXY_SETPRICES,
            });
        }

        params.tokenIds.forEach((list, index) => {
            this.assertArrayLengthEqual(list, params.sellPricesInEther[index], Logger.location.COLLECTIONPROXY_SETPRICES);
            list.forEach(tokenId => {
                if (!isValidNonNegInteger(tokenId)) {
                    log.throwMissingArgumentError(Logger.message.no_tokenId_or_not_valid, {
                        location: Logger.location.COLLECTIONPROXY_SETPRICES,
                    });
                }
            });
        });

        try {
            const priceInWeis = params.sellPricesInEther.map(list => list.map(price => utils.parseEther(price)));

            const chainId = await this.contractDeployed.signer.getChainId();
            let options;
            // If Polygon mainnet, set up options propperly to avoid underpriced transaction error
            if (chainId === Chains.polygon)
                options = await preparePolygonTransaction(
                    await this.contractDeployed.signer.getTransactionCount(),
                );
            else options = addGasPriceToOptions({}, params.gasPrice, Logger.location.COLLECTIONPROXY_SETPRICES);

            return this.contractDeployed.setPrices(params.collections, params.tokenIds, priceInWeis, options);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COLLECTIONPROXY_SETPRICES,
                error,
            });
        }
    }

    /**
     * Adds new items, only creator of the collection is allowed
     * @param {object} params object containing all parameters
     * @param {Array<string>} params.collections collection addresses
     * @param {Array<Array<number>>} params.maxSupplies maximum supply of the new item
     * @param {Array<Array<string>>} params.sellPrices the mint price (in Ether) of the new item
     * @param {Array<Array<string>>} params.metaHashes hash of the new item's metadata
     * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
     * 
     * @todo TODO: metaHash is unknown
     */
    async addItems(params: AddItemsOptions): Promise<ethers.providers.TransactionResponse> {
    //     this.assertContractLoaded(Logger.location.COLLECTIONPROXY_ADDITEMS);

    //     params.collections.forEach(collection => {
    //         if (!collection || !ethers.utils.isAddress(collection)) {
    //             log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
    //                 location: Logger.location.COLLECTIONPROXY_ADDITEMS,
    //             });
    //         }
    //     });

    //     params.maxSupplies.forEach(list => list.forEach(maxSupply => {
    //         if (!isValidNonNegInteger(maxSupply)) {
    //             log.throwMissingArgumentError(Logger.message.no_maxSupply_or_not_valid, {
    //                 location: Logger.location.COLLECTIONPROXY_ADDITEMS,
    //             });
    //         }
    //     }));

    //     try {
    //         const priceInWeis = params.sellPrices.map(list => list.map(price => utils.parseEther(price)));

    //         const chainId = await this.contractDeployed.signer.getChainId();
    //         let options;
    //         // If Polygon mainnet, set up options propperly to avoid underpriced transaction error
    //         if (chainId === Chains.polygon)
    //             options = await preparePolygonTransaction(
    //                 await this.contractDeployed.signer.getTransactionCount(),
    //             );
    //         else options = addGasPriceToOptions({ gasLimit: params.gasPrice }, params.gasPrice, Logger.location.COLLECTIONPROXY_ADDGASPRICETOOPTIONS);

    //         return this.contractDeployed.addItems(params.collections, priceInWeis, params.maxSupplies, params.metaHashes, options);
    //     } catch (error) {
    //         return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
    //             location: Logger.location.COLLECTIONPROXY_ADDITEMS,
    //             error,
    //         });
    //     }
        return null as unknown as Promise<ethers.providers.TransactionResponse>;
    }


    /**
     * Sets new royalty receiver address of the specified collection, only
     * creator of the collection is allowed
     * @param {object} params object containing all parameters
     * @param {Array<string>} params.collections collection addresses to set
     * @param {Array<string>} params.newReceivers new receiver addresses
     * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
     */
    async setReceivers(params: SetReceiversOptions): Promise<ethers.providers.TransactionResponse> {
        this.assertContractLoaded(Logger.location.COLLECTIONPROXY_SETRECEIVERS);
        this.assertArrayLengthEqual(params.collections, params.newReceivers, Logger.location.COLLECTIONPROXY_SETRECEIVERS);

        if (!isAllValidAddress(params.collections)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.COLLECTIONPROXY_SETRECEIVERS,
            });
        }

        if (!isAllValidAddress(params.newReceivers)) {
            log.throwMissingArgumentError(Logger.message.invalid_receiver_address, {
                location: Logger.location.COLLECTIONPROXY_SETRECEIVERS,
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
            else options = addGasPriceToOptions({ }, params.gasPrice, Logger.location.COLLECTIONPROXY_SETRECEIVERS);

            return this.contractDeployed.setReceivers(params.collections, params.newReceivers, options);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COLLECTIONPROXY_SETRECEIVERS,
                error,
            });
        }
    }

    /**
     * Mints tokens
     * @param {object} params object containing all parameters
     * @param {string} params.to owner address of the newly minted tokens
     * @param {string} params.currency pay in Ether or WETH
     * @param {Array<string>} params.collections collection addresses
     * @param {Array<Array<number>>} params.tokenIds tokens of the corresponding collection to buy
     * @param {Array<Array<number>>} params.amounts amount of the corresponding token to buy
     * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
     */
    async mint(params: MintOptions): Promise<ethers.providers.TransactionResponse> {
        this.assertContractLoaded(Logger.location.COLLECTIONPROXY_MINT);
        this.assertArrayLengthEqual(params.collections, params.tokenIds, Logger.location.COLLECTIONPROXY_MINT);
        this.assertArrayLengthEqual(params.collections, params.amounts, Logger.location.COLLECTIONPROXY_MINT);

        if (!params.to || !ethers.utils.isAddress(params.to)) {
            log.throwMissingArgumentError(Logger.message.invalid_to_address, {
                location: Logger.location.COLLECTIONPROXY_MINT,
            });
        }

        if (!isAllValidAddress(params.collections)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.COLLECTIONPROXY_MINT,
            });
        }

        params.tokenIds.forEach((list, i) => {
            this.assertArrayLengthEqual(list, params.amounts[i], Logger.location.COLLECTIONPROXY_MINT);
            list.forEach((tokenId, j) => {
                if (!isValidNonNegInteger(tokenId)) {
                    log.throwMissingArgumentError(Logger.message.no_tokenId_or_not_valid, {
                        location: Logger.location.COLLECTIONPROXY_MINT,
                    });
                }
                if (!isValidPositiveNumber(params.amounts[i][j])) {
                    log.throwMissingArgumentError(Logger.message.amount_must_be_integer, {
                        location: Logger.location.COLLECTIONPROXY_MINT,
                    });
                }
            });
        });

        try {
            const chainId = await this.contractDeployed.signer.getChainId();
            let options;
            // If Polygon mainnet, set up options propperly to avoid underpriced transaction error
            if (chainId === Chains.polygon)
                options = await preparePolygonTransaction(
                    await this.contractDeployed.signer.getTransactionCount(),
                );
            else options = addGasPriceToOptions({ }, params.gasPrice, Logger.location.COLLECTIONPROXY_MINT);

            if (params.currency == '0x0000000000000000000000000000000000000000') {
                const prices = (await this.contractDeployed.pricesOf(params.collections, params.tokenIds)) as Array<Array<BN>>;
                let value = BN.from(0);
                prices.forEach((list, i) => {
                    list.forEach((price, j) => {
                        value = value.add(price.mul(BN.from(params.amounts[i][j])));
                    });
                });
                options.value = value;
            }

            return this.contractDeployed['mint(address,address,(address[],uint256[][],uint256[][]))'](
                params.to,
                params.currency,
                {
                    collections: params.collections,
                    tokenIds: params.tokenIds,
                    amounts: params.amounts,
                },
                options,
            );
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.COLLECTIONPROXY_MINT,
                error,
            });
        }
    }
}