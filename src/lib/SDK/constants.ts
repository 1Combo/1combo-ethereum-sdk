import Authority from '../ContractTemplates/Authority';
import Collection from '../ContractTemplates/Collection';
import CollectionFactory from '../ContractTemplates/CollectionFactory';
import CollectionProxy from '../ContractTemplates/CollectionProxy';
import ComboCollCore from '../ContractTemplates/ComboCollCore';
import ComboCollFactory from '../ContractTemplates/ComboCollFactory';
import ComboCollProxy from '../ContractTemplates/ComboCollProxy';
import Indexer from '../ContractTemplates/Indexer';
import SetManager from '../ContractTemplates/SetManager';
import Vault from '../ContractTemplates/Vault';

const NFT_API_URL = process.env.NFT_API_URL ? process.env.NFT_API_URL : 'https://nft.api.infura.io';
export { NFT_API_URL };

export enum TEMPLATES {
  Authority = 'Authority',
  Collection = 'Collection',
  CollectionFactory = 'CollectionFactory',
  CollectionProxy = 'CollectionProxy',
  ComboCollCore = 'ComboCollCore',
  ComboCollFactory = 'ComboCollFactory',
  ComboCollProxy = 'ComboCollProxy',
  Indexer = 'Indexer',
  SetManager = 'SetManager',
  Vault = 'Vault',
}

export const classes = {
  // Authority,
  Collection,
  CollectionFactory,
  CollectionProxy,
  ComboCollCore,
  ComboCollFactory,
  ComboCollProxy,
  Indexer,
  SetManager,
  Vault,
};

export const CONTRACT_ADDRESSES = {
  MAINNET: {
    CollectionFactory: '',
    CollectionProxy: '',
    ComboCollProxy: '',
    ComboCollFactory: '',
    Indexer: '',
    Vault: '',
    SetManager: '',
  },
  GOERLI: {
    CollectionFactory: '',
    CollectionProxy: '',
    ComboCollProxy: '',
    ComboCollFactory: '',
    Indexer: '',
    Vault: '',
    SetManager: '',
  },
};