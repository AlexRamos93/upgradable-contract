// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract StorageV2 {
    uint256 private _value;

    event ValueChanged(uint256 value);

    function store(uint256 value) public {
      _value = value;
      emit ValueChanged(value);
    }

    function retrieve() public view returns (uint256) {
      return _value;
    }

    // Increments the stored value by 1
    function increment() public {
      _value = _value + 1;
      emit ValueChanged(_value);
    }
}