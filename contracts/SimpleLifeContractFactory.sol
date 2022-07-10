//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract SimpleLifeContractFactory {

    SimpleLife[] public simpleLifeContracts;

    function createContract(address payable _powerOfAttorney) payable public {
        SimpleLife newSimpleLifeContract = new SimpleLife( payable (msg.sender), _powerOfAttorney);
        simpleLifeContracts.push(newSimpleLifeContract);
    }

    function getSimpleLifeContracts() public view returns(SimpleLife[] memory) {
        return simpleLifeContracts;
    }

}

contract SimpleLife {
    address public owner;
    uint256 public totalInheritanceValue;
    uint256 public valueDeployed;
    uint256 public totalInheritors;
    address payable [] public inheritorWallets;
    address payable public powerOfAttorney;
    mapping(address => uint256) public inheritanceAmount;
    bool public isActive;

    constructor(address payable _owner, address payable _powerOfAttorney) {
        require(_powerOfAttorney != _owner, "Power of attorney can't be the owner of the contract.");
        owner = _owner;
        powerOfAttorney = _powerOfAttorney;
        isActive = true;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only the owner of this contract can do this");
        _;
    }

    modifier onlyPowerOfAttorney {
        require(msg.sender == powerOfAttorney, "Only the power of attorney can execute this function");
        _;
    }

    modifier checkIsActive {
        require(isActive, "This contract is no longer active.");
        _;
    }

    function addFunds() public payable checkIsActive onlyOwner {
        totalInheritanceValue += msg.value;
    }

    function addInheritor(address payable _inheritor, uint256 _amount) public checkIsActive onlyOwner {
        require(((totalInheritanceValue - valueDeployed) - _amount) >= 0, "There aren't enough funds in contract. Please add more before adding inheritor or reduce amount.");
        inheritorWallets.push(_inheritor);
        inheritanceAmount[_inheritor] += _amount;
        valueDeployed += _amount;
        totalInheritors += 1;
    }

    function decreaseInheritanceAmount(address _inheritor, uint256 _amount) public checkIsActive onlyOwner {
        require((inheritanceAmount[_inheritor] - _amount) >= 0, "You can't decrease the amount below zero");
        inheritanceAmount[_inheritor] -= _amount;
        valueDeployed -= _amount;
    }

    function increaseInheritanceAmount(address _inheritor, uint256 _amount) public checkIsActive {
        require(((totalInheritanceValue - valueDeployed) - _amount) >= 0, "There aren't enough funds in contract. Please add more before increasing inheritors amount.");
        inheritanceAmount[_inheritor] += _amount;
        valueDeployed += _amount;
    }

    function isDead() public payable checkIsActive onlyPowerOfAttorney {
        valueDeployed = totalInheritanceValue;
        for(uint256 i = 0; i < inheritorWallets.length; i++) {
            (bool success, ) = inheritorWallets[i].call{value: inheritanceAmount[inheritorWallets[i]]}("");
            require(success, "Transfer failed.");
        }
        totalInheritanceValue = 0;
        (bool success, ) = powerOfAttorney.call{value: address(this).balance}("");
            require(success, "Transfer failed.");
        isActive = false;
    }

}