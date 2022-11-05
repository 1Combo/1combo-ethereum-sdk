const Web3 = require("web3");
const got = require("got");
const fs = require("fs");
const path = require("path");

const ParamBuilders = require("./params-builders.js");
const { exit } = require("process");
const ABI = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../abi/ABI.json")));
const COMBO_PROXY_ADDRESS = "0x3A7c3955573CdF0Fb6FcAD8DD5115Eb1B81Ca4D8";
const COLLECTION_PROXY_ADDRESS = "0xc14202310c1A601004b3243a54568726D31Ea5ed";

const ENDPOINT_GOERLI = "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";

const RETURN_OK = 0;


function encode(queryParams) {
    if (Object.keys(queryParams).length > 0) {
        const arr = [];
        for (const [key, value] of Object.entries(queryParams)) {
            arr.push(`${key}=${value}`);
        }
        return arr.join('&');
    } else {
        return '';
    }
}

var Client = function() {
    this.web3 = new Web3(ENDPOINT_GOERLI);
    // this.comboProxy = new this.web3.eth.Contract(ABI.IComboProxy, COMBO_PROXY_ADDRESS);
    // this.collectionProxy = new this.web3.eth.Contract(ABI.ICollectionProxy, COLLECTION_PROXY_ADDRESS);
};

/**
 * 
 * @param {*} user Required, wallet address.
 * @param {*} pageSize Optional, default 50.
 * @param {*} filterCollection Optional, filter by collection address
 * @returns 
 * {
 *     data: {
 *         nfts: [],    // non-addon NFTs
 *         addons: []   // addon NFTs
 *     },
 *     info: {
 *         total_addon: <number>,
 *         total_nft: <number>,
 *     }
 * }
 */
Client.prototype.getOwnedNFTByAccount = async function(user, pageSize, filterCollection) {
    let url = `https://testnet.1combo.io/api/nft/owned/${user}`;
    const params = {};
    if (pageSize > 0) {
        params.size = pageSize;
    }

    if (filterCollection != '') {
        if (!this.web3.utils.isAddress(filterCollection)) {
            throw new Error('Invalid collection address');
        }
        params.contract = filterCollection;
    }
    
    const paramsStr = encode(params);
    if (paramsStr !== '') {
        url = `${url}?${paramsStr}`;
    }

    const json = await got(url).json();
    if (json.code.code == RETURN_OK) {
        return {
            data: {
                nfts: json.data.nfts,
                addons: json.data.accessories,
            },
            info: {
                total_nft: json.info.total_nft,
                total_addon: json.info.total_accessory,
            },
        };
    } else {
        throw `Failed ${json.code.code} - ${json.code.message}`;
    }
};

/**
 * 
 * @param {*} user Required, wallet address.
 * @param {*} pageSize Optional, default 50.
 * @param {*} continuation Optional, continuation point for next page.
 * @returns 
 * {
 *     data: [{NFT},...]
 *     info: {
 *         total: <number>,
 *         continuation: ''
 *     }
 * }
 */
Client.prototype.getOwnedComboByAccount = async function(user, pageSize, continuation) {
    let url = `https://testnet.1combo.io/api/combo/owned/${user}`;
    const params = {};
    if (pageSize > 0) {
        params.size = pageSize;
    }
    if (continuation !== '') {
        params.continuation = continuation;
    }
    const paramsStr = encode(params);
    if (paramsStr !== '') {
        url = `${url}?${paramsStr}`;
    }

    const json = await got(url).json();
    if (json.code.code == RETURN_OK) {
        if (json.info['total']) {
            return {
                data: json.data,
                info: json.info,
            };
        } else {
            return {
                data: json.data,
                info: { total: 0, continuation: '' },
            };
        }
    } else {
        throw `Failed ${json.code.code} - ${json.code.message}`;
    }
};

module.exports = {
    Client,
    ParamBuilders,
    ABI,
    COMBO_PROXY_ADDRESS,
    COLLECTION_PROXY_ADDRESS,
};