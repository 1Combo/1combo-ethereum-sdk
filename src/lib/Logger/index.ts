import version from '../../_version';

export enum ErrorCode {
  NETWORK = '[NETWORK.ERROR]',
  IPFS = '[IPFS.ERROR]',
  RUNTIME = '[RUNTIME.ERROR]',
  API = '[API.ERROR]',
  INVALID_ARGUMENT = 'INVALID_ARGUMENT',
  MISSING_ARGUMENT = 'MISSING_ARGUMENT',
  UNEXPECTED_ARGUMENT = 'UNEXPECTED_ARGUMENT',
}

export enum ErrorLocation {
  // AUTH
  AUTH_CONSTRUCTOR = '[Auth.constructor]',
  AUTH_SET_PROVIDER = '[Auth.setProvider]',

  // CONTRACT FACTORY
  CONTRACTFACTORY_FACTORY = '[ContractFactory.factory]',

  // PROVIDER
  PROVIDER_GETPROVIDER = '[Provider.getProvider]',
  PROVIDER_GETINJECTEDPROVIDER = '[Provider.getInjectedProvider]',

  // SIGNER
  SIGNER_GETWALLET = '[Signer.getWallet]',

  // HTTP SERVICE
  HTTPSERVICE_CONSTRUCTOR = '[httpService.constructor]',
  HTTPSERVICE_GET = '[httpService.get]',
  HTTPSERVICE_POST = '[httpService.post]',

  // IPFS SERVICE
  IPFSSERVICE_CONSTRUCTOR = '[IPFS.constructor]',
  IPFSSERVICE_UPLOADFILE = '[IPFS.uploadFile]',
  IPFSSERVICE_UPLOADOBJECT = '[IPFS.uploadObject]',
  IPFSSERVICE_UPLOADDIRECTORY = '[IPFS.uploadDirectory]',
  IPFSSERVICE_UNPINFILE = '[IPFS.unPinFile]',

  // Authority
  AUTHORITY_LOADCONTRACT = '[Authority.loadContract]',
  AUTHORITY_AUTHORITIESOF = '[Authority.authoritiesOf]',

  // Accounting
  ACCOUNTING_LOADCONTRACT = '[Accounting.loadContract]',
  ACCOUNTING_ADDGASPRICETOOPTIONS = '[Accounting.addGasPriceToOptions]',
  ACCOUNTING_RECEIVERSOF = '[Accounting.receiversOf]',
  ACCOUNTING_COLLECTIONSOF = '[Accounting.collectionsOf]',

  // ComboCollCore
  COMBOCOLLCORE_DEPLOY = '[ComboCollCore.deploy]',
  COMBOCOLLCORE_ADDGASPRICETOOPTIONS = '[ComboCollCore.addGasPriceToOptions]',
  COMBOCOLLCORE_MINT = '[ComboCollCore.mint]',
  COMBOCOLLCORE_LOADCONTRACT = '[ComboCollCore.loadContract]',
  COMBOCOLLCORE_GET_INGREDIENTS = '[ComboCollCore.getIngredients]',
  COMBOCOLLCORE_GET_COMBO_RULES = '[ComboCollCore.getComboRules]',
  COMBOCOLLCORE_GET_LIMITED_TOKEN_USAGES = '[ComboCollCore.getLimitedTokenUsages]',
  COMBOCOLLCORE_ROYALTYINFO = '[ComboCollCore.royaltyInfo]',

  // Collection
  COLLECTION_DEPLOY = '[Collection.deploy]',
  COLLECTION_ADDGASPRICETOOPTIONS = '[Collection.addGasPriceToOptions]',
  COLLECTION_LOADCONTRACT = '[Collection.loadContract]',
  COLLECTION_ROYALTYINFO = '[Collection.royaltyInfo]',
  COLLECTION_TOTALSUPPLY = '[Collection.totalSupply]',
  COLLECTION_TOTALITEM = '[Collection.totalItem]',
  COLLECTION_SETPRICES = '[Collection.sellPrices]',
  COLLECTION_ADDITEMS = '[Collection.addItems]',
  COLLECTION_METADATASOF = '[Collection.metadatasOf]',

