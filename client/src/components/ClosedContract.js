import React from 'react'

export const ClosedContract = ({contractInfo, inheritorWallets}) => {
  return (
		<>
			<hr style={{ width: "90%", color: "white" }} />
			<p style={{ color: "red" }}>
				<b>THIS CONTRACT HAS BEEN CLOSED</b>
				<br />
				All funds not distributed to inheritors have
				been sent to the wallet of the Power of Attorney.
			</p>

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
		</>
  );
}
