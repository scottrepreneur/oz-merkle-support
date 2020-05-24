const { keccakFromString, bufferToHex } = require('ethereumjs-util');
const {ethers} = require('ethers')
let catchRevert = require("./exceptionsHelpers.js").catchRevert
const MerkleTree = require('./merkleTree.js').MerkleTree
// const { accounts, contract, web3 } = require('@openzeppelin/test-environment');
var MyContract = artifacts.require('./MyContract')
const { keccakFromString } = require('ethereumjs-util')

// const MerkleProofWrapper = artifacts.require('MerkleProofWrapper');

contract('MyContract', function(accounts) {

  const owner = accounts[0]
  const random = accounts[1]
  const redeemer = 'c'
  const addresses = ['a', 'b', 'c', 'd']

  const merkleTree = new MerkleTree(addresses);
  const root = merkleTree.getHexRoot();
  //console.log(root)
  const proof = merkleTree.getHexProof(redeemer);
  //console.log(proof)

  // Before Each
  beforeEach(async () => {
    this.merkleProof = await MyContract.new()
  })

  describe("Functions", () => {

    describe("claim()", async () => {

      it("check redeemer account via MerkleProof verify()", async () => {
        const leaf = keccakFromString('c');
        const result = await this.merkleProof.claim(proof, root, leaf)
        assert.isTrue(result, "MerkleProof not working")
      })
    })
  })
})
