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
    CollectionFactory: '0xc2e663385B88622c405E62109b33F9B579B5F3c1',
    CollectionProxy: '0xC45CBc72b275Ee6Ff54d25bf422B36103CFAd0B4',
    ComboCollProxy: '0x4B07E79dF97915B9011EB9DC9533B4198977c01e',
    ComboCollFactory: '0x0Cef41C2040313530c796075e46037Ea16fbDEE5',
    Indexer: '0x6B2FbbC209f2ccB4542202ed6f66e46405c8D48A',
    Vault: '0x403fA0E300CB9a79443Fa1B26b01B575534f0CaC',
    SetManager: '0x27610F7713455dA132339338f5d722D9D325A199',
    Accounting: '0xdCb4fD99Eee6040A5a55453c7e8f8Ea73729a1e5',
  },
};