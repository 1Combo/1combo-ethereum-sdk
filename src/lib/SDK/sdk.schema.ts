import * as Joi from 'joi';
import { TEMPLATES } from './constants';

export const deployOptions = Joi.object({
  template: Joi.string().valid(...Object.values(TEMPLATES)),
  params: Joi.object({
    name: Joi.string().required(),
    symbol: Joi.string().required(),
    contractURI: Joi.string()
      .uri({
        scheme: ['ipfs', /https?/],
      })
      .required(),
    gas: Joi.string().optional(),
  }),
}).required();

export const loadContractOptions = Joi.object({
  templateName: Joi.string().valid(...Object.values(TEMPLATES)),
  contractAddress: Joi.string().required(),
}).required();
