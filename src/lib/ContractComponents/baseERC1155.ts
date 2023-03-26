import { BigNumber, ethers } from 'ethers';
import { Logger, log, ErrorLocation } from '../Logger';
import { GAS_LIMIT } from '../constants';
import { addGasPriceToOptions, isBoolean, isValidNonNegInteger, isValidString } from '../utils';
import preparePolygonTransaction from '../ContractTemplates/utils';
import { Chains } from '../Auth/availableChains';

type SetApprovalForAllOptions = {
  to: string;
  approvalStatus: boolean;
  gas?: string;
};

type IsApprovedForAllOptions = {
  account: string;
  operator: string;
};

type SafeTransferFromOptions = {
  from: string;
  to: string;
  tokenId: number;
  amount: number;
  data?: string;
  gas?: string;
};

type SafeBatchTransferFromOptions = {
  from: string;
  to: string;
  tokenIds: Array<number>;
  amounts: Array<number>;
  data?: string;
  gas?: string;
};

type URIOptions = {
  tokenId: number;
};

type BalanceOfOptions = {
  account: string;
  tokenId: number;
};

type BalanceOfBatchOptions = {
  accounts: Array<string>;
  tokenIds: Array<number>;
};

export default class BaseERC1155 {
  contractAddress: string;

  private contractDeployed: ethers.Contract;

  /**
   * Set contract information from the calling class (ERC1155, ERC1155User, ...)
   * @param {ethers.Contract} contract instance of the deployed contract
   * @returns void
   */
  setContract(contract: ethers.Contract) {
    this.contractDeployed = contract;
    this.contractAddress = contract.address;
  }