  // CollectionFactory
  COLLECTIONFACTORY_LOADCONTRACT = '[CollectionFactory.loadContract]',
  COLLECTIONFACTORY_ADDGASPRICETOOPTIONS = '[CollectionFactory.addGasPriceToOptions]',
  COLLECTIONFACTORY_DEPLOYCOLLECTION = '[CollectionFactory.deployCollection]',
  COLLECTIONFACTORY_TOTALCOLLECTION = '[CollectionFactory.totalCollection]',
  COLLECTIONFACTORY_GETCOLLECTIONS = '[CollectionFactory.getCollections]',
  COLLECTIONFACTORY_GETCOLLECTIONSBYCREATOR = '[CollectionFactory.getCollectionsByCreator]',

  // CollectionProxy
  COLLECTIONPROXY_ADDGASPRICETOOPTIONS = '[CollectionProxy.addGasPriceToOptions]',
  COLLECTIONPROXY_LOADCONTRACT = '[CollectionProxy.loadContract]',
  COLLECTIONPROXY_SETPRICES = '[CollectionProxy.sellPrices]',
  COLLECTIONPROXY_ADDITEMS = '[CollectionProxy.addItems]',
  COLLECTIONPROXY_PRICESOF = '[CollectionProxy.pricesOf]',
  COLLECTIONPROXY_COLLECTIONMETASOF = '[CollectionProxy.collectionMetasOf]',
  COLLECTIONPROXY_EXIST = '[CollectionProxy.exist]',
  COLLECTIONPROXY_SETRECEIVERS = '[CollectionProxy.setReceivers]',
  COLLECTIONPROXY_MINT = '[CollectionProxy.mint]',

  // ComboCollFactory
  COMBOCOLLFACTORY_LOADCONTRACT = '[ComboCollFactory.loadContract]',
  COMBOCOLLFACTORY_ADDGASPRICETOOPTIONS = '[ComboCollFactory.addGasPriceToOptions]',
  COMBOCOLLFACTORY_TOTALREGISTRY = '[ComboCollFactory.totalRegistry]',
  COMBOCOLLFACTORY_GETREGISTRY = '[ComboCollFactory.getRegistries]',
  COMBOCOLLFACTORY_GETREGISTRYOF = '[ComboCollFactory.getRegistriesOf]',

  // ComboCollProxy
  COMBOCOLLPROXY_LOADCONTRACT = '[ComboCollProxy.loadContract]',
  COMBOCOLLPROXY_ADDGASPRICETOOPTIONS = '[ComboCollProxy.addGasPriceToOptions]',
  COMBOCOLLPROXY_SETMINTPRICEBATCH = '[ComboCollProxy.setMintPriceBatch]',
  COMBOCOLLPROXY_DISMANTLE = '[ComboCollProxy.dismantle]',
  COMBOCOLLPROXY_SETRECEIVERS = '[ComboCollProxy.setReceivers]',
  COMBOCOLLPROXY_EXIST = '[ComboCollProxy.exist]',
  COMBOCOLLPROXY_COMBOCOLLMETASOF = '[ComboCollProxy.comboCollMetasOf]',
  COMBOCOLLPROXY_APPROVE = '[ComboCollProxy.approve]',
  COMBOCOLLPROXY_AUTHORITIESOF = '[ComboCollProxy.authoritiesOf]',

  // Indexer
  INDEXER_ADDGASPRICETOOPTIONS = '[Indexer.addGasPriceToOptions]',
  INDEXER_LOADCONTRACT = '[Indexer.loadContract]',
  INDEXER_REGISTERCOLLECTIONS = '[Indexer.registerCollections]',
  INDEXER_GETUUID = '[Indexer.getUUID]',
  INDEXER_ROOTCOMBOOFTOKENS = '[Indexer.rootComboOfTokens]',
  INDEXER_ROOTCOMBOOFUUIDS = '[Indexer.rootComboOfUUIDs]',
  INDEXER_TOKENSOF = '[Indexer.tokensOf]',

