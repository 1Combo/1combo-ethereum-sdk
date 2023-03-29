import { randomBytes } from 'crypto';
import { SDK } from '../../src/lib/SDK/sdk';

export const generateTestPrivateKeyOrHash = (): string => {
  return `0x${randomBytes(32).toString('hex')}`;
};

export const getGas = async (sdk: SDK) => {
  return (parseFloat(await sdk.getGasPrice()) + 5).toString();
}