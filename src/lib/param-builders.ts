import { BigNumber as BN } from 'ethers';
import { isAllValidAddress, isAllValidNonNegInteger, isValidPositiveNumber } from './utils';
import { Logger, log } from './Logger';
import { MAX_UINT128, MAX_UINT32, MAX_UINT64, ZERO_ADDRESS } from './constants';

type AddNFTOptions = {
    // true - purchase a new add-on, false - use owned NFT
    purchase: boolean;
    collection: string;
    tokenId: number | string;    // may be a big number
    setId: number;
    amount: number;
};

type Ingredients = {
    collections: Array<string>;
    itemsForCollections: Array<Array<BN>>;
    amountsForItems: Array<Array<number>>;
    setsForItems: Array<Array<number>>;
};

type Ingredient = {
    collection: string;
    tokenId: BN;
    setId: number;
    amount: number;
};

type Purchase = {
    collection: string;
    tokenId: BN;
    amount: number;
};

type Purchases = {
    collections: Array<string>;
    tokenIds: Array<Array<BN>>;
    amounts: Array<Array<number>>;
};

export class ComboMintOrEditBuilder {
    private _finalized: boolean;
    private _ingredients: Array<Ingredient>;
    private _purchases: Array<Purchase>;

    constructor() {
        this._finalized = false;
        this._ingredients = new Array();
        this._purchases = new Array();
    }

    /**
     * Adds a NFT
     * @param {object} params object containing all parameters
     * - {boolean} params.purchase - use NFT already owned by user if false, otherwise buy a new one
     * - {string} params.collection - token address
     * - {number} params.tokenId -
     * - {number} params.setId - the set which the NFT's collection belongs to
     * - {number} params.amount - the number of token to use or purchase
     * @returns {ComboMintOrEditBuilder}
     */
    addNFT(params: AddNFTOptions): ComboMintOrEditBuilder {
        if (this._finalized) {
            log.throwMissingArgumentError(Logger.message.already_finalized, {
                location: Logger.location.COMBOMINTOREDITBUILDER_ADDNFT,
            });
        }

        if (!isAllValidAddress(params.collection)) {
            log.throwMissingArgumentError(Logger.message.invalid_token_address, {
                location: Logger.location.COMBOMINTOREDITBUILDER_ADDNFT,
            });
        }

        if (!isAllValidNonNegInteger(params.setId) || params.setId > MAX_UINT32) {
            log.throwMissingArgumentError(Logger.message.invalid_set_id, {
                location: Logger.location.COMBOMINTOREDITBUILDER_ADDNFT,
            });
        }

        if (!isAllValidNonNegInteger(params.amount) || params.amount > MAX_UINT64) {
            log.throwMissingArgumentError(Logger.message.invalid_amount, {
                location: Logger.location.COMBOMINTOREDITBUILDER_ADDNFT,
            });
        }

        const tokenId = BN.from(params.tokenId);
        if (tokenId.isNegative() || tokenId.gt(MAX_UINT128)) {
            log.throwMissingArgumentError(Logger.message.no_tokenId_or_not_valid, {
                location: Logger.location.COMBOMINTOREDITBUILDER_ADDNFT,
            });
        }

        this._ingredients.push({
            collection: params.collection.toLowerCase(),
            tokenId: tokenId,
            amount: params.amount,
            setId: params.setId
        });

        this._purchases.push({
            collection: params.collection.toLowerCase(),
            tokenId: tokenId,
            amount: params.amount,
        });

        return this;
    }