  // Vault
  VAULT_ADDGASPRICETOOPTIONS = '[Vault.addGasPriceToOptions]',
  VAULT_LOADCONTRACT = '[Vault.loadContract]',
  VAULT_CLAIM = '[Vault.claim]',
  VAULT_CLAIMTARGET = '[Vault.claimTarget]',
  VAULT_CLAIMABLESOFCOLLECTIONS = '[Vault.claimablesOfCollections]',
  VAULT_CLAIMABLESOFCOLLECTIONSTARGET = '[Vault.claimablesOfCollectionsTarget]',
  VAULT_CLAIMABLESOFRECEIVERS= '[Vault.claimablesOfReceivers]',
  VAULT_CLAIMABLESOFRECEIVERSTARGET= '[Vault.claimablesOfReceiversTarget]',

  // SetManager
  SETMANAGER_ADDGASPRICETOOPTIONS = '[SetManager.addGasPriceToOptions]',
  SETMANAGER_LOADCONTRACT = '[SetManager.loadContract]',
  SETMANAGER_TOTALSET = '[SetManager.totalSet]',
  SETMANAGER_INITCOLLECTIONTYPE = '[SetManager.initCollectionTypes]',
  SETMANAGER_CREATESET = '[SetManager.createSet]',
  SETMANAGER_ADDCOLLECTIONS = '[SetManager.addCollections]',
  SETMANAGER_CHANGECATEGORY = '[SetManager.changeCategoriesForCollections]',
  SETMANAGER_ADDCATEGORIES = '[SetManager.addCategories]',
  SETMANAGER_RENAMESET = '[SetManager.renameSet]',
  SETMANAGER_RENAMECATEGORY = '[SetManager.renameCategroy]',
  SETMANAGER_COLLECTIONTYPESOF = '[SetManager.collectionTypesOf]',
  SETMANAGER_GETSETS = '[SetManager.getSets]',
  SETMANAGER_SETIDSOFCREATOR = '[SetManager.setIdsOfCreator]',
  SETMANAGER_COLLECTIONSOF = '[SetManager.collectionsOf]',
  SETMANAGER_VERIFYCOLLECTIONINSET = '[SetManager.verifyCollectionInSet]',
  SETMANAGER_ISSETCONTAINSALLCOLLECTIONS = '[SetManager.isSetContainsAllCollections]',

  // BaseERC721
  BASEERC721_ADDGASPRICETOOPTIONS = '[BaseERC721.addGasPriceToOptions]',
  BASEERC721_TRANSFER = '[BaseERC721.transfer]',
  BASEERC721_SETAPPROVALFORALL = '[BaseERC721.setApprovalForAll]',
  BASEERC721_APPROVETRANSFER = '[BaseERC721.approveTransfer]',
  BASEERC721_RENOUNCEOWNERSHIP = '[BaseERC721.renounceOwnership]',
  BASEERC721_TOKEN_URI = '[BaseERC721.tokenURI]',

  // BaseERC1155
  BASEERC1155_ADDGASPRICETOOPTIONS = '[BaseERC1155.addGasPriceToOptions]',
  BASEERC1155_SAFETRANSFERFROM = '[BaseERC1155.safeTransferFrom]',
  BASEERC1155_SAFEBATCHTRANSFERFROM = '[BaseERC1155.safeBatchTransferFrom]',
  BASEERC1155_SETAPPROVALFORALL = '[BaseERC1155.setApprovalForAll]',
  BASEERC1155_ISAPPROVEDFORALL = '[BaseERC1155.isApprovedForAll]',
  BASEERC1155_URI = '[BaseERC1155.uri]',
  BASEERC1155_BALANCEOF = '[BaseERC1155.balanceOf]',
  BASEERC1155_BALANCEOFBATCH = '[BaseERC1155.balanceOfBatch]',

