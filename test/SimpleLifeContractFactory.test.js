const assert = require('assert');
const SimpleLifeContractFactory = artifacts.require("SimpleLifeContractFactory");

contract("SimpleLifeContractFactory", (accounts) => {
    let factory;

    beforeEach(async () => {
        factory = await SimpleLifeContractFactory.deployed();
    });

    it('Should create a contract factory', async () => {
        const contractAddress = factory.address;
        console.log('factory contract address: ', contractAddress);
        assert(contractAddress);
    });

    it('Create new simple life contract and add it to contract array', async () => {
        await factory.createContract(accounts[1]);
        const simpleLifeAddress = await factory.getSimpleLifeContracts();
        console.log("first contract address: ", simpleLifeAddress[0]);
        assert(simpleLifeAddress[0]);
    });

    it('Create multiple simple life contracts and store them in an array', async () => {
        await factory.createContract(accounts[1]);
        await factory.createContract(accounts[2]);
        await factory.createContract(accounts[3]);
        await factory.createContract(accounts[4]);
        await factory.createContract(accounts[5]);
        await factory.createContract(accounts[6]);
        const simpleLifeAddressArray = await factory.getSimpleLifeContracts();
        console.log("contract address array length: ", simpleLifeAddressArray);
        assert.equal(simpleLifeAddressArray.length, 7);
    });
});