    build() {
        if (this._finalized) {
            log.throwMissingArgumentError(Logger.message.already_finalized, {
                location: Logger.location.COMBOMINTOREDITBUILDER_BUILD,
            });
        }
        this._finalized = true;

        this._ingredients.sort((a, b) => {
            let result = a.collection.localeCompare(b.collection);
            if (result != 0) {
                return result;
            }

            let resultSub = a.tokenId.sub(b.tokenId);
            if (!resultSub.isZero()) {
                return resultSub.isNegative() ? -1 : 1;
            }

            return a.setId == b.setId ? 0 : (a.setId > b.setId ? 1 : -1);
        });

        this._purchases.sort((a, b) => {
            let result = a.collection.localeCompare(b.collection);
            if (result != 0) {
                return result;
            }

            let resultSub = a.tokenId.sub(b.tokenId);
            return resultSub.isZero() ? 0 : (resultSub.isNegative() ? -1 : 1);
        });

        const ingredients: Ingredients = {
            collections: new Array(),
            itemsForCollections: new Array(),
            amountsForItems: new Array(),
            setsForItems: new Array(),
        };

        this._ingredients.forEach((v, index, array) => {
            if (index == 0 || v.collection !== array[index - 1].collection) {
                ingredients.collections.push(v.collection);
                ingredients.itemsForCollections.push(new Array());
                ingredients.amountsForItems.push(new Array());
                ingredients.setsForItems.push(new Array());
            }

            const tail = ingredients.collections.length - 1;

            ingredients.itemsForCollections[tail].push(v.tokenId);
            ingredients.amountsForItems[tail].push(v.amount);
            ingredients.setsForItems[tail].push(v.setId);
        });

        const purchases: Purchases = {
            collections: new Array(),
            tokenIds: new Array(),
            amounts: new Array(),
        };

        this._purchases.forEach((v, index, array) => {
            if (index == 0 || v.collection !== array[index - 1].collection) {
                purchases.collections.push(v.collection);
                purchases.tokenIds.push(new Array());
                purchases.amounts.push(new Array());
            }

            const tail = purchases.collections.length - 1;

            purchases.tokenIds[tail].push(v.tokenId);
            purchases.amounts[tail].push(v.amount);
        });

        return [ingredients, purchases];
    }
}

type Factor = {
    max: number;
    min: number;
    collection: string;
    setId: number;
    lock: boolean;
    limit: number;
};

type AddCollectionRuleOptions = {
    collection: string;
    max: number;
    min: number;
    limit: number;
    lock: boolean;
};

type AddSetRuleOptions = {
    setId: number;
    max: number;
    min: number;
    limit: number;
    lock: boolean;
};

export class ComboRuleBuilder {
    private _finalized: boolean;
    private _collectionFactors: Array<Factor>;
    private _setFactors: Array<Factor>;

    constructor() {
        this._finalized = false;
        this._collectionFactors = new Array();
        this._setFactors = new Array();
    }

    /**
     * Adds a rule that is used to constrain a collection in this combo collection
     * @param {object} params object containing all parameters
     * - {string} params.collection - which collection
     * - {number} params.max - the maximum number of tokens of this collection that can be used in a single combo NFT
     * - {number} params.min - the minimum number of tokens of this collection that are required in a single combo NFT
     * - {number} params.limit - the maximum times of a distinct ERC721 token that can be reused when params.lock is false
     * - {boolean} params.lock - whether tokens of this collection are to be locked
     * @returns {ComboMintOrEditBuilder}
     */
    addCollectionRule(params: AddCollectionRuleOptions): ComboRuleBuilder {
        if (this._finalized) {
            log.throwMissingArgumentError(Logger.message.already_finalized, {
                location: Logger.location.COMBORULEBUILDER_ADDCOLLECTIONRULE,
            });
        }

        const collection = params.collection.toLowerCase();
        if (!isAllValidAddress(collection)) {
            log.throwMissingArgumentError(Logger.message.invalid_token_address, {
                location: Logger.location.COMBORULEBUILDER_ADDCOLLECTIONRULE,
            });
        }
        this._collectionFactors.forEach(f => {
            if (f.collection === collection) {
                log.throwMissingArgumentError(Logger.message.duplicate_collection_rules, {
                    location: Logger.location.COMBORULEBUILDER_ADDCOLLECTIONRULE,
                });
            }
        });

        if (
            !isAllValidNonNegInteger(params.limit) || params.limit > MAX_UINT64 ||
            (params.limit > 0 && params.lock)
        ) {
            log.throwMissingArgumentError(Logger.message.invalid_rule_param, {
                location: Logger.location.COMBORULEBUILDER_ADDCOLLECTIONRULE,
            });
        }

        if (
            !isAllValidNonNegInteger(params.min) || params.min > MAX_UINT64 ||
            !isValidPositiveNumber(params.max) || params.max > MAX_UINT64 ||
            params.min > params.max
        ) {
            log.throwMissingArgumentError(Logger.message.invalid_rule_param, {
                location: Logger.location.COMBORULEBUILDER_ADDCOLLECTIONRULE,
            });
        }

        this._collectionFactors.push({
            collection: collection,
            max: params.max,
            min: params.min,
            limit: params.limit,
            lock: params.lock,
            setId: 0,
        });

        return this;
    }