  // HasAccessControl
  HASACCESSCONTROL_ADDADMIN = '[HasAccessControl.addAdmin]',
  HASACCESSCONTROL_RENOUNCEADMIN = '[HasAccessControl.renounceAdmin]',
  HASACCESSCONTROL_REMOVEADMIN = '[HasAccessControl.removeAdmin]',
  HASACCESSCONTROL_ISADMIN = '[HasAccessControl.isAdmin]',
  HASACCESSCONTROL_ADDMINTER = '[HasAccessControl.addMinter]',
  HASACCESSCONTROL_RENOUNCEMINTER = '[HasAccessControl.renounceMinter]',
  HASACCESSCONTROL_REMOVEMINTER = '[HasAccessControl.removeMinter]',
  HASACCESSCONTROL_ISMINTER = '[HasAccessControl.isMinter]',
  HASACCESSCONTROL_RENOUNCEOWNERSHIP = '[HasAccessControl.renounceOwnership]',
  // HasRoyalty
  HASROYALTY_SETROYALTIES = '[HasRoyalty.setRoyalties]',
  HASROYALTY_ROYALTYINFO = '[HasRoyalty.royaltyInfo]',

  // SDK
  SDK_CONSTRUCTOR = '[SDK.constructor]',
  SDK_DEPLOY = '[SDK.deploy]',
  SDK_LOADCONTRACT = '[SDK.loadContract]',
  SDK_GETCONTRACTMETADATA = '[SDK.getContractMetadata]',
  SDK_GETNFTS = '[SDK.getNFTs]',
  SDK_GETNFTSFORCOLLECTION = '[SDK.getNFTsForCollection]',
  SDK_GETTOKENMETADATA = '[SDK.getTokenMetadata]',
  SDK_GETSTATUS = '[SDK.GetStatus]',
  SDK_STOREFILE = '[SDK.storeFile]',
  SDK_STOREMETADATA = '[SDK.storeMetadata]',
  SDK_CREATEFOLDER = '[SDK.createFolder]',
  SDK_GETTRANSFERSBYBLOCKNUMBER = '[SDK.getTransfersByBlockNumber]',
  SDK_GET_TRANSFERS_BY_WALLET = '[SDK.getNftTransfersByWallet]',
  SDK_GETTRANSFERSBYBLOCKHASH = '[SDK.getTransfersByBlockHash]',
  SDK_GET_TRANSFERS_FROM_BLOCK_TO_BLOCK = '[SDK.getTransferFromBlockToBlock]',
  SDK_GET_TRANSFERS_BY_TOKEN_ID = '[SDK.getTransfersByTokenId]',
  SDK_GET_TRANSFERS_BY_CONTRACT = '[SDK.getTransfersByContractAddress]',
  SDK_GET_OWNERS_BY_TOKEN_ADDRESS = '[SDK.getOwnersByTokenAddress]',
  SDK_GET_OWNERS_BY_TOKEN_ADDRESS_AND_TOKEN_ID = '[SDK.getOwnersbyTokenAddressAndTokenId]',
  SDK_GET_COLLECTION_BY_WALLET = '[SDK.getCollectionsByWallet]',
  SDK_GET_SEARCH_NFT = '[SDK.searchNfts]',

  SDK_GET_LOWEST_TRADE_PRICE = '[SDK.getLowestTradePrice]',

  // Metadata
  METADATA_TOKEN_CREATION = '[Metadata.tokenLevelMetadata]',
  METADATA_CONTRACT_CREATION = '[Metadata.contractLevelMetadata]',
  METADATA_FREE_CREATION = '[Metadata.freeLevelMetadata]',

  // Utils
  UTILS_PREPARE_POLYGON_TX = '[Utils.preparePolygonTransaction]',

