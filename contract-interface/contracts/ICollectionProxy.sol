// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import {CollectionItems, CollectionMeta} from "./Structs.sol";

interface ICollectionProxy {
    function mint(
        address to,
        bool payInEther,
        CollectionItems calldata items
    ) external payable returns (uint256[] memory);

    function collectionMetasOf(address[] calldata collections)
        external
        view
        returns (CollectionMeta[] memory);
}
