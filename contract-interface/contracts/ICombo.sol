// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import {ComboRules, ComboMeta} from "./Structs.sol";

interface ICombo {
    function getComboRules() external view returns (ComboRules memory);
    function getLimitedTokenUsages(uint256[] calldata uuids)
        external
        view
        returns (uint256[] memory);

    function comboMetasOf(uint256[] calldata comboIds)
        external
        view
        returns (ComboMeta[] memory);
}