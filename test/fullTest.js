const testMethods = require('./utils/testMethods');
const async = require('async')
const callContractTestCases = require('./lib/testCases/callContractTestCases.js');
const sendContractTestCases = require('./lib/testCases/sendContractTestCases.js');

var contracts = ['token'];
var assert = require('assert');

const traceto_web3 = require("../index")
const original_Web3 = require('web3');

const contract = require('./lib/config/contract');
const wallets = require('./lib/config/wallets');

let contractName = "token";
let contractIdx = 0;

const setupWeb3 = function(walletIdx, contractName="token", web3_url="wss://ropsten.infura.io/ws"){
  let w3 = new traceto_web3(web3_url);
  w3.setWallet(wallets[walletIdx].priKey);
  contractIdx = w3.addContract(contractName, contract['contract_'+contractName].addr, contract['contract_'+contractName].abi);
  return w3;
}

//setup different accounts
global.w3_0 = setupWeb3(0);
global.w3_1 = setupWeb3(1);
global.w3_2 = setupWeb3(2);
global.w3_3 = setupWeb3(3);
global.w3_4 = setupWeb3(4);
global.w3_5 = setupWeb3(5);
global.w3_6 = setupWeb3(6);
global.w3_7 = setupWeb3(7);
global.w3_8 = setupWeb3(8);
global.w3_9 = setupWeb3(9);

function sleep(sleepTime) {
  for(var start = +new Date; +new Date - start <= sleepTime;) {};
}

var t1 = +new Date();
sleep(3000);

exports.testCallContractByIdx = function(){
  describe('testing contracts '+contracts[0], function(done){
    var testcases = callContractTestCases[contracts[0]+'TestCases'];
    async.each(testcases, function(testcase){
      it(testcase.name+ ' should return '+testcase.expectedOutput, function(done){
        testMethods.testCallContractByIdx(w3_0, contractIdx, testcase, function(err, result){
          assert.equal(result, testcase.expectedOutput)
          done();
        })
      })
    })
  });
}

exports.testCallContractByName = function(){
  describe('testing contracts testcases', ()=>{
    describe('testing contract '+ contracts[0], ()=>{
      var testcases = callContractTestCases[contracts[0]+'TestCases'];
      async.each(testcases, function(testcase){
        it(testcase.name+' should return '+testcase.expectedOutput, function(done){
          testMethods.testCallContractByName(w3_1, contractName, testcase, function(err, result){
            assert.equal(result, testcase.expectedOutput)
            done();
          })
        })
      })
    });
  })
}

exports.testSendToContractByName = function(){
  describe('Testing multiple transaction cases', function(){
    describe("when 1 transaction is still pending to a single contract", function(){
      describe('sending 1 more transaction to the same contract', function(){
        var testcase = sendContractTestCases.oneContractTwoTransactions;
        it('should return the same nonce and transaction error', function(done){
          this.timeout(30000000);
          testMethods.testSendToContractByNameWhilePending(w3_3, contractName, testcase, function(err, result){
            var errorMsgSubString = "Error: Returned error: known transaction"
            var index = result.errorMessage.toString().indexOf(errorMsgSubString)

            assert.equal(result.nonce1, result.nonce2);
            assert.equal(index, 0)
            
            done();
          })

        });
      });

      describe('sending 1 more transaction to a different contract', function(){
        var testcase = sendContractTestCases.twoContractsTwoTransactions;
        it('should return a different nonce and a gas price error', function(done){
          this.timeout(300000000);
          testMethods.testSendToContractByNameWhilePending(w3_3, contractName, testcase, function(err, result){

            var errorMsgSubString = "Error: Returned error: replacement transaction underpriced";
            var index = result.errorMessage.toString().indexOf(errorMsgSubString);

            assert.equal(result.nonce1, result.nonce2);
            assert.equal(index, 0);

            done();

          })
        })

      });
    }); 

    
  });
}

exports.testSendToContractByIdx = function(){
  describe('Testing multiple transaction cases', function(){
    describe("when 1 transaction is still pending to a single contract", function(){
      describe('sending 1 more transaction to the same contract', function(){
        var testcase = sendContractTestCases.oneContractTwoTransactions;
        it('should return the same nonce and transaction error', function(done){
          this.timeout(30000000);
          testMethods.testSendToContractByIdxWhilePending(w3_5, contractIdx, testcase, function(err, result){
            
            var errorMsgSubString = "Error: Returned error: known transaction"
            var index = result.errorMessage.toString().indexOf(errorMsgSubString)

            assert.equal(result.nonce1, result.nonce2);
            assert.equal(index, 0)
            
            done();
          })
        });
      });

      describe('sending 1 more transaction to a different contract', function(){
        var testcase = sendContractTestCases.twoContractsTwoTransactions;
        it('should return a different nonce and a gas price error', function(done){
          this.timeout(300000000);
          testMethods.testSendToContractByIdxWhilePending(w3_5, contractIdx, testcase, function(err, result){

            var errorMsgSubString = "Error: Returned error: replacement transaction underpriced";
            var index = result.errorMessage.toString().indexOf(errorMsgSubString);

            assert.equal(result.nonce1, result.nonce2);
            assert.equal(index, 0);

            done();
          })
        })
      });

    }); 
  });
}