  // MintComboBuilder
  COMBOMINTOREDITBUILDER_BUILD = '[ComboMintOrEditBuilder.build]',
  COMBOMINTOREDITBUILDER_ADDNFT = '[ComboMintOrEditBuilder.addNFT]',

  // ComboRuleBuilder
  COMBORULEBUILDER_BUILD = '[ComboRuleBuilder.build]',
  COMBORULEBUILDER_ADDCOLLECTIONRULE = '[ComboRuleBuilder.addCollectionRule]',
  COMBORULEBUILDER_ADDSETRULE = '[ComboRuleBuilder.addSetRule]',
}

export enum ErrorMessage {
  invalid_auth_instance = 'Invalid Auth instance.',

  no_pk_or_provider = 'PrivateKey or provider missing!',
  no_parameters_supplied = 'No parameters supplied.',
  no_template_type_supplied = 'No template type supplied.',
  no_tokenId_or_not_valid = 'No tokenId supplied or not valid.',
  no_maxSupply_or_not_valid = 'No maxSupply supplied or not valid.',
  no_uuid_or_not_valid = 'No uuid supplied or not valid.',
  no_setId_or_not_valid = 'No setId supplied or not valid.',
  no_tokenURI_supplied = 'No tokenURI supplied.',
  no_projectId_supplied = 'No project id supplied.',
  no_secretId_supplied = 'No secret id supplied.',
  no_chainId_supplied = 'No chain id supplied.',
  no_signer_instance_supplied = 'No signer instance supplied.',
  no_name_supplied = 'No name supplied.',
  no_symbol_supplied = 'No symbol supplied.',
  no_contractURI_supplied = 'No contractURI supplied.',
  no_baseURI_supplied = 'No baseURI supplied.',
  no_address_supplied = 'No address supplied.',
  no_sell_price_supplied_or_not_valid = 'No sell price supplied or not valid.',
  no_to_address = 'No "to" address supplied',
  no_rpcURL = 'No rpcURL supplied',
  no_privateKey = 'No privateKey supplied',
  no_provider = 'No provider supplied',
  no_base_url = 'No baseURL supplied',
  no_api_key = 'No API Key supplied',

  invalid_contract_address = 'Invalid contract address.',
  invalid_receiver_address = 'Invalid receiver address.',
  invalid_account_address = 'Invalid account address.',
  invalid_public_address = 'Invalid public address.',
  invalid_from_address = 'Invalid "from" address.',
  invalid_to_address = 'Invalid "to" address.',
  invalid_contractURI = 'Invalid contractURI.',
  invalid_baseURI = 'Invalid baseURI.',
  invalid_template = 'Invalid template.',
  invalid_transaction_hash = 'Invalid transaction hash.',
  invalid_provider = 'Invalid provider.',
  invalid_gas_price_supplied = 'Invalid value for gas provided',
  invalid_max_supply = 'Invalid maximum supply.',
  invalid_max_token_request = 'Invalid maximum token request.',
  invalid_price = 'Invalid price',
  invalid_mint_quantity = 'Quantity as integer value greater than 0 required.',
  different_array_lengths = 'IDs and quantities arrays must be of same length',
  invalid_quantity = 'Quantity as integer value greater than 0 required.',
  invalid_block = 'Invalid block number',
  invalid_token_address = 'Invalid token address',
  invalid_search_string = 'Invalid search query.',

  warning_contractURI = 'WARNING: The supplied ContractURI is not a link.',
  warning_contractURI_tips = 'WARNING: ContractURI should be a public link to a valid JSON metadata file',
  warning_tokenURI = 'WARNING: The supplied TokenURI is not a link.',
  warning_tokenURI_tips = 'WARNING: TokenURI should be a public link to a valid JSON metadata file',

  warning_baseURI = 'WARNING: The supplied BaseURI is not a link.',
  warning_baseURI_tips = 'WARNING: BaseURI should be a public link to a valid JSON metadata file',

