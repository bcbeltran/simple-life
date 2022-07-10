import React from 'react'

export const ClickedPoaContract = ({currContract, contractInfo, inheritorWallets, handleCloseContract}) => {
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
			<form onSubmit={handleCloseContract}>
				<p>
					<b>
						Only the Power of Attorney can perform this function.
						Once this contract is closed all funds will be
						distributed to the inheritors and any remaining funds
						will be deposited into the Power of Attorney wallet:
					</b>
				</p>
				<button style={{cursor: "pointer"}} type="submit">Close Contract</button>
			</form>
		</>
  );
}
