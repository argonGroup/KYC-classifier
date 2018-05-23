/*
 * Deployment script for KYC Address Classifier Smart Contract.
 * Copyright © 2018 by Argon Investments Management.
 * Author: Mikhail Vladimirov <mikhail.vladimirov@gmail.com>
 */

if (
	!web3.eth
		.contract([
			{
				constant: true,
				inputs: [{ name: '_address', type: 'address' }],
				name: 'classifyAddress',
				outputs: [{ name: '', type: 'uint256' }],
				payable: false,
				stateMutability: 'view',
				type: 'function'
			},
			{
				constant: false,
				inputs: [
					{ name: '_address', type: 'address' },
					{ name: '_class', type: 'uint256' }
				],
				name: 'setAddressClass',
				outputs: [],
				payable: false,
				stateMutability: 'nonpayable',
				type: 'function'
			},
			{
				constant: false,
				inputs: [
					{ name: '_class', type: 'uint256' },
					{ name: '_owner', type: 'address' },
					{ name: '_permission', type: 'bool' }
				],
				name: 'setClassPermission',
				outputs: [],
				payable: false,
				stateMutability: 'nonpayable',
				type: 'function'
			},
			{
				inputs: [{ name: '_owner', type: 'address' }],
				payable: false,
				stateMutability: 'nonpayable',
				type: 'constructor'
			},
			{
				anonymous: false,
				inputs: [
					{ indexed: true, name: 'owner', type: 'address' },
					{ indexed: true, name: 'addr', type: 'address' },
					{ indexed: true, name: 'class', type: 'uint256' }
				],
				name: 'AddressClassification',
				type: 'event'
			},
			{
				anonymous: false,
				inputs: [
					{ indexed: true, name: 'class', type: 'uint256' },
					{ indexed: true, name: 'owner', type: 'address' },
					{ indexed: false, name: 'permission', type: 'bool' }
				],
				name: 'ClassPermissionChange',
				type: 'event'
			}
		])
		.new(
			owner,
			{
				from: web3.eth.accounts[0],
				data:
					'0x6060604052341561000f57600080fd5b6040516020806103e58339810160405280805160008054600160a060020a03909216600160a060020a03199092169190911790555050610391806100546000396000f3006060604052600436106100565763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416635b046ea2811461005b578063824735861461008c578063c40b1208146100b0575b600080fd5b341561006657600080fd5b61007a600160a060020a03600435166100d7565b60405190815260200160405180910390f35b341561009757600080fd5b6100ae600160a060020a03600435166024356100f2565b005b34156100bb57600080fd5b6100ae600435600160a060020a036024351660443515156102a0565b600160a060020a031660009081526001602052604090205490565b60008054819033600160a060020a0390811691161415610111576101c7565b82158061014057506000838152600360209081526040808320600160a060020a033316845290915290205460ff165b151561014b57600080fd5b600160a060020a03841660009081526001602052604090205491508115806101bc5750600160a060020a0384811660009081526002602052604090205433821691161480156101bc57506000828152600360209081526040808320600160a060020a033316845290915290205460ff165b15156101c757600080fd5b82156101d357336101d6565b60005b600160a060020a0385166000908152600160205260409020549091508314158061021d5750600160a060020a03848116600090815260026020526040902054811690821614155b1561029a57600160a060020a038481166000818152600160209081526040808320889055600290915290819020805473ffffffffffffffffffffffffffffffffffffffff191685851617905585923316907f674cd87a83d305b6d1ea55da076b1b9a6b8afc6cafa22a85a02b0aff07d4ff02905160405180910390a45b50505050565b60005433600160a060020a039081169116146102bb57600080fd5b8215156102c757600080fd5b6000838152600360209081526040808320600160a060020a038616845290915290205460ff16151581151514610360576000838152600360209081526040808320600160a060020a038616808552925291829020805460ff19168415151790559084907f75241c65ee6407f0d3e5012288419121402f933dbfcd6252607216878143748990849051901515815260200160405180910390a35b5050505600a165627a7a723058204f2e523832734e06ce9b43638c28b96aa8f00844b8a65594f004eedf34086ebe0029',
				gas: 1000000
			},
			function(e, r) {
				if (e) throw e;
				if (typeof r.address !== 'undefined') {
					console.log(
						'Deployed at ' + r.address + ' (tx: ' + r.transactionHash + ')'
					);
				}
			}
		).transactionHash
) {
	console.log('Deployment failed.  Probably web3.eth.accounts[0] is locked.');
}
