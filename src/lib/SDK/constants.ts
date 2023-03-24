import ComboCollCore from '../ContractTemplates/ComboCollCore';

const NFT_API_URL = process.env.NFT_API_URL ? process.env.NFT_API_URL : 'https://nft.api.infura.io';
export { NFT_API_URL };

export enum TEMPLATES {
  ComboCollCore = 'ComboCollCore',
}

export const classes = {
  ComboCollCore,
};