// import Authority from '../ContractTemplates/Authority';
import Collection from '../ContractTemplates/Collection';
import CollectionFactory from '../ContractTemplates/CollectionFactory';
import CollectionProxy from '../ContractTemplates/CollectionProxy';
import ComboCollCore from '../ContractTemplates/ComboCollCore';
import ComboCollFactory from '../ContractTemplates/ComboCollFactory';
import ComboCollProxy from '../ContractTemplates/ComboCollProxy';
import Indexer from '../ContractTemplates/Indexer';
import SetManager from '../ContractTemplates/SetManager';
import Vault from '../ContractTemplates/Vault';
import Accounting from '../ContractTemplates/Accounting';

const NFT_API_URL = process.env.NFT_API_URL ? process.env.NFT_API_URL : 'https://nft.api.infura.io';
export { NFT_API_URL };

export enum TEMPLATES {
  // Authority = 'Authority',
  Accounting = 'Accounting',
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
  Accounting,
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
    Accounting: '',
  },
  GOERLI: {
    CollectionFactory: '0x611cF1E28b6241d4147BFcD1D8F1B59A02174109',
    CollectionProxy: '0x05E386dF2409f8E8614AEAc6e77547F3c7e8F821',
    ComboCollProxy: '0xD5aBF1BeC0b3a4B9A6F06aA3FbF938dCCBeDbFc3',
    ComboCollFactory: '0x2F5ef5143a2B0f4dc0eb3aE5036646CB3B762ef5',
    Indexer: '0x3c4DB52E23705dA3106f39Aa30F02193A752c64e',
    Vault: '0xa6A0f507e0ac22d8D3e2058D21b86580091A4f62',
    SetManager: '0xd6032f186ABFde6B72d9cFFb9b877F6a012c8962',
    Accounting: '0xa7baDf76ffD647c52189bcDC3c5a3f31C735d1E0',
  },
};