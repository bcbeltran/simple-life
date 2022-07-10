import React from 'react'

export const ClickedOwnerContract = ({currContract, contractInfo, inheritorWallets, handleAddFunds, addFunds, setAddFunds, handleAddInheritor, addInheritor, setAddInheritor, amount, setAmount, handleIncreaseAmount, increaseInheritor, setIncreaseInheritor, increaseAmount, setIncreaseAmount, handleDecreaseAmount, decreaseInheritor, setDecreaseInheritor, decreaseAmount, setDecreaseAmount }) => {
  return (
		<>
			<hr style={{ width: "90%", color: "white" }} />
			<p>You are currently interacting with: {currContract}</p>
			<p>Power of Attorney: {contractInfo.powerOfAttorney}</p>
			<p>
				Total Value in Contract: {contractInfo.totalContractBalance} ETH
			</p>
			<p>Total Value Deployed: {contractInfo.valueDeployed} ETH</p>
			<hr style={{ width: "90%", color: "white" }} />
			<p>***Inheritors and Inheritance Amount***</p>
			{inheritorWallets.map((wallet) => {
				return (
					<>
						<p>Address: {wallet.wallet}</p>
						<p>Inheritance: {wallet.balance} ETH</p>
					</>
				);
			})}
			<hr style={{ width: "90%", color: "white" }} />
			<form onSubmit={handleAddFunds}>
				<label>
					<p>Add Funds To Contract:</p>
					<input
						type="text"
						name="addFunds"
						value={addFunds}
						placeholder="Amount in ETH"
						onChange={(e) => setAddFunds(e.target.value)}
					/>
				</label>
				<br />
				<button style={{ cursor: "pointer" }} type="submit">
					Add Funds
				</button>
			</form>
			<form onSubmit={handleAddInheritor}>
				<label>
					<p>Add Inheritor:</p>
					<input
						type="text"
						style={{ width: "330px" }}
						value={addInheritor}
						placeholder="Inheritor public address"
						onChange={(e) => setAddInheritor(e.target.value)}
					/>
					<br />
					<input
						type="text"
						value={amount}
						placeholder="Amount in ETH"
						onChange={(e) => setAmount(e.target.value)}
					/>
				</label>
				<br />
				<button style={{ cursor: "pointer" }} type="submit">
					Add Inheritor
				</button>
			</form>
			<form onSubmit={handleIncreaseAmount}>
				<label>
					<p>Increase Inheritance Amount:</p>
					<input
						type="text"
						style={{ width: "330px" }}
						value={increaseInheritor}
						placeholder="Inheritor public address"
						onChange={(e) => setIncreaseInheritor(e.target.value)}
					/>
					<br />
					<input
						type="text"
						value={increaseAmount}
						placeholder="Amount in ETH"
						onChange={(e) => setIncreaseAmount(e.target.value)}
					/>
				</label>
				<br />
				<button style={{ cursor: "pointer" }} type="submit">
					Increase Inheritance
				</button>
			</form>
			<form onSubmit={handleDecreaseAmount}>
				<label>
					<p>Decrease Inheritance Amount:</p>
					<input
						type="text"
						style={{ width: "330px" }}
						value={decreaseInheritor}
						placeholder="Inheritor public address"
						onChange={(e) => setDecreaseInheritor(e.target.value)}
					/>
					<br />
					<input
						type="text"
						value={decreaseAmount}
						placeholder="Amount in ETH"
						onChange={(e) => setDecreaseAmount(e.target.value)}
					/>
				</label>
				<br />
				<button style={{ cursor: "pointer" }} type="submit">
					Decrease Inheritance
				</button>
			</form>
		</>
  );
}
