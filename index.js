const Web3 = require('web3');
const eutil = require('ethereumjs-util');

class traceto_web3{
	constructor(wss_url="wss://websocket.alpha.traceto.io/ws"){
		this.provider = new Web3.providers.WebsocketProvider(wss_url);
    	this.web3 = new Web3(this.provider);
		this.connectWeb3(wss_url);
    	this.contracts = [];
    	this.contractNames = {};
	}

	connectWeb3(wss_url){
		this.provider = new Web3.providers.WebsocketProvider(wss_url);
		this.web3.setProvider(this.provider);

		this.provider.on('error', err => {
			this.connectWeb3(wss_url);
    	});
  		this.provider.on('end', err => {
  		});
	}

	addContract(name, address, ABI){
		this.contracts.push(new this.web3.eth.Contract(ABI, address));
		this.contractNames[name] = this.contracts.length - 1;
		return this.contracts.length - 1;
	}

	getGasPrice(){
		return this.web3.eth.getGasPrice();
	}

	setWallet(priKey){
		this.priKey = priKey.includes('0x')?priKey.slice(2):priKey;
		this.web3.eth.accounts.wallet.add(this.web3.eth.accounts.privateKeyToAccount(priKey));
		this.web3.eth.defaultAccount = this.web3.eth.accounts.wallet[0].address;
	}

	sign(msg){
		return this.web3.eth.accounts.sign(msg, this.priKey);
	}

	getWalletAddress(){
		return this.web3.eth.accounts.wallet[0].address;
	}

	getWalletPubKey(){
		return '0x'+eutil.privateToPublic(this.web3.eth.accounts.wallet[0].privateKey).toString('hex');
	}

	callContractbyIdx(idx, func_name, callback, ...paras){
		return this.contracts[idx].methods[func_name](...paras).call({}, callback);
	}

	callContractbyName(name, func_name, callback, ...paras){
		return this.contracts[this.contractNames[name]].methods[func_name](...paras).call({}, callback);
	}

	sendToContractbyIdx(idx, func_name, gasPrice, callback, ...paras){
		const gasPriceHex = this.web3.utils.numberToHex(gasPrice);
		const gasLimitHex = this.web3.utils.numberToHex(7500000);
		if(callback)
			return this.contracts[idx].methods[func_name](...paras).send({"from":this.web3.eth.accounts.wallet[0].address, 'gasPrice': gasPriceHex, 'gasLimit': gasLimitHex}, callback);
		else
			return this.contracts[idx].methods[func_name](...paras).send({"from":this.web3.eth.accounts.wallet[0].address, 'gasPrice': gasPriceHex, 'gasLimit': gasLimitHex});
	}

	sendToContractbyName(name, func_name, gasPrice, callback, ...paras){
		const gasPriceHex = this.web3.utils.numberToHex(gasPrice);
		const gasLimitHex = this.web3.utils.numberToHex(7500000);
		if(callback)
			return this.contracts[this.contractNames[name]].methods[func_name](...paras).send({"from":this.web3.eth.accounts.wallet[0].address, 'gasPrice': gasPriceHex, 'gasLimit': gasLimitHex}, callback);
		else
			return this.contracts[this.contractNames[name]].methods[func_name](...paras).send({"from":this.web3.eth.accounts.wallet[0].address, 'gasPrice': gasPriceHex, 'gasLimit': gasLimitHex});
	}	

	getAllContractEventbyId(idx){
		return this.contracts[idx].events.allEvents({fromBlock: 'latest'});
	}

	getAllContractEventbyName(name){
		return this.contracts[this.contractNames[name]].events.allEvents({fromBlock: 'latest'});
	}

	getContractEventbyId(idx, event_name){
		return this.contracts[idx].events[event_name]({fromBlock: 'latest'});
	}

	getContractEventbyName(name, event_name){
		return this.contracts[this.contractNames[name]].events[event_name]({fromBlock: 'latest'});
	}
	
	getTransactionCount(walletAddress){
		return this.web3.eth.getTransactionCount(walletAddress);
	}
}

module.exports = traceto_web3;