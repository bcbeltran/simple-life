import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "./App.css";
import { Loading } from "./components/Loading";
import { OwnerContracts } from "./components/OwnerContracts";
import { PoaContracts } from "./components/PoaContracts";
import { ClickedPoaContract } from "./components/ClickedPoaContract";
import { ClickedOwnerContract } from "./components/ClickedOwnerContract";
import { ClosedContract } from "./components/ClosedContract";
import tombstone from "./images/tombstone.jpg";
import ContractFactory from "./contracts/SimpleLifeContractFactory.json";
import SimpleLifeContract from "./contracts/SimpleLife.json";
const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");

function App() {
	const [account, setAccount] = useState();
	const [network, setNetwork] = useState();
	const [balance, setBalance] = useState();
	const [poa, setPoa] = useState();
	const [poaContracts, setPoaContracts] = useState([]);
	const [ownerContracts, setOwnerContracts] = useState([]);
	const [currContract, setCurrContract] = useState({});
	const [contractClicked, setContractClicked] = useState(false);
	const [addFunds, setAddFunds] = useState();
	const [amount, setAmount] = useState();
	const [increaseAmount, setIncreaseAmount] = useState();
	const [decreaseAmount, setDecreaseAmount] = useState();
	const [addInheritor, setAddInheritor] = useState();
	const [increaseInheritor, setIncreaseInheritor] = useState();
	const [decreaseInheritor, setDecreaseInheritor] = useState();
	const [contractInfo, setContractInfo] = useState({});
	const [inheritorWallets, setInheritorWallets] = useState([{}]);
	const [isLoading, setIsLoading] = useState(false);

	let simpleLifeContract;
	let contractFactoryAddress = "0x6A9761cA81F71d7CBFB1C9895a958ad93a39D33e";
	contractFactoryAddress = contractFactoryAddress.toLowerCase();
	const contractFactory = new web3.eth.Contract(
		ContractFactory.abi,
		contractFactoryAddress
	);

	async function loadAccounts() {
		let accounts = await web3.eth.requestAccounts();
		const network = await web3.eth.net.getNetworkType();
		let balance = await web3.eth.getBalance(accounts[0]);
		balance = web3.utils.fromWei(balance, "ether");
		// console.log(accounts[0]);
		// console.log(network);
		// console.log(balance);
		setNetwork(network);
		setBalance(balance);
		setAccount(accounts[0]);
	}

	async function loadOwnerContracts() {
		// console.log("Contract abi: ", ContractFactory.abi);
		// console.log("Contract address: ", contractAddress);
		let contractArray = await contractFactory.methods
			.getSimpleLifeContracts()
			.call();
		//console.log('contract factory get contracts function: ', contractArray);
		let ownerArray = [];
		if (contractArray) {
			for (let i = 0; i < contractArray.length; i++) {
				simpleLifeContract = await new web3.eth.Contract(
					SimpleLifeContract.abi,
					contractArray[i]
				);
				let owner = await simpleLifeContract.methods.owner().call();
				//console.log("Simple life contract owner: ", owner);
				if (owner === account) {
					ownerArray.push(contractArray[i]);
				}
			}
			setOwnerContracts(ownerArray);
		}
	}

	async function loadPoaContracts() {
		// console.log("Contract abi: ", ContractFactory.abi);
		// console.log("Contract address: ", contractAddress);
		let contractArray = await contractFactory.methods
			.getSimpleLifeContracts()
			.call();
		//console.log('contract factory get contracts function: ', contractArray);
		let poaArray = [];
		if (contractArray) {
			for (let i = 0; i < contractArray.length; i++) {
				simpleLifeContract = await new web3.eth.Contract(
					SimpleLifeContract.abi,
					contractArray[i]
				);
				let poa = await simpleLifeContract.methods
					.powerOfAttorney()
					.call();
				//console.log("Simple life contract owner: ", owner);
				if (poa === account) {
					poaArray.push(contractArray[i]);
				}
			}
			setPoaContracts(poaArray);
		}
		setIsLoading(false);
	}

	loadAccounts();
	loadOwnerContracts();
	loadPoaContracts();

	useEffect(() => {
		if(window.ethereum) {
			window.ethereum.on('chainChanged', () => {
			setContractClicked(false);
			loadAccounts();
			loadOwnerContracts();
			loadPoaContracts();
			});

			window.ethereum.on('accountsChanged', () => {
			setContractClicked(false);
			loadAccounts();
			loadOwnerContracts();
			loadPoaContracts();
			});
		}
	}, [window.ethereum]);
	//console.log('owner contracts: ', ownerContracts);

	const handleCreateContract = async (e) => {
		setIsLoading(true);
		e.preventDefault();
		try {
			await contractFactory.methods
				.createContract(poa)
				.send({ from: account })
				.on(hash => setIsLoading(false));
			// console.log('tx: ', tx);
			// console.log('poa on submit: ', poa);
			
		} catch (e) {
			setIsLoading(false);
			console.log(e.message);
		}
	};

	const handleContractInfo = async (e) => {
		setIsLoading(true);
		setContractClicked(!contractClicked);
		setContractInfo({});
		setInheritorWallets([{}]);
		// console.log("clicked contract inner text: ", e.target.innerText);
		// console.log("currContract when clicked: ", currContract);

		simpleLifeContract = await new web3.eth.Contract(
			SimpleLifeContract.abi,
			e.target.innerText
		);
		let totalContractBalance;
		let valueDeployed;
		let powerOfAttorney;
		let isActive = await simpleLifeContract.methods.isActive().call();
		
		try {

			// GET TOTAL INHERITANCE BALANCE 
			totalContractBalance = await simpleLifeContract.methods
				.totalInheritanceValue()
				.call();

			if (!totalContractBalance) {
				totalContractBalance = "0";
			}

			// GET TOTAL VALUE DEPLOYED SO FAR
			valueDeployed = await simpleLifeContract.methods
				.valueDeployed()
				.call();

			// GET POWER OF ATTORNEY
			powerOfAttorney = await simpleLifeContract.methods
				.powerOfAttorney()
				.call();

			// GET TOTAL NUMBER OF INHERITORS AND ADD THEM TO INHERITOR WALLETS
			let totalInheritors = await simpleLifeContract.methods
				.totalInheritors()
				.call();
			//console.log("total inheritors: ", totalInheritors);

			let allWallets = [];

			if (totalInheritors.length > 0) {
				for (let i = 0; i < totalInheritors; i++) {
					let newWallet = await simpleLifeContract.methods
						.inheritorWallets(i)
						.call();
					console.log("new wallet: ", newWallet);
					allWallets.push(newWallet);
				}
			}

			let tempInheritors = [{}];

			for (let i = 0; i < allWallets.length; i++) {
				let currBalance = await simpleLifeContract.methods
					.inheritanceAmount(allWallets[i])
					.call();
				currBalance = web3.utils.fromWei(currBalance, "ether");

				tempInheritors[i] = {
					wallet: allWallets[i],
					balance: currBalance,
				};
			}
			setInheritorWallets(tempInheritors);
			setIsLoading(false);
		} catch (e) {
			setIsLoading(false);
			console.log("e: ", e.message);
		}

		totalContractBalance = web3.utils.fromWei(
			totalContractBalance,
			"ether"
		);
		valueDeployed = web3.utils.fromWei(valueDeployed, "ether");

		console.log("inheritorWallets: ", inheritorWallets);
		// inheritorWallets.map(wallet => {
		// 	console.log(wallet.wallet, wallet.balance);
		// })

		setContractInfo({
			totalContractBalance,
			valueDeployed,
			powerOfAttorney,
			isActive,
		});
		setCurrContract(e.target.innerText);
		//console.log("currContract when after setCurrContract is called: ", currContract);
	};

	const handleAddFunds = async (e) => {
		setIsLoading(true);
		e.preventDefault();
		try {
			simpleLifeContract = await new web3.eth.Contract(
				SimpleLifeContract.abi,
				currContract
			);
			let convertedAmount = await web3.utils.toWei(addFunds, "ether");
			console.log("converted amount: ", convertedAmount);
			await simpleLifeContract.methods
				.addFunds()
				.send({ from: account, value: convertedAmount })
				.on(hash => setIsLoading(false));
			
		} catch (e) {
			setIsLoading(false);
			console.log(e.message);
		}
	};

	const handleAddInheritor = async (e) => {
		setIsLoading(true);
		e.preventDefault();
		// console.log("e.params: ", currContract);
		// console.log("amount: ", amount);
		// console.log("inheritor: ", inheritor);
		try {
			let sendAmount = web3.utils.toWei(amount, "ether");
			simpleLifeContract = await new web3.eth.Contract(
				SimpleLifeContract.abi,
				currContract
			);
	
			await simpleLifeContract.methods
				.addInheritor(addInheritor, sendAmount)
				.send({ from: account })
				.on(hash => setIsLoading(false));
			
		} catch (e) {
			setIsLoading(false);
			console.log(e.message);
		}

	};

	const handleIncreaseAmount = async (e) => {
		setIsLoading(true);
		e.preventDefault();
		try {
			let sendAmount = web3.utils.toWei(increaseAmount, "ether");
			simpleLifeContract = await new web3.eth.Contract(
				SimpleLifeContract.abi,
				currContract
			);
			await simpleLifeContract.methods
				.increaseInheritanceAmount(increaseInheritor, sendAmount)
				.send({ from: account })
				.on(hash => setIsLoading(false));
				
		} catch (e) {
			setIsLoading(false);
			console.log(e.message);
		}
	};

	const handleDecreaseAmount = async (e) => {
		setIsLoading(true);
		e.preventDefault();
		try {
			let sendAmount = web3.utils.toWei(decreaseAmount, "ether");
			simpleLifeContract = await new web3.eth.Contract(
				SimpleLifeContract.abi,
				currContract
			);
			await simpleLifeContract.methods
				.decreaseInheritanceAmount(decreaseInheritor, sendAmount)
				.send({ from: account })
				.on(hash => setIsLoading(false));
				
		} catch (e) {
			setIsLoading(false);
			console.log(e.message);
		}
	};

	const handleCloseContract = async (e) => {
		setIsLoading(true);
		e.preventDefault();
		try {
			simpleLifeContract = await new web3.eth.Contract(
				SimpleLifeContract.abi,
				currContract
			);
			await simpleLifeContract.methods.isDead()
				.send({ from: account })
				.on(hash => setIsLoading(false));
				
			} catch (e) {
				setIsLoading(false);
				console.log(e.message);
		}
	};

	return (
		<div className="App">
			<header className="App-header">
				<img
					src={tombstone}
					alt="tombstone"
					width="200"
					height="200"
					style={{ borderRadius: "100px", marginTop: "25px" }}
				/>

				{isLoading ? (
					<Loading />
				) : (
					<>
						<h1>SimpleLife</h1>
						<p style={{ color: "red" }}>
							THIS CONTRACT ONLY WORKS WITH RINKEBY TEST NET. DO
							NOT USE REAL FUNDS!!!
						</p>
						{ownerContracts && (
							<OwnerContracts
								ownerContracts={ownerContracts}
								handleContractInfo={handleContractInfo}
							/>
						)}

						{poaContracts && (
							<PoaContracts
								poaContracts={poaContracts}
								handleContractInfo={handleContractInfo}
							/>
						)}

						{contractClicked &&
							account === contractInfo.powerOfAttorney &&
							contractInfo.isActive && (
								<ClickedPoaContract
									currContract={currContract}
									contractInfo={contractInfo}
									inheritorWallets={inheritorWallets}
									handleCloseContract={handleCloseContract}
								/>
							)}

						{contractClicked &&
							account !== contractInfo.powerOfAttorney &&
							contractInfo.isActive && (
								<ClickedOwnerContract
									currContract={currContract}
									contractInfo={contractInfo}
									inheritorWallets={inheritorWallets}
									handleAddFunds={handleAddFunds}
									addFunds={addFunds}
									setAddFunds={setAddFunds}
									handleAddInheritor={handleAddInheritor}
									addInheritor={addInheritor}
									setAddInheritor={setAddInheritor}
									amount={amount}
									setAmount={setAmount}
									handleIncreaseAmount={handleIncreaseAmount}
									increaseInheritor={increaseInheritor}
									setIncreaseInheritor={setIncreaseInheritor}
									increaseAmount={increaseAmount}
									setIncreaseAmount={setIncreaseAmount}
									handleDecreaseAmount={handleDecreaseAmount}
									decreaseInheritor={decreaseInheritor}
									setDecreaseInheritor={setDecreaseInheritor}
									decreaseAmount={decreaseAmount}
									setDecreaseAmount={setDecreaseAmount}
								/>
							)}

						{contractClicked && !contractInfo.isActive && (
							<ClosedContract
								currContract={currContract}
								contractInfo={contractInfo}
								inheritorWallets={inheritorWallets}
							/>
						)}

						<hr style={{ width: "90%", color: "white" }} />
						<p>Your address: {account}</p>
						<p>Network: {network}</p>
						<p>Current Balance: {balance} ETH</p>
						<hr style={{ width: "90%", color: "white" }} />
						<form onSubmit={handleCreateContract}>
							<p>Want to create a new SimpleLife contract?</p>
							<p>
								<b>
									The Power of Attorney should be a trusted
									third party. It cannot be the creator of the
									contract. The Power of Attorney will be the
									only person able to execute the disbursement
									of inheritance upon the death of the owner.
									CHOOSE WISELY!
								</b>
							</p>
							<label>
								Enter Power of Attorney wallet address:
								<br />
								<input
									type="text"
									style={{ width: "330px" }}
									value={poa}
									onChange={(e) => setPoa(e.target.value)}
								/>
							</label>
							<br />
							<button style={{ cursor: "pointer" }} type="submit">
								Create Contract
							</button>
						</form>
						<br />
						<br />
					</>
				)}
			</header>
		</div>
	);
}

export default App;
