// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import {ComboRules} from "./Structs.sol";

interface IComboFactory {
    function createCombo(
        string calldata name_,
        string calldata symbol_,
        string calldata metaHash_,
        uint256 mintFee_,
        ComboRules calldata rules_
    ) external;
}
