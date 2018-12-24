const Web3 = require('web3');
const eutil = require('ethereumjs-util');
const EventEmitter = require('events');

class tracetoWeb3{
  constructor(wssUrl='wss://websocket.alpha.traceto.io/ws'){
    this.provider = new Web3.providers.WebsocketProvider(wssUrl);
    this.web3 = new Web3(this.provider);
    this.event = new EventEmitter();
    this.connectWeb3(wssUrl);
    this.contracts = [];
    this.contractNames = {};
  }

  connectWeb3(wssUrl){
    this.provider = new Web3.providers.WebsocketProvider(wssUrl);
    this.web3.setProvider(this.provider);
    
    this.provider.on('connect', () => {
      this.event.emit('web3Connected');
    });
    this.provider.on('error', () => {
      this.connectWeb3(wssUrl);
    });
    this.provider.on('end', () => {
      this.event.emit('web3End');
      this.event.emit('web3Error');
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

  callContractbyIdx(idx, funcName, callback, ...paras){
    return this.contracts[idx].methods[funcName](...paras).call({}, callback);
  }

  callContractbyName(name, funcName, callback, ...paras){
    return this.contracts[this.contractNames[name]].methods[funcName](...paras).call({}, callback);
  }

  sendToContractbyIdx(idx, funcName, gasPrice, callback, ...paras){
    const gasPriceHex = this.web3.utils.numberToHex(gasPrice);
    const gasLimitHex = this.web3.utils.numberToHex(7500000);
    if(callback)
      return this.contracts[idx].methods[funcName](...paras).send({'from':this.web3.eth.accounts.wallet[0].address, 'gasPrice': gasPriceHex, 'gasLimit': gasLimitHex}, callback);
    else
      return this.contracts[idx].methods[funcName](...paras).send({'from':this.web3.eth.accounts.wallet[0].address, 'gasPrice': gasPriceHex, 'gasLimit': gasLimitHex});
  }

  sendToContractbyName(name, funcName, gasPrice, callback, ...paras){
    const gasPriceHex = this.web3.utils.numberToHex(gasPrice);
    const gasLimitHex = this.web3.utils.numberToHex(7500000);
    if(callback)
      return this.contracts[this.contractNames[name]].methods[funcName](...paras).send({'from':this.web3.eth.accounts.wallet[0].address, 'gasPrice': gasPriceHex, 'gasLimit': gasLimitHex}, callback);
    else
      return this.contracts[this.contractNames[name]].methods[funcName](...paras).send({'from':this.web3.eth.accounts.wallet[0].address, 'gasPrice': gasPriceHex, 'gasLimit': gasLimitHex});
  }   

  getAllContractEventbyId(idx, fromBlock='latest'){
    return this.contracts[idx].events.allEvents({fromBlock: fromBlock});
  }

  getAllContractEventbyName(name, fromBlock='latest'){
    return this.contracts[this.contractNames[name]].events.allEvents({fromBlock: fromBlock});
  }

  getContractEventbyId(idx, eventName, fromBlock='latest'){
    return this.contracts[idx].events[eventName]({fromBlock: fromBlock});
  }

  getContractEventbyName(name, eventName, fromBlock='latest'){
    return this.contracts[this.contractNames[name]].events[eventName]({fromBlock: fromBlock});
  }
  
  getTransactionCount(walletAddress){
    return this.web3.eth.getTransactionCount(walletAddress);
  }
}

module.exports = tracetoWeb3;