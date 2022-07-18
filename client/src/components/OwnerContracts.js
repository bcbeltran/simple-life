import React from 'react';

export const OwnerContracts = ({ownerContracts, handleContractInfo}) => {
  return (
		<>
			<p>***Click on an address to interact with it***</p>
			<br />
			Contracts opened by this address:
			<br />
			{ownerContracts.length === 0 ? (
				<h1 style={{ margin: "0" }}>0</h1>
			) : (
				ownerContracts.map((contract) => {
					return (
						<>
							<button
								onClick={handleContractInfo}
								style={{
									cursor: "pointer",
									color: "cornflowerBlue",
									backgroundColor: "black",
									fontSize: "22px",
									fontStyle: "bold",
									padding: "2px",
									borderRadius: "3px",
									width: "525px",
									margin: "2px"
								}}
							>
								{contract}
							</button>
						</>
					);
				})
			)}
		</>
  );
}