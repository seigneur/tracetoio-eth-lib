var assert = require('assert');

var fullTest = require('./fullTest');

const chai = require('chai');
const expect = chai.expect;

describe('Testing starts', function(){
	describe('Testing callContractByName', function(){
		fullTest.testCallContractByName(function(){
		})
	});
	
	describe('Testing callContractByIdx', function(){
		fullTest.testCallContractByIdx(function(){
		})
	});

	describe('Testing sendContractByName', function(){
		fullTest.testSendToContractByName(function(){
		})
	});
	
	describe('Testing sendContractByIdx', function(){
		fullTest.testSendToContractByIdx(function(){
		})
	});
});
