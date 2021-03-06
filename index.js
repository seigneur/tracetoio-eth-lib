const Web3 = require('web3');
const eutil = require('ethereumjs-util');
const EventEmitter = require('events');

class tracetoWeb3{
  constructor(providerUrl='wss://websocket.alpha.traceto.io/ws'){
    this.web3 = new Web3();
    this.event = new EventEmitter();
    this.connectWeb3(providerUrl);
    this.contracts = [];
    this.contractNames = {};
  }

  connectWeb3(providerUrl){
    if(providerUrl.startsWith('ws://') || providerUrl.startsWith('wss://')){
      this.provider = new Web3.providers.WebsocketProvider(providerUrl);
      this.provider.on('connect', () => {
        this.event.emit('web3Connected');
      });
      this.provider.on('error', () => {
        this.event.emit('web3Error');
      });
      this.provider.on('end', () => {
        this.event.emit('web3End');
        this.connectWeb3(providerUrl);
      });
    }
    else if(providerUrl.startsWith('http://') || providerUrl.startsWith('https://'))
      this.provider = new Web3.providers.HttpProvider(providerUrl);
    else
      this.provider = null;
    this.web3.setProvider(this.provider);
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

  callContractbyIdx(idx, funcName, ...paras){
    const _this = this;
    return new Promise((resolve, reject) => {
      _this.contracts[idx].methods[funcName](...paras).call({}, (err, data) => {
        if(!err)
          resolve(data);
        else
          reject(err);
      });
    });
  }

  callContractbyName(name, funcName, ...paras){
    const _this = this;
    return new Promise((resolve, reject) => {
      _this.contracts[this.contractNames[name]].methods[funcName](...paras).call({}, (err, data) => {
        if(!err)
          resolve(data);
        else
          reject(err);
      });
    });
  }

  sendToContractbyIdx(idx, funcName, gasPrice, ...paras){
    const _this = this;
    const gasPriceHex = this.web3.utils.numberToHex(gasPrice);
    const gasLimitHex = this.web3.utils.numberToHex(7500000);
    return new Promise((resolve, reject) => {
      _this.contracts[idx].methods[funcName](...paras).send({'from':_this.web3.eth.accounts.wallet[0].address, 'gasPrice': gasPriceHex, 'gasLimit': gasLimitHex})
      .then(receipt => resolve(receipt))
      .catch(err => reject(err));
    });
  }

  sendToContractbyIdx(idx, funcName, gasPrice, ...paras){
    const _this = this;
    const gasPriceHex = this.web3.utils.numberToHex(gasPrice);
    const gasLimitHex = this.web3.utils.numberToHex(7500000);
    return new Promise((resolve, reject) => {
      _this.contracts[idx].methods[funcName](...paras).send({'from':_this.web3.eth.accounts.wallet[0].address, 'gasPrice': gasPriceHex, 'gasLimit': gasLimitHex})
      .then(receipt => resolve(receipt))
      .catch(err => reject(err));
    });
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