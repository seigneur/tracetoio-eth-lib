var tokenTestFunctionCases = [
    {
      "constant": true,
      "inputs": [],
      "params":undefined,
      "name": "mintingFinished",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "expectedOutput": true,
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "params": undefined,
      "name": "tracetoMultiSigContract",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "expectedOutput":'0x661Fd37eB6BDE28a43d2a688E43aF8D45ECd585E' ,
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "params": undefined,
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "expectedOutput": "traceto.io",
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "params": ['0xBa91Cd32c5dad6e712d513578B887BCAB2B79DC3',1],
      "name": "approve",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "expectedOutput": true,
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "params": undefined,
      "name": "totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "expectedOutput": 1999999,
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "params": undefined,
      "name": "decimals",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "expectedOutput": 18,
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "params":undefined,
      "name": "allowTransferTime",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "expectedOutput": 1532050000,
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_subtractedValue",
          "type": "uint256"
        }
      ],
      "params":['0xBa91Cd32c5dad6e712d513578B887BCAB2B79DC3', 1],
      "name": "decreaseApproval",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "expectedOutput":true,
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "params":['0xBa91Cd32c5dad6e712d513578B887BCAB2B79DC3'],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "uint256"
        }
      ],
      "expectedOutput": 9840,
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "params": undefined,
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "expectedOutput":'0x661Fd37eB6BDE28a43d2a688E43aF8D45ECd585E',
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "params": undefined,
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "expectedOutput": 'T2T',
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_addedValue",
          "type": "uint256"
        }
      ],
      "params": ['0xBa91Cd32c5dad6e712d513578B887BCAB2B79DC3', 1],
      "name": "increaseApproval",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "expectedOutput": true,
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "params": undefined,
      "name": "exchangeIEO",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "expectedOutput": '0xD65f8662d3D03827cB4E6C76092ecEfFD25ADeeF',
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_spender",
          "type": "address"
        }
      ],
      "params": ['0xBa91Cd32c5dad6e712d513578B887BCAB2B79DC3', '0xBa91Cd32c5dad6e712d513578B887BCAB2B79DC3'],
      "name": "allowance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "expectedOutput": 1,
      "stateMutability": "view",
      "type": "function"
    }
]

module.exports = {
  tokenTestCases: tokenTestFunctionCases,
}