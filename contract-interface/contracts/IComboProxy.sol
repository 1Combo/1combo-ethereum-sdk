// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import {Ingredients, CollectionItems, ComboCollMeta} from "./Structs.sol";

interface IComboProxy {
    function mint(
        address combo,
        address to,
        bool payInEther,
        string calldata hash,
        Ingredients calldata ingredients,
        CollectionItems calldata collectionItemsToBuy
    ) external payable returns (uint256, bytes32);

    function edit(
        address combo,
        uint256 comboId,
        bool payInEther,
        string calldata hash,
        Ingredients calldata ingredients,
        CollectionItems calldata collectionItemsToBuy
    ) external payable returns (bytes32);

    function dismantle(address combo, uint256 comboId) external;

    function approve(
        address combo,
        address spender,
        address[] calldata tokenAddresses,
        uint256[][] calldata tokenIds,
        uint256[][] calldata amounts
    ) external;

    function comboCollMetasOf(address[] calldata combos)
        external
        view
        returns (ComboCollMeta[] memory);
}
