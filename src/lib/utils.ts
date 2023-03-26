import { ethers } from 'ethers';
import { chainUrls } from './Auth/availableChains';
import { Logger, log, ErrorLocation } from './Logger';

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

export const isURI = (URI: string): boolean => !!URI.match(/^(ipfs|http|https):\/\//gi);

export const formatRpcUrl = ({ chainId, projectId }: FormatRpcUrlOptions) =>
  `${chainUrls[chainId]}/v3/${projectId}`;

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

export const isValidNonNegInteger = (n: number) => {
  return Number.isInteger(n) && n >= 0;
};

export const isAllValidAddress = (value: string | Array<string>) => {
  if (!value) {
    return false;
  }
  if (typeof value === 'string') {
    return ethers.utils.isAddress(value);
  } else {
    if (value.length == 0) {
      return false;
    }
    for (let v of value) {
      if (!v || !ethers.utils.isAddress(v)) {
        return false;
      }
    }
    return true;
  }
};

export const isAllValidNonNegInteger = (value: number | Array<number> | Array<Array<number>>) => {
  if (!value) {
    return false;
  }
  if (typeof value === 'number') {
    return isValidNonNegInteger(value);
  }
  if (value.length == 0) {
    return false;
  }
  for (let v of value) {
    if (!v) {
      return false;
    }
    if (typeof v === 'number') {
      if (!isValidNonNegInteger(v)) {
        return false;
      }
    } else {
      for (let vv of v) {
        if (!vv || !isValidNonNegInteger(vv)) {
          return false;
        }
      }
    }
  }
  return true;
};