  private assertContractLoaded(location: ErrorLocation) {
    if (!this.contractDeployed && !this.contractAddress) {
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
   * Transfer function: Transfer the token 'tokenId' between 'from' and 'to addresses.
   * @param {object} params object containing all parameters
   * @param {string} params.from Address who will transfer the token
   * @param {string} params.to Address that will receive the token
   * @param {number} params.tokenId ID of the token that will be transfered
   * @param {number} params.amount amount of the token that will be transfered
   * @param {string} params.data extra data
   * @notice Warning: This method will consume gas (62000 gas estimated)
   * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
   */
  async safeTransferFrom(params: SafeTransferFromOptions): Promise<ethers.providers.TransactionResponse> {
    this.assertContractLoaded(Logger.location.BASEERC1155_SAFETRANSFERFROM);

    if (!params.from || !ethers.utils.isAddress(params.from)) {
      log.throwMissingArgumentError(Logger.message.invalid_from_address, {
        location: Logger.location.BASEERC1155_SAFETRANSFERFROM,
      });
    }

    if (!params.to || !ethers.utils.isAddress(params.to)) {
      log.throwMissingArgumentError(Logger.message.invalid_to_address, {
        location: Logger.location.BASEERC1155_SAFETRANSFERFROM,
      });
    }

    if (!isValidNonNegInteger(params.tokenId)) {
      log.throwArgumentError(Logger.message.tokenId_must_be_integer, 'tokenId', params.tokenId, {
        location: Logger.location.BASEERC1155_SAFETRANSFERFROM,
      });
    }

    if (!isValidNonNegInteger(params.amount)) {
      log.throwArgumentError(Logger.message.amount_must_be_integer, 'amount', params.amount, {
        location: Logger.location.BASEERC1155_SAFETRANSFERFROM,
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
      else options = addGasPriceToOptions({ gasLimit: GAS_LIMIT }, params.gas, Logger.location.BASEERC1155_ADDGASPRICETOOPTIONS);

      let data = isValidString(params.data) ? params.data : '';

      return this.contractDeployed.safeTransferFrom(
        params.from,
        params.to,
        params.tokenId,
        params.amount,
        data,
        options,
      );
    } catch (error) {
      return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
        location: Logger.location.BASEERC1155_SAFETRANSFERFROM,
        error,
      });
    }
  }

  /**
   * Transfer function: Transfer the token 'tokenId' between 'from' and 'to addresses.
   * @param {object} params object containing all parameters
   * @param {string} params.from Address who will transfer the token
   * @param {string} params.to Address that will receive the token
   * @param {number} params.tokenIds ID of the token that will be transfered
   * @param {number} params.amounts amount of the token that will be transfered
   * @param {string} params.data extra data
   * @notice Warning: This method will consume gas (62000 gas estimated)
   * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
   */
  async safeBatchTransferFrom(params: SafeBatchTransferFromOptions): Promise<ethers.providers.TransactionResponse> {
    this.assertContractLoaded(Logger.location.BASEERC1155_SAFEBATCHTRANSFERFROM);

    if (!params.from || !ethers.utils.isAddress(params.from)) {
      log.throwMissingArgumentError(Logger.message.invalid_from_address, {
        location: Logger.location.BASEERC1155_SAFEBATCHTRANSFERFROM,
      });
    }

    if (!params.to || !ethers.utils.isAddress(params.to)) {
      log.throwMissingArgumentError(Logger.message.invalid_to_address, {
        location: Logger.location.BASEERC1155_SAFEBATCHTRANSFERFROM,
      });
    }

    params.tokenIds.forEach(tokenId => {
      if (!isValidNonNegInteger(tokenId)) {
        log.throwArgumentError(Logger.message.tokenId_must_be_integer, 'tokenId', tokenId, {
          location: Logger.location.BASEERC1155_SAFEBATCHTRANSFERFROM,
        });
      }
    });

    params.amounts.forEach(amount => {
      if (!isValidNonNegInteger(amount)) {
        log.throwArgumentError(Logger.message.amount_must_be_integer, 'amount', amount, {
          location: Logger.location.BASEERC1155_SAFEBATCHTRANSFERFROM,
        });
      }
    });

    try {
      const chainId = await this.contractDeployed.signer.getChainId();
      let options;
      // If Polygon mainnet, set up options propperly to avoid underpriced transaction error
      if (chainId === Chains.polygon)
        options = await preparePolygonTransaction(
          await this.contractDeployed.signer.getTransactionCount(),
        );
      else options = addGasPriceToOptions({ gasLimit: GAS_LIMIT }, params.gas, Logger.location.BASEERC1155_ADDGASPRICETOOPTIONS);

      let data = isValidString(params.data) ? params.data : '';

      return this.contractDeployed.safeBatchTransferFrom(
        params.from,
        params.to,
        params.tokenIds,
        params.amounts,
        data,
        options,
      );
    } catch (error) {
      return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
        location: Logger.location.BASEERC1155_SAFEBATCHTRANSFERFROM,
        error,
      });
    }
  }

