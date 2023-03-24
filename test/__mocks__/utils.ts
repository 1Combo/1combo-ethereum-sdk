import { randomBytes } from 'crypto';

export const generateTestPrivateKeyOrHash = (): string => {
  return `0x${randomBytes(32).toString('hex')}`;
};
