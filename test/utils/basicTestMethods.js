const contract = require('../lib/config/contract');
const wallets = require('../lib/config/wallets');

exports.runAddContract = function(contractName, callback){
	let contractIdx = w3_lite.addContract(contractName, contract['contract_'+contractName].addr, contract['contract_'+contractName].abi);
	callback(null, contractIdx)
}


exports.runGetGasPrice = function(callback){
	let gasPrice = w3_lite.getGasPrice();
	callback(null, gasPrice);
}

exports.runSetWallet_GetAddress_GetPubKey = function(callback){
	let walletAddress = w3_lite.getWalletAddress();
	let walletPubkey = w3_lite.getWalletPubKey();
	callback(null, walletAddress, walletPubkey);
}

exports.runCallContractByIdx = function(testObject, walletNumber, contractName, callback){
	w3_lite.callContractbyIdx(0, testObject.name).then(function(result){
		callback(null, result);
	});
}

exports.runCallContractByName = function(testObject, walletNumber, contractName, callback){
	w3_lite.callContractbyName("token", testObject.name ,10000000).then(function(result){
		callback(null, result);
	});
}

exports.runSendToContractByIdx = function(testObject, walletNumber, contractName, callback){
	w3_lite.sendToContractbyIdx(0, testObject.name, 1000000).then(function(result){
		callback(null, result.from)
	})
}

exports.runSendToContractByName = function(testObject, walletNumber, contractName, callback){
	w3_lite.sendToContractbyName("token", testObject.name, 1000000).then(function(result){
		callback(null, result.from)
	})
}


exports.runGetAllContractEventById= function(walletNumber, contractName, callback){
	callback(null, w3_lite.getAllContractEventbyId(0))
}


exports.runGetAllContractEventByName = function(walletNumber, contractName, callback){
	callback(null, w3_lite.getAllContractEventbyName("token"))
}


exports.runGetContractEventById = function(walletNumber, contractName, testObject, callback){
	callback(null, w3_lite.getContractEventbyId(0, "Approval"))
}



exports.runGetContractEventByName = function(walletNumber, contractName, testObject, callback){
	callback(null, w3_lite.getContractEventbyName("token", "Approval"))
}