  /**
   * setApprovalForAll will give the full approval rights for a given address
   * @param {object} params object containing all parameters
   * @param {string} params.to Address which will receive the approval rights
   * @param {boolean} params.approvalStatus Boolean representing the approval to be given (true)
   *  or revoked (false)
   * @notice Warning: This method will consume gas (46000 gas estimated)
   * @returns {Promise<ethers.providers.TransactionResponse>} Transaction
   */
  async setApprovalForAll(
    params: SetApprovalForAllOptions,
  ): Promise<ethers.providers.TransactionResponse> {
    this.assertContractLoaded(Logger.location.BASEERC1155_SETAPPROVALFORALL);

    if (!params.to || !ethers.utils.isAddress(params.to)) {
      log.throwMissingArgumentError(Logger.message.invalid_to_address, {
        location: Logger.location.BASEERC1155_SETAPPROVALFORALL,
      });
    }

    if (!isBoolean(params.approvalStatus)) {
      log.throwArgumentError(
        Logger.message.approvalStatus_must_be_boolean,
        'approvalStatus',
        params.approvalStatus,
        {
          location: Logger.location.BASEERC1155_SETAPPROVALFORALL,
        },
      );
    }

    try {
      const options = addGasPriceToOptions({}, params.gas, Logger.location.BASEERC1155_SETAPPROVALFORALL);
      return this.contractDeployed.setApprovalForAll(params.to, params.approvalStatus, options);
    } catch (error) {
      return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
        location: Logger.location.BASEERC1155_SETAPPROVALFORALL,
        error,
      });
    }
  }


  async isApprovedForAll(params: IsApprovedForAllOptions): Promise<boolean> {
    this.assertContractLoaded(Logger.location.BASEERC1155_ISAPPROVEDFORALL);

    if (!params.account || !ethers.utils.isAddress(params.account)) {
      log.throwMissingArgumentError(Logger.message.invalid_account_address, {
        location: Logger.location.BASEERC1155_ISAPPROVEDFORALL,
      });
    }

    if (!params.operator || !ethers.utils.isAddress(params.operator)) {
      log.throwMissingArgumentError(Logger.message.invalid_to_address, {
        location: Logger.location.BASEERC1155_ISAPPROVEDFORALL,
      });
    }

    try {
      return this.contractDeployed.isApprovedForAll(params.account, params.operator);
    } catch (error) {
      return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
        location: Logger.location.BASEERC1155_ISAPPROVEDFORALL,
        error,
      });
    }
  }

  async uri(params: URIOptions): Promise<string> {
    this.assertContractLoaded(Logger.location.BASEERC1155_URI);

    if (!isValidNonNegInteger(params.tokenId)) {
      log.throwArgumentError(Logger.message.tokenId_must_be_integer, 'tokenId', params.tokenId, {
        location: Logger.location.BASEERC1155_URI,
      });
    }

    try {
      return this.contractDeployed.uri(params.tokenId);
    } catch (error) {
      return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
        location: Logger.location.BASEERC1155_URI,
        error,
      });
    }
  }

  async balanceOf(params: BalanceOfOptions): Promise<BigNumber> {
    this.assertContractLoaded(Logger.location.BASEERC1155_BALANCEOF);

    if (!params.account || !ethers.utils.isAddress(params.account)) {
      log.throwMissingArgumentError(Logger.message.invalid_to_address, {
        location: Logger.location.BASEERC1155_BALANCEOF,
      });
    }

    if (!isValidNonNegInteger(params.tokenId)) {
      log.throwArgumentError(Logger.message.tokenId_must_be_integer, 'tokenId', params.tokenId, {
        location: Logger.location.BASEERC1155_BALANCEOF,
      });
    }

    try {
      return this.contractDeployed.balanceOf(params.account, params.tokenId);
    } catch (error) {
      return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
        location: Logger.location.BASEERC1155_BALANCEOF,
        error,
      });
    }
  }

  async balanceOfBatch(params: BalanceOfBatchOptions): Promise<Array<BigNumber>> {
    this.assertContractLoaded(Logger.location.BASEERC1155_BALANCEOFBATCH);

    params.accounts.forEach(account => {
      if (!account || !ethers.utils.isAddress(account)) {
        log.throwMissingArgumentError(Logger.message.invalid_to_address, {
          location: Logger.location.BASEERC1155_BALANCEOFBATCH,
        });
      }
    });

    params.tokenIds.forEach(tokenId => {
      if (!isValidNonNegInteger(tokenId)) {
        log.throwArgumentError(Logger.message.tokenId_must_be_integer, 'tokenId', tokenId, {
          location: Logger.location.BASEERC1155_BALANCEOFBATCH,
        });
      }
    });



    try {
      return this.contractDeployed.balanceOfBatch(params.accounts, params.tokenIds);
    } catch (error) {
      return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
        location: Logger.location.BASEERC1155_BALANCEOFBATCH,
        error,
      });
    }
  }
}
