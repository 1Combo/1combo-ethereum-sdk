import { BigNumber as BN } from 'ethers';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const GAS_LIMIT = 6000000;
export const MAX_UINT128 = BN.from(1).shl(128).sub(BN.from(1));
export const MAX_UINT32 = BN.from(1).shl(32).sub(BN.from(1));
export const MAX_UINT64 = BN.from(1).shl(64).sub(BN.from(1));