# vote_dapp
Basic project to demonstrate how works decentralized applications.


## to use
- npm install solcjs
- solcjs --abi --bin "contratos/Voting.sol" -o "contratos/bin"
- deploy the contract with http://remix.ethereum.org/
- get the address of contract and set in index.js
- if you change the contract code, so is necessary update the ABI in index.js
