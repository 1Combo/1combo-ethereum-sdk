import Auth from './lib/Auth/Auth';
import { AuthOptions } from './lib/Auth/Auth';

import Collection from './lib/ContractTemplates/Collection';
import CollectionFactory from './lib/ContractTemplates/CollectionFactory';
import CollectionProxy from './lib/ContractTemplates/CollectionProxy';
import ComboCollCore from './lib/ContractTemplates/ComboCollCore';
import ComboCollFactory from './lib/ContractTemplates/ComboCollFactory';
import ComboCollProxy from './lib/ContractTemplates/ComboCollProxy';
import Indexer from './lib/ContractTemplates/Indexer';
import SetManager from './lib/ContractTemplates/SetManager';
import Vault from './lib/ContractTemplates/Vault';

export * from './lib/SDK/sdk';
export { TEMPLATES, CONTRACT_ADDRESSES } from './lib/SDK/constants';
export {
    Auth,
    AuthOptions,
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
export { ComboRuleBuilder, ComboMintOrEditBuilder } from './lib/param-builders';