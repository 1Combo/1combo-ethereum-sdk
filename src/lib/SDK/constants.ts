import Collection from '../ContractTemplates/Collection';
import CollectionFactory from '../ContractTemplates/CollectionFactory';
import CollectionProxy from '../ContractTemplates/CollectionProxy';
import ComboCollCore from '../ContractTemplates/ComboCollCore';
import ComboCollFactory from '../ContractTemplates/ComboCollFactory';
import ComboCollProxy from '../ContractTemplates/ComboCollProxy';
import Escrow from '../ContractTemplates/Escrow';
import EscrowIndexer from '../ContractTemplates/EscrowIndexer';
import UUID from '../ContractTemplates/UUID';
import Vault from '../ContractTemplates/Vault';
import SetManager from '../ContractTemplates/SetManager';

const NFT_API_URL = process.env.NFT_API_URL ? process.env.NFT_API_URL : 'https://nft.api.infura.io';
export { NFT_API_URL };

export enum TEMPLATES {
  Collection = 'Collection',
  CollectionFactory = 'CollectionFactory',
  CollectionProxy = 'CollectionProxy',
  ComboCollCore = 'ComboCollCore',
  ComboCollFactory = 'ComboCollFactory',
  ComboCollProxy = 'ComboCollProxy',
  Escrow = 'Escrow',
  EscrowIndexer = 'EscrowIndexer',
  UUID = 'UUID',
  Vault = 'Vault',
  SetManager = 'SetManager',
}

export const classes = {
  Collection,
  CollectionFactory,
  CollectionProxy,
  ComboCollCore,
  ComboCollFactory,
  ComboCollProxy,
  Escrow,
  EscrowIndexer,
  UUID,
  Vault,
  SetManager,
};

export const CONTRACT_ADDRESSES = {
  MAINNET: {
    CollectionFactory: '',
    CollectionProxy: '',
    ComboCollProxy: '',
    ComboCollFactory: '',
    EscrowIndexer: '',
    UUID: '',
    Vault: '',
    SetManager: '',
  },
  GOERLI: {
    CollectionFactory: '0x0051f27BfE2Ac4D1d0BfCF629Cd4745C206D7402',
    CollectionProxy: '0xeAeD009F8197E741CE8Beb1adF8F70FBC9BC1006',
    ComboCollProxy: '0x7F8FB4BeCD8de2532BE0b99c1d0C923dFC84cBA4',
    ComboCollFactory: '0xFd22E9AA52a93B5bA25C3C422e2b54426d42De45',
    EscrowIndexer: '0x1d8d1dD39c0180b04E981A18772e70FC3e06FdB0',
    UUID: '0x1A8177317C853f9958Bc3f56fBF5bAaFd1F60a15',
    Vault: '0x97bdef62248C650F6B4F10C56e560Bb73469C111',
    SetManager: '0x8a789B6E574231198352AF8a866523Fc0ce0B7C6',
  },
};