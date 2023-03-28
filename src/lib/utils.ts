import { BigNumber, ethers } from 'ethers';
import { ChainUrls } from './Auth/availableChains';
import { Logger, log, ErrorLocation } from './Logger';
import { MAX_UINT128, MAX_UINT32 } from './constants';

type FormatRpcUrlOptions = {
  chainId: number;
  projectId: string;
};

export const isBoolean = (val: boolean | object): boolean =>
  typeof val === 'boolean' ||
  (typeof val === 'object' && val !== null && typeof val.valueOf() === 'boolean');

export const isValidString = (variable: string | undefined): boolean =>
  variable !== undefined && variable !== null && variable !== '' && typeof variable === 'string';

export const isDefined = (variable: string | number | undefined): boolean =>
  variable !== undefined && variable !== null && variable !== '';

export const isDefinedAny = (variable: any): boolean =>
  variable !== undefined && variable !== null;

export const isURI = (URI: string): boolean => !!URI.match(/^(ipfs|http|https):\/\//gi);

export const formatRpcUrl = ({ chainId, projectId }: FormatRpcUrlOptions) =>
  `${ChainUrls[chainId]}/v3/${projectId}`;

export const isJson = (param: string) => {
  if (typeof param !== 'string') return false;
  try {
    JSON.parse(param);
  } catch (err) {
    return false;
  }
  return true;
};

// eslint-disable-next-line no-promise-executor-return
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const addGasPriceToOptions = (options: any, gas: string | undefined, location: ErrorLocation) => {
  const newOptions = options;
  if (gas) {
    if (typeof parseFloat(gas) !== 'number') {
      log.throwArgumentError(Logger.message.invalid_gas_price_supplied, 'gas', gas, {
        location: location,
      });
    }
    try {
      newOptions.gasPrice = ethers.utils.parseUnits(gas, 'gwei');
    } catch (error) {
      return log.throwError(Logger.message.ethers_error, Logger.code.NETWORK, {
        location: location,
        error,
      });
    }
  }
  return newOptions;
};

export const isValidPrice = (str: string) => {
  if (typeof str !== 'string') return false;
  if (parseFloat(str) < 0) return false;
  return !Number.isNaN(str) && !Number.isNaN(parseFloat(str));
};

export const isValidPositiveNumber = (n: number) => {
  if (n <= 0) return false;
  return !Number.isNaN(n);
};

export const isValidUUID = (v: string | number) => {
  if (!isDefined(v)) return false;
  const uuid = BigNumber.from(v);
  return !(uuid.isNegative() || uuid.gt(MAX_UINT128));
};

export const isValidSetId = (v: string | number) => {
  if (!isDefined(v)) return false;
  const setId = BigNumber.from(v);
  return !(setId.isNegative() || setId.gt(MAX_UINT32));
};

export const isValidNonNegInteger = (n: number | string) => {
  const v = BigNumber.from(n);
  return !v.isNegative();
};

export const isAllValidAddress = (value: string | Array<string>) => {
  if (!isDefinedAny(value)) {
    return false;
  }
  if (typeof value === 'string') {
    return ethers.utils.isAddress(value);
  } else {
    if (value.length == 0) {
      return false;
    }
    for (let v of value) {
      if (!isDefinedAny(v) || !ethers.utils.isAddress(v)) {
        return false;
      }
    }
    return true;
  }
};

export const isAllValidNonNegInteger = (value: number | string | Array<number | string> | Array<Array<number | string>>) => {
  if (!isDefinedAny(value)) {
    return false;
  }
  if (typeof value === 'number' || typeof value === 'string') {
    return isValidNonNegInteger(value);
  }
  if (value.length == 0) {
    return false;
  }
  for (let v of value) {
    if (!isDefinedAny(v)) {
      return false;
    }
    if (typeof v === 'number' || typeof v === 'string') {
      if (!isValidNonNegInteger(v)) {
        return false;
      }
    } else {
      for (let vv of v) {
        if (!isDefinedAny(vv) || !isValidNonNegInteger(vv)) {
          return false;
        }
      }
    }
  }
  return true;
};