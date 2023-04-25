import { ethers, BigNumber as BN } from 'ethers';
import { MAX_UINT128 } from '../constants';
import { Logger, log, ErrorLocation } from '../Logger';
import artifact from './artifacts/EscrowIndexer';
import { isAllValidAddress, isAllValidNonNegInteger } from '../utils';

type ContractAddressOptions = {
    contractAddress: string;
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

export default class EscrowIndexer {
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
   * Load an EscrowIndexer contract from an existing contract address. Used by the SDK class
   * @param {object} params object containing all parameters
   * @param {string} params.contractAddress Address of the EscrowIndexer contract to load
   * @returns {EscrowIndexer} Contract
   */
    loadContract(params: ContractAddressOptions): EscrowIndexer {
        if (this.contractAddress || this.contractDeployed) {
            log.throwArgumentError(
                Logger.message.contract_already_loaded,
                'contractAddress',
                this.contractAddress,
                {
                    location: Logger.location.ESCROWINDEXER_LOADCONTRACT,
                },
            );
        }

        if (!isAllValidAddress(params.contractAddress)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.ESCROWINDEXER_LOADCONTRACT,
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
                location: Logger.location.ESCROWINDEXER_LOADCONTRACT,
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
        this.assertContractLoaded(Logger.location.ESCROWINDEXER_ROOTCOMBOOFTOKENS);
        this.assertArrayLengthEqual(params.tokenAddresses, params.tokenIds, Logger.location.ESCROWINDEXER_ROOTCOMBOOFTOKENS);

        if (!isAllValidAddress(params.tokenAddresses)) {
            log.throwMissingArgumentError(Logger.message.invalid_contract_address, {
                location: Logger.location.ESCROWINDEXER_ROOTCOMBOOFTOKENS,
            });
        }

        if (!isAllValidNonNegInteger(params.tokenIds)) {
            log.throwMissingArgumentError(Logger.message.no_tokenId_or_not_valid, {
                location: Logger.location.ESCROWINDEXER_ROOTCOMBOOFTOKENS,
            });
        }

        try {
            return this.contractDeployed['rootCombosOf(address[],uint256[][])'](params.tokenAddresses, params.tokenIds);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.ESCROWINDEXER_ROOTCOMBOOFTOKENS,
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
        this.assertContractLoaded(Logger.location.ESCROWINDEXER_ROOTCOMBOOFUUIDS);

        const uuids = params.uuids.map(v => {
            const uuid = BN.from(v);
            if (uuid.isNegative() || uuid.gt(MAX_UINT128)) {
                log.throwMissingArgumentError(Logger.message.no_uuid_or_not_valid, {
                    location: Logger.location.ESCROWINDEXER_ROOTCOMBOOFUUIDS,
                });
            }
            return uuid;
        });

        try {
            return this.contractDeployed['rootCombosOf(uint128[])'](uuids);
        } catch (error) {
            return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
                location: Logger.location.ESCROWINDEXER_ROOTCOMBOOFUUIDS,
                error,
            });
        }
    }
}