  contract_already_deployed = 'Contract already deployed.',
  contract_already_loaded = 'Contract already loaded.',
  contract_not_deployed = 'Contract not deployed.',
  contract_not_deployed_or_loaded = 'Contract not deployed or loaded.',
  contract_uri_not_defined = 'ContractURI is not defined.',

  fee_must_be_between_0_and_10000 = 'Fee must be between 0 and 10000.',

  tokenId_must_be_integer = 'TokenId must be integer.',
  amount_must_be_integer = 'Amount must be integer.',
  approvalStatus_must_be_boolean = 'approvalStatus must be boolean.',
  only_privateKey_or_provider_required = 'Only privateKey or provider required',
  chain_not_supported = 'Chain not supported.',
  chain_not_supported_write_operations = 'Chain not supported for WRITE operations yet.',
  axios_error = 'An Axios error occured',
  ethers_error = 'An Ethers error occured',

  no_infura_projectID_supplied = 'No projectId supplied.',
  no_infura_projectSecret_supplied = 'No projectSecret supplied.',

  unexisting_file = 'The file does not exists',
  an_error_occured_with_ipfs_api = 'An error occured with infura ipfs api',
  array_should_not_be_empty = 'The Array can not be empty',
  invalid_ipfs_setup = 'invalid ipfs setup',
  data_must_be_string = 'data must be a string',
  data_must_be_valid_json = 'data must be a valid json',
  invalid_ids = 'List of IDs provided cannot be empty',
  unsupported_provider = 'unsupported provider',
  invalid_block_number = 'Invalid block number.',
  invalid_block_hash = 'Invalid block hash.',

  array_length_mismatched = 'Array length mismatched',
  invalid_page_param = 'Invalid page number or page size',
  empty_name = 'Empty name',
  invalid_category_id = 'Invalid category id',
  invalid_set_id = 'Invalid set id',
  invalid_amount = 'Invalid amount',
  already_finalized = 'Already_finalized',
  invalid_rule_param = 'Invalid rule param',
  duplicate_collection_rules = 'Duplicate collection rules',
  duplicate_set_rules = 'Duplicate set rules',
}

export class Logger {
  version: string;

  static code = ErrorCode;

  static location = ErrorLocation;

  static message = ErrorMessage;

  constructor(_version: string) {
    Object.defineProperties(this, {
      version: {
        enumerable: true,
        value: _version,
        writable: false,
      },
    });
  }

  makeError(message: string, code?: ErrorCode, params?: any): string {
    const optCode = !code ? Logger.code.RUNTIME : code;
    const optParams = !params ? {} : params;
    const messageDetails: Array<string> = [];

    Object.keys(optParams).forEach(key => {
      const value = optParams[key];
      try {
        messageDetails.push(`${key}=${JSON.stringify(value)}`);
      } catch (error) {
        messageDetails.push(`${key}=${JSON.stringify(optParams[key].toString())}`);
      }
    });
    messageDetails.push(`code=${optCode}`);
    messageDetails.push(`version=${this.version}`);

    let errorMsg = message;

    if (messageDetails.length) {
      errorMsg += ` (${messageDetails.join(', ')})`;
    }
    return errorMsg;
  }

  throwError(message: string, code?: ErrorCode, params?: any): never {
    throw Error(this.makeError(message, code, params));
  }

  throwArgumentError(message: string, name: string, value: any, ...params: any): never {
    const addedParams = params;
    addedParams[0].argument = name;
    addedParams[0].value = value;
    return this.throwError(message, Logger.code.INVALID_ARGUMENT, ...addedParams);
  }

  throwMissingArgumentError(message?: string, ...params: any): void {
    return this.throwError(`missing argument: ${message}`, Logger.code.MISSING_ARGUMENT, ...params);
  }

  throwTooManyArgumentError(message?: string, ...params: any): void {
    return this.throwError(
      `too many arguments: ${message}`,
      Logger.code.UNEXPECTED_ARGUMENT,
      ...params,
    );
  }
}

export const log = new Logger(version);