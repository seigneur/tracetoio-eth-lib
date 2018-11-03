
var oneContractTwoTransactions = [
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
    },{
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


]




var twoContractsTwoTransactions = [

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
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      // "expectedOutput": '0x841db19d9ea538f5e1c20b22b28497dc710c89e4',
      "expectedOutput": "0x661Fd37eB6BDE28a43d2a688E43aF8D45ECd585E",
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }

]






var testObject = [{
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
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      // "expectedOutput": '0x841db19d9ea538f5e1c20b22b28497dc710c89e4',
      "expectedOutput": "0x661Fd37eB6BDE28a43d2a688E43aF8D45ECd585E",
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }]


module.exports = {
  oneContractTwoTransactions: oneContractTwoTransactions,
  twoContractsTwoTransactions: twoContractsTwoTransactions
}
