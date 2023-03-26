import { BigNumber as BN } from 'ethers';

export const GAS_LIMIT = 6000000;
export const MAX_UINT128 = BN.from(1).shl(128).sub(BN.from(1));
export const MAX_UINT32 = (1<<32) - 1;

export const TEMPLATES = {
    Authority: 'Authority',
    Collection: 'Collection',
    CollectionFactory: 'CollectionFactory',
    CollectionProxy: 'CollectionProxy',
    ComboCollCore: 'ComboCollCore',
    ComboCollFactory: 'ComboCollFactory',
    ComboCollProxy: 'ComboCollProxy',
    Indexer: 'Indexer',
    SetManager: 'SetManager',
    Vault: 'Vault',
};