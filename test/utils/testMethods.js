const async = require('async');

function sendToContractByName(web3, contractName, testcase, gasPrice, callback){
	if(testcase.params){
		return web3.sendToContractbyName(contractName, testcase.name, gasPrice, (err, result)=>{
			callback(err, result);
		}, ...testcase.params)
	}
	else{
		return web3.sendToContractbyName(contractName, testcase.name, gasPrice, (err, result)=>{
			callback(err, result);
		})
	}
}

function sendToContractByIdx(web3, contractIdx, testcase, gasPrice, callback){
	if(testcase.params){
		return web3.sendToContractbyIdx(contractIdx, testcase.name, gasPrice, (err, result)=>{
			callback(err, result);
		}, ...testcase.params)
	}
	else{
		return web3.sendToContractbyIdx(contractIdx, testcase.name, gasPrice, (err, result)=>{
			callback(err, result);
		})
	}
}


exports.testCallContractByName = function(web3, contractName, testcase, callback){
	if(testcase.params){
		 web3.callContractbyName(contractName, testcase.name, (err, result)=>{
			callback(err, result);
		}, ...testcase.params);
	}
	else{
		 web3.callContractbyName(contractName, testcase.name, (err, result)=>{
			callback(err, result);
		});
	}
}

exports.testCallContractByIdx = function(web3, contractIdx, testcase, callback){
	if(testcase.params){
		web3.callContractbyIdx(contractIdx, testcase.name, (err, result)=>{
			callback(err, result);
		}, ...testcase.params);
	}
	else{
		web3.callContractbyIdx(contractIdx, testcase.name, (err, result)=>{
			callback(err, result);
		});
	}
}

exports.testSendToContractByNameWhilePending = function(web3, contractName, testcase, callback){
	let testResults = {
		"nonce1": "",
		"nonce2": "",
		"errorMessage": ""
	}

	async.waterfall([
		function(cb1){
			sendToContractByName(web3, contractName, testcase[0], 100000, (err, res) => {
			})
			cb1();
		},
		function(cb2){
			web3.getTransactionCount(web3.getWalletAddress()).then((result1) => {
				testResults.nonce1 = result1;
				cb2();
			})

		},
		function(cb3){
			sendToContractByName(web3, contractName, testcase[1], 100000, (err, res) => {
				testResults.errorMessage = err;
				cb3();
			})

		},
		function(cb4){
			web3.getTransactionCount(web3.getWalletAddress()).then((result2) => {
				testResults.nonce2 = result2;
				cb4();
			})

		}
	], function(err, results){
		return callback(null, testResults);
	})
}

exports.testSendToContractByIdxWhilePending = function(web3, contractIdx, testcase, callback){
	let testResults = {
		"nonce1": "",
		"nonce2": "",
		"errorMessage": ""
	}

	async.waterfall([
		function(cb1){
			sendToContractByIdx(web3, contractIdx, testcase[0], 100000, (err, res) => {
			})
			cb1();
		},
		function(cb2){
			web3.getTransactionCount(web3.getWalletAddress()).then((result1) => {
				testResults.nonce1 = result1;
				cb2();
			})

		},
		function(cb3){
			sendToContractByIdx(web3, contractIdx, testcase[1], 100000, (err, res) => {
				testResults.errorMessage = err;
				cb3();
			})

		},
		function(cb4){
			web3.getTransactionCount(web3.getWalletAddress()).then((result2) => {
				testResults.nonce2 = result2;
				cb4();
			})

		}
	], function(err, results){
		return callback(null, testResults);
	})
}

exports.testSendToContractByNameWhileFinished = function(web3, contractName, testcase, callback){
	let testResults = {
		"nonce1": "",
		"nonce2": "",
		"errorMessage": ""
	}

	async.waterfall([
		function(cb1){
			sendToContractByName(web3, contractName, testcase[0], 100000, (err, res) => {
			}).on('confirmation', function(confNumber, receipt){ 
				cb1();
			});
		},
		function(cb2){
			web3.getTransactionCount(web3.getWalletAddress()).then((result1) => {
				testResults.nonce1 = result1;
				cb2();
			})

		},
		function(cb3){
			sendToContractByName(web3, contractName, testcase[1], 100000, (err, res) => {
				testResults.errorMessage = err;
				cb3();
			})

		},
		function(cb4){
			web3.getTransactionCount(web3.getWalletAddress()).then((result2) => {
				testResults.nonce2 = result2;
				cb4();
			})

		}
	], function(err, results){
		return callback(null, testResults);
	})
}

exports.testSendToContractByIdxWhileFinished = function(web3, contractIdx, testcase, callback){
	let testResults = {
		"nonce1": "",
		"nonce2": "",
		"errorMessage": ""
	}

	async.waterfall([
		function(cb1){
			sendToContractByIdx(web3, contractIdx, testcase[0], 100000, (err, res) => {
			}).on('confirmation', function(confNumber, receipt){ 
				cb1();
			});
		},
		function(cb2){
			web3.getTransactionCount(web3.getWalletAddress()).then((result1) => {
				testResults.nonce1 = result1;
				cb2();
			})

		},
		function(cb3){
			sendToContractByIdx(web3, contractIdx, testcase[1], 100000, (err, res) => {
				testResults.errorMessage = err;
				cb3();
			})

		},
		function(cb4){
			web3.getTransactionCount(web3.getWalletAddress()).then((result2) => {
				testResults.nonce2 = result2;
				cb4();
			})

		}
	], function(err, results){
		return callback(null, testResults);
	})
}