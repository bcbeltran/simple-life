// const assert = require('assert');
// const SimpleLife = artifacts.require("SimpleLife");

// contract("SimpleLife", (accounts) => {
//     let simpleLife;

//     beforeEach(async () => {
//         simpleLife = await SimpleLife.deployed();
//     });

//     it('Create a new SimpleLife contract with given owner and power of attorney', async () => {
//         const owner = await simpleLife.owner();
//         const powerOfAttorney = await simpleLife.powerOfAttorney();
//         // console.log("owner address: ", owner);
//         // console.log("power of attorney address: ", powerOfAttorney);
//         assert.equal(owner, accounts[0]);
//         assert.equal(powerOfAttorney, accounts[1]);
//     });

//     it('Allow owner to add funds', async () => {
//         await simpleLife.addFunds({value: "1000000000000000000"});
//         const contractValue = await simpleLife.insuranceValue();
//         //console.log("contract value: ", contractValue.toString());
//         assert.equal(contractValue, "1000000000000000000");
//     });
    
//     it('Allow owner to add inheritor', async () => {
//         await simpleLife.addInheritor(accounts[2], "1000000000000000000");
//         const inheritor = await simpleLife.inheritorWallets(0);
//         //console.log("inheritor wallet address: ", inheritor);
//         assert.equal(inheritor, accounts[2]);
//     });

//     it('Allow owner to decrease the inheritance amount', async () => {
//         const beforeAdjustment = await simpleLife.inheritanceAmount(accounts[2]);
//         //console.log("before amount: ", beforeAdjustment.toString());
//         await simpleLife.decreaseInheritanceAmount(
//             accounts[2],
// 			"500000000000000000"
//             );
//         const afterAdjustment = await simpleLife.inheritanceAmount(accounts[2]);
//         //console.log("after adjustment: ", afterAdjustment.toString());
//         assert.equal(beforeAdjustment, "1000000000000000000");
//         assert.equal(afterAdjustment, "500000000000000000");
//     });

//     it('Allow owner to increase the inheritance amount', async () => {
//         const beforeAdjustment = await simpleLife.inheritanceAmount(accounts[2]);
//         //console.log("before amount: ", beforeAdjustment.toString());
//         await simpleLife.increaseInheritanceAmount(
//             accounts[2],
// 			"500000000000000000"
//             );
//         const afterAdjustment = await simpleLife.inheritanceAmount(accounts[2]);
//         //console.log("after adjustment: ", afterAdjustment.toString());
//         assert.equal(beforeAdjustment, "500000000000000000");
//         assert.equal(afterAdjustment, "1000000000000000000");
//     });

//     it('Allow power of attorney to close contract and distribute funds', async () => {
//         await simpleLife.addFunds({ value: "1000000000000000000" });
//         const contractBalanceBefore = await simpleLife.insuranceValue();
//         //console.log('contract value before: ', contractBalanceBefore.toString());

//         const poaBalanceBeforeClose = await web3.eth.getBalance(accounts[1]);
// 		//console.log("poa balance before: ", poaBalanceBeforeClose);

//         const balanceBeforeClose = await web3.eth.getBalance(accounts[2]);
//         //console.log("account 2 balance before: ", balanceBeforeClose);

//         await simpleLife.isDead({from: accounts[1]});

//         const contractBalanceAfter = await simpleLife.insuranceValue();
// 		//console.log("contract value after: ", contractBalanceAfter.toString());

//         const balanceAfterClose = await web3.eth.getBalance(accounts[2]);
//         //console.log("account 2 balance after: ", balanceAfterClose);

//         const poaBalanceAfterClose = await web3.eth.getBalance(accounts[1]);
// 		//console.log("poa balance after: ", poaBalanceAfterClose);

//         const finalInheritorBalance = balanceAfterClose.toString() - balanceBeforeClose.toString();
//         //console.log('final inheritor balance: ', finalInheritorBalance);
//         assert.equal(finalInheritorBalance, "1000000000000000000");

//         const finalPoaBalance = poaBalanceAfterClose.toString() - poaBalanceBeforeClose.toString();
//         //console.log('final poa balance: ', finalPoaBalance);
//         assert(finalPoaBalance > "900000000000000000");
//     });

// });