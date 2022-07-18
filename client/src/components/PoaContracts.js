import React from 'react';

export const PoaContracts = ({poaContracts, handleContractInfo}) => {
  return (
		<>
			<br />
			Contracts this address is the Power of Attorney for:
			<br />
			{poaContracts.length === 0 ? (
				<h1 style={{ margin: "0" }}>0</h1>
			) : (
				poaContracts.map((contract) => {
					return (
						<>
							<button
								onClick={handleContractInfo}
								style={{
									cursor: "pointer",
									color: "tomato",
									backgroundColor: "black",
									fontSize: "22px",
									fontStyle: "bold",
									padding: "2px",
									borderRadius: "3px",
									width: "525px",
									margin: "2px",
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