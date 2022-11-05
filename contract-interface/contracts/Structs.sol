// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

struct CollectionMeta {
    address creator;
    uint256 claimable;
}

struct CollectionItems {
    address[] collections;
    uint256[][] tokenIds;
    uint256[][] amounts;
}

struct Ingredients {
    address[] collections;
    uint256[][] itemsForCollections;
    uint128[][] amountsForItems;
    uint64[][] setsForItems;
}

struct ComboCollMeta {
    uint256 price;
    address creator;
    address locker;
    address authority;
}

struct Factor {
    uint128 max;
    uint128 min;
    address collection;
    uint64 setId;
    bool lock;
}

struct Limit {
    address collection;
    uint128 maxTokenUsage;
}

struct ComboRules {
    Factor[] factors;
    Limit[] limits;
}

struct Item {
    uint256 uuid;
    uint128 amount;
    uint64 setId;
    uint8 typ;
    bool lock;
    bool limit;
}

struct ComboMeta {
    address creator;
    Item[] items;
}
