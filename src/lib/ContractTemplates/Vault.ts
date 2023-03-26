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
    gas?: string;
};

type ClaimTargetOptions = {
    erc20: string;
    collections: Array<string>;
    gas?: string;
};

type ClaimablesOfCollectionsOptions = {
    collections: Array<string>;
};

type ClaimablesOfCollectionsTargetOptions = {
    erc20: string;
    collections: Array<string>;
};

type ClaimablesOfReceiversOptions = {
    receivers: Array<string>;
};

type ClaimablesOfReceiversTargetOptions = {
    erc20: string;
    receivers: Array<string>;
};

type ClaimableDetail = {
    token: string;
    ethAmount: BN;
    erc20Amount: BN;
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
     * Claims earnings(WETH & Ether) of all collections created by current wallet
     * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
     */
    async claim(params: ClaimOptions): Promise<ethers.providers.TransactionResponse> {
        this.assertContractLoaded(Logger.location.VAULT_CLAIM);

        try {
            const chainId = await this.contractDeployed.signer.getChainId();
            let options;
            // If Polygon mainnet, set up options propperly to avoid underpriced transaction error
            if (chainId === Chains.polygon)
                options = await preparePolygonTransaction(
                    await this.contractDeployed.signer.getTransactionCount(),
                );
            else options = addGasPriceToOptions({}, params.gas, Logger.location.VAULT_CLAIM);

            return this.contractDeployed['claim()'](options);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.VAULT_CLAIM,
                error,
            });
        }
    }

    /**
     * Claims earnings (specified ERC20 & Ether) of specified collections
     * @param {object} params object containing all parameters
     * @param {string} params.erc20 specified token to claim
     * @param {Array<string>} params.collections collection addresses to claim
     * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
     */
    async claimTarget(params: ClaimTargetOptions): Promise<ethers.providers.TransactionResponse> {
        this.assertContractLoaded(Logger.location.VAULT_CLAIMTARGET);

        if (!isAllValidAddress(params.erc20)) {
            log.throwMissingArgumentError(Logger.message.invalid_token_address, {
                location: Logger.location.VAULT_CLAIMTARGET,
            });
        }

        if (!isAllValidAddress(params.collections)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.VAULT_CLAIMTARGET,
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
            else options = addGasPriceToOptions({}, params.gas, Logger.location.VAULT_CLAIMTARGET);

            return this.contractDeployed['claim(address,address[])'](params.erc20, params.collections, options);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.VAULT_CLAIMTARGET,
                error,
            });
        }
    }

    /**
     * Returns claimable earnings (WETH & Ether) by collections
     * @param {object} params object containing all parameters
     * @param {Array<string>} params.collections collection addresses
     * @returns {Promise<Array<ClaimableDetail>>} List of claimbles
     */
    async claimablesOfCollections(params: ClaimablesOfCollectionsOptions): Promise<Array<ClaimableDetail>> {
        this.assertContractLoaded(Logger.location.VAULT_CLAIMABLESOFCOLLECTIONS);

        if (!isAllValidAddress(params.collections)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.VAULT_CLAIMABLESOFCOLLECTIONS,
            });
        }

        try {
            return this.contractDeployed['claimablesOfCollections(address[])'](params.collections);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.VAULT_CLAIMABLESOFCOLLECTIONS,
                error,
            });
        }
    }

    /**
     * Returns claimable earnings (specified ERC20 & Ether) by collections
     * @param {object} params object containing all parameters
     * @param {Array<string>} params.erc20 token to query
     * @param {Array<string>} params.collections collection addresses to query
     * @returns {Promise<Array<ClaimableDetail>>} List of claimbles
     */
    async claimablesOfCollectionsTarget(params: ClaimablesOfCollectionsTargetOptions): Promise<Array<ClaimableDetail>> {
        this.assertContractLoaded(Logger.location.VAULT_CLAIMABLESOFCOLLECTIONSTARGET);

        if (!isAllValidAddress(params.erc20)) {
            log.throwMissingArgumentError(Logger.message.invalid_token_address, {
                location: Logger.location.VAULT_CLAIMABLESOFCOLLECTIONSTARGET,
            });
        }

        if (!isAllValidAddress(params.collections)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.VAULT_CLAIMABLESOFCOLLECTIONSTARGET,
            });
        }

        try {
            return this.contractDeployed['claimablesOfCollections(address,address[])'](params.erc20, params.collections);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.VAULT_CLAIMABLESOFCOLLECTIONSTARGET,
                error,
            });
        }
    }

    /**
     * Returns claimable earnings (WETH & Ether) by receiver
     * @param {object} params object containing all parameters
     * @param {Array<string>} params.receivers receiver addresses
     * @returns {Promise<Array<ClaimableDetail>>} List of claimbles
     */
    async claimablesOfReceivers(params: ClaimablesOfReceiversOptions): Promise<Array<ClaimableDetail>> {
        this.assertContractLoaded(Logger.location.VAULT_CLAIMABLESOFRECEIVERS);

        if (!isAllValidAddress(params.receivers)) {
            log.throwMissingArgumentError(Logger.message.invalid_account_address, {
                location: Logger.location.VAULT_CLAIMABLESOFRECEIVERS,
            });
        }

        try {
            return this.contractDeployed['claimablesOfReceivers(address[])'](params.receivers);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.VAULT_CLAIMABLESOFRECEIVERS,
                error,
            });
        }
    }

    /**
     * Returns claimable earnings (specified ERC20 & Ether) by receiver
     * @param {object} params object containing all parameters
     * @param {Array<string>} params.erc20 token
     * @param {Array<string>} params.receivers receiver addresses
     * @returns {Promise<Array<ClaimableDetail>>} List of claimbles
     */
    async claimablesOfReceiversTarget(params: ClaimablesOfReceiversTargetOptions): Promise<Array<ClaimableDetail>> {
        this.assertContractLoaded(Logger.location.VAULT_CLAIMABLESOFRECEIVERSTARGET);

        if (!isAllValidAddress(params.erc20)) {
            log.throwMissingArgumentError(Logger.message.invalid_token_address, {
                location: Logger.location.VAULT_CLAIMABLESOFRECEIVERSTARGET,
            });
        }

        if (!isAllValidAddress(params.receivers)) {
            log.throwMissingArgumentError(Logger.message.invalid_account_address, {
                location: Logger.location.VAULT_CLAIMABLESOFRECEIVERSTARGET,
            });
        }

        try {
            return this.contractDeployed['claimablesOfReceivers(address,address[])'](params.erc20, params.receivers);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.VAULT_CLAIMABLESOFRECEIVERSTARGET,
                error,
            });
        }
    }
}