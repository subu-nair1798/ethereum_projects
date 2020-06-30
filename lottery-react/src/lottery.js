import web3 from "./web3"

const contractAddress = "0x471895c679640EaC8bc9B782C48f4A66b257DAb4";
const abi_interface =  [ 
  { inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
    constant: undefined,
    signature: 'constructor' },
  { constant: false,
    inputs: [],
    name: 'enter',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
    signature: '0xe97dcb62' },
  { constant: true,
    inputs: [],
    name: 'getPlayers',
    outputs: [ [Object] ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0x8b5b9ccc' },
  { constant: true,
    inputs: [],
    name: 'manager',
    outputs: [ [Object] ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0x481c6a75' },
  { constant: false,
    inputs: [],
    name: 'pickWinner',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x5d495aea' },
  { constant: true,
    inputs: [ [Object] ],
    name: 'players',
    outputs: [ [Object] ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0xf71d96cb' } 
]

export default new web3.eth.Contract(abi_interface, contractAddress);



