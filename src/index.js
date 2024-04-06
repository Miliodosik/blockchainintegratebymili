// File: blockchain-integration.js

const Web3 = require('web3');

class BlockchainIntegration {
  constructor(providerUrl) {
    this.web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));
  }

  async getAccountBalance(accountAddress) {
    try {
      const balance = await this.web3.eth.getBalance(accountAddress);
      return this.web3.utils.fromWei(balance, 'ether');
    } catch (error) {
      console.error('Error fetching account balance:', error);
      throw error;
    }
  }

  async getContractData(contractAddress, abi, functionName, params = []) {
    try {
      const contract = new this.web3.eth.Contract(abi, contractAddress);
      const result = await contract.methods[functionName](...params).call();
      return result;
    } catch (error) {
      console.error('Error fetching contract data:', error);
      throw error;
    }
  }

  async sendTransaction(fromAddress, toAddress, value) {
    try {
      const txObject = {
        from: fromAddress,
        to: toAddress,
        value: this.web3.utils.toWei(value.toString(), 'ether'),
      };
      const txHash = await this.web3.eth.sendTransaction(txObject);
      return txHash;
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
  }
}

module.exports = BlockchainIntegration;