    /**
     * Adds a rule that is used to constrain a set in this combo collection
     * @param {object} params object containing all parameters
     * - {string} params.setId - which set
     * - {number} params.max - the maximum number of tokens of this set that can be used in a single combo NFT
     * - {number} params.min - the minimum number of tokens of this set that are required in a single combo NFT
     * - {number} params.limit - the maximum times of a distinct ERC721 token of this set that can be reused when params.lock is false
     * - {boolean} params.lock - whether tokens of this set are to be locked
     * @returns {ComboRuleBuilder}
     */
    addSetRule(params: AddSetRuleOptions): ComboRuleBuilder {
        if (this._finalized) {
            log.throwMissingArgumentError(Logger.message.already_finalized, {
                location: Logger.location.COMBORULEBUILDER_ADDSETRULE,
            });
        }

        if (!isAllValidNonNegInteger(params.setId) || params.setId > MAX_UINT32) {
            log.throwMissingArgumentError(Logger.message.invalid_set_id, {
                location: Logger.location.COMBORULEBUILDER_ADDSETRULE,
            });
        }

        this._setFactors.forEach(f => {
            if (f.setId === params.setId) {
                log.throwMissingArgumentError(Logger.message.duplicate_set_rules, {
                    location: Logger.location.COMBORULEBUILDER_ADDSETRULE,
                });
            }
        });

        if (
            !isAllValidNonNegInteger(params.limit) || params.limit > MAX_UINT64 ||
            (params.limit > 0 && params.lock)
        ) {
            log.throwMissingArgumentError(Logger.message.invalid_rule_param, {
                location: Logger.location.COMBORULEBUILDER_ADDSETRULE,
            });
        }

        if (
            !isAllValidNonNegInteger(params.min) || params.min > MAX_UINT64 ||
            !isValidPositiveNumber(params.max) || params.max > MAX_UINT64 ||
            params.min > params.max
        ) {
            log.throwMissingArgumentError(Logger.message.invalid_rule_param, {
                location: Logger.location.COMBORULEBUILDER_ADDSETRULE,
            });
        }

        this._setFactors.push({
            collection: ZERO_ADDRESS,
            max: params.max,
            min: params.min,
            limit: params.limit,
            lock: params.lock,
            setId: params.setId,
        });

        return this;
    }

    build() {
        if (this._finalized) {
            log.throwMissingArgumentError(Logger.message.already_finalized, {
                location: Logger.location.COMBORULEBUILDER_BUILD,
            });
        }
        this._finalized = true;

        this._collectionFactors.sort((a, b) => {
            return a.collection.localeCompare(b.collection) > 0 ? 1 : -1;
        });

        this._setFactors.sort((a, b) => {
            return a.setId > b.setId ? 1 : -1;
        });

        return {
            factors: this._collectionFactors.concat(this._setFactors)
        };
    }
}