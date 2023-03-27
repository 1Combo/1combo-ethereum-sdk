import { BigNumber as BN } from 'ethers';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const GAS_LIMIT = 6000000;
export const MAX_UINT128 = BN.from(1).shl(128).sub(BN.from(1));
export const MAX_UINT32 = (1<<32) - 1;
export const MAX_UINT64 = (1<<64) - 1;