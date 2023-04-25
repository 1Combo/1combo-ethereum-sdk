import { ethers, BigNumber as BN } from 'ethers';
import { Logger, log, ErrorLocation } from '../Logger';
import artifact from './artifacts/Vault';
import { addGasPriceToOptions, isAllValidAddress } from '../utils';
import preparePolygonTransaction from './utils';
import { Chains } from '../Auth/availableChains';

type ContractAddressOptions = {
    contractAddress: string;
};

type ClaimOptions = {
    collections: Array<string>;
    currencies: Array<string>;
    gasPrice?/** Gwei */: string | undefined;
};

type ClaimablesOfCollectionsOptions = {
    collections: Array<string>;
    currencies: Array<string>;
};

type ClaimableDetail = {
    collection: string;
    token: string;
    pending: BN;
    totalClaimed: BN;
};

export default class Vault {
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
   * Load an Vault contract from an existing contract address. Used by the SDK class
   * @param {object} params object containing all parameters
   * @param {string} params.contractAddress Address of the Vault contract to load
   * @returns {Vault} Contract
   */
    loadContract(params: ContractAddressOptions): Vault {
        if (this.contractAddress || this.contractDeployed) {
            log.throwArgumentError(
                Logger.message.contract_already_loaded,
                'contractAddress',
                this.contractAddress,
                {
                    location: Logger.location.VAULT_LOADCONTRACT,
                },
            );
        }

        if (!isAllValidAddress(params.contractAddress)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.VAULT_LOADCONTRACT,
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
                location: Logger.location.VAULT_LOADCONTRACT,
                error,
            });
        }
    }

    /**
     * Claims earnings (all currencies for each collection) of add-on or combo collections.
     * To claim `ether`, set currency to `address(0)`
     * @param {object} params object containing all parameters
     * @param {Array<string>} params.collections collection addresses to claim
     * @param {Array<string>} params.currencies ERC20 tokens to claim
     * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
     */
    async claim(params: ClaimOptions): Promise<ethers.providers.TransactionResponse> {
        this.assertContractLoaded(Logger.location.VAULT_CLAIM);

        if (!isAllValidAddress(params.currencies)) {
            log.throwMissingArgumentError(Logger.message.invalid_token_address, {
                location: Logger.location.VAULT_CLAIM,
            });
        }

        if (!isAllValidAddress(params.collections)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.VAULT_CLAIM,
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
            else options = addGasPriceToOptions({}, params.gasPrice, Logger.location.VAULT_CLAIM);

            return this.contractDeployed.claim(params.currencies, params.collections, options);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.VAULT_CLAIM,
                error,
            });
        }
    }

    /**
     * Returns claimable earnings (all currencies for each collection) of add-on or combo collections.
     * To query `ether`, set currency to `address(0)`.
     * @param {object} params object containing all parameters
     * @param {Array<string>} params.collections collection addresses
     * @param {Array<string>} params.currencies ERC20 tokens to query
     * @returns {Promise<Array<ClaimableDetail>>} List of claimbles
     */
    async claimablesOfCollections(params: ClaimablesOfCollectionsOptions): Promise<Array<ClaimableDetail>> {
        this.assertContractLoaded(Logger.location.VAULT_CLAIMABLESOFCOLLECTIONS);

        if (!isAllValidAddress(params.collections)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.VAULT_CLAIMABLESOFCOLLECTIONS,
            });
        }

        if (!isAllValidAddress(params.currencies)) {
            log.throwMissingArgumentError(Logger.message.invalid_token_address, {
                location: Logger.location.VAULT_CLAIMABLESOFCOLLECTIONS,
            });
        }

        try {
            return this.contractDeployed.claimablesOfCollections(params.currencies, params.collections);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.VAULT_CLAIMABLESOFCOLLECTIONS,
                error,
            });
        }
    }
}