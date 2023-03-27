import { ethers, utils } from 'ethers';
import Auth from '../Auth/Auth';
import { Logger, log } from '../Logger';
import { Chains } from '../Auth/availableChains';
import { loadContractOptions } from './sdk.schema';
import { classes } from './constants';

export type LoadContractOptions = {
  templateName: string;
  contractAddress: string;
};

export type GetStatusOptions = {
  txHash: string;
};

export class SDK {
  /* Private property */
  private readonly auth: Auth;

  constructor(auth: Auth) {
    if (!(auth instanceof Auth)) {
      log.throwArgumentError(Logger.message.invalid_auth_instance, 'auth', auth, {
        location: Logger.location.SDK_CONSTRUCTOR,
      });
    }
    this.auth = auth;
  }

  getProvider(): ethers.Wallet | ethers.providers.JsonRpcSigner {
    return this.auth.getSigner();
  }

  infuraSupported() {
    return (
      this.auth.getChainId() !== Chains.bsc &&
      this.auth.getChainId() !== Chains.bsctest &&
      this.auth.getChainId() !== Chains.cronos &&
      this.auth.getChainId() !== Chains.cronostestnet &&
      this.auth.getChainId() !== Chains.fantom
    );
  }

  // /**
  //  * Deploy Contract on the blockchain
  //  * @param {object} opts object containing all parameters
  //  * @param {string} opts.template name of the template to use (ERC721Mintable, ...)
  //  * @param {object} opts.params template parameters (name, symbol, contractURI, ...)
  //  * @returns {Promise<ERC721Mintable>} Contract instance
  //  */
  // async deploy(opts: DeployOptionsMintable): Promise<ERC721Mintable>;
  // async deploy(opts: DeployOptionsUserMintable): Promise<ERC721UserMintable>;
  // async deploy(opts: DeployOptionsERC1155UserMintable): Promise<ERC1155Mintable>;
  // async deploy(opts: any): Promise<any> {
  //   if (!this.infuraSupported()) {
  //     log.throwArgumentError(
  //       Logger.message.chain_not_supported_write_operations,
  //       'chainId',
  //       this.auth.getChainId(),
  //       {
  //         location: Logger.location.SDK_DEPLOY,
  //       },
  //     );
  //   }
  //   if (!opts.template) {
  //     log.throwMissingArgumentError(Logger.message.no_template_type_supplied, {
  //       location: Logger.location.SDK_DEPLOY,
  //     });
  //   }
  //   if (Object.keys(opts.params).length === 0) {
  //     log.throwMissingArgumentError(Logger.message.no_parameters_supplied, {
  //       location: Logger.location.SDK_DEPLOY,
  //     });
  //   }

  //   const signer = this.auth.getSigner();
  //   const contract = new classes[opts.template as keyof typeof classes](signer);

  //   await contract.deploy(opts.params);
  //   return contract;
  // }

  /**
   * Load a contract from an existing contract address and a template
   * @param {object} opts object containing all parameters
   * @param {string} opts.template name of the template to use (ERC721Mintable, ...)
   * @param {string} opts.contractAddress address of the contract to load
   * @returns {Promise<any>} Contract instance
   */
  async loadContract(opts: LoadContractOptions): Promise<any> {
    if (!this.infuraSupported()) {
      log.throwArgumentError(
        Logger.message.chain_not_supported_write_operations,
        'chainId',
        this.auth.getChainId(),
        {
          location: Logger.location.SDK_LOADCONTRACT,
        },
      );
    }

    const result = loadContractOptions.validate(opts);
    if (result.error) {
      log.throwMissingArgumentError(result.error.details[0].message, {
        location: Logger.location.SDK_LOADCONTRACT,
      });
    }

    const signer = this.auth.getSigner();
    const contract = new classes[opts.templateName as keyof typeof classes](signer);
    contract.loadContract({ contractAddress: opts.contractAddress });
    return contract;
  }

  /**
   * Returns the current network's gas price in Gwei for transactions
   * @returns {Promise<string>} Current price of gas in Gwei
   */
  async getGasPrice(): Promise<string> {
    const signer = this.auth.getSigner();
    const gasPrice = await signer.getGasPrice();
    return utils.formatUnits(gasPrice, 'gwei');
  }

  /** Get tx status
   * @param {object} opts object containing all parameters
   * @param {string} opts.txHash hash of the transaction
   * @returns {Promise<ethers.providers.TransactionReceipt>} Transaction information
   */
  async getStatus(opts: GetStatusOptions): Promise<ethers.providers.TransactionReceipt> {
    if (!utils.isHexString(opts.txHash)) {
      log.throwArgumentError(Logger.message.invalid_transaction_hash, 'txHash', opts.txHash, {
        location: Logger.location.SDK_GETSTATUS,
      });
    }

    const signer = this.getProvider();
    return signer.provider.getTransactionReceipt(opts.txHash);
  }
}
