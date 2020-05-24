/// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.6.8;

import "@openzeppelin/contracts/cryptography/MerkleProof.sol";


contract MyContract {

  /// Libraries
  using MerkleProof for bytes32[];

  constructor() public {

  }


  function claim(bytes32[] memory proof, bytes32 root, bytes32 leaf) public view returns (bool) {
    require(MerkleProof.verify(proof, root, leaf), "MerkleProof not working");
    return true;
  }
}
