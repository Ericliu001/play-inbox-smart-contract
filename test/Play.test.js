const assert = require('assert');
const ganache = require('ganache');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { abi, evm} = require('../compile');

// Simple example
// class Car {
//     park(){
//         return 'stopped';
//     }

//     drive(){
//         return 'vroom';
//     }
// }

// let car;

// beforeEach(() => {
//     car = new Car();
// });

// describe('Car', () => {
//     it('can park', () => {
//         assert.equal(car.park(), 'stopped');
//     });

//     it('can drive', () => {
//         assert.equal(car.drive(), 'vroom');
//     });
// });

let accounts;
let inbox;
const INITIAL_MSG = 'Hello World!';

// Test Ethereum
beforeEach(async () => {
    // Get a list of accounts.
    accounts = await web3.eth.getAccounts();

    // Use an account to deploy contracts
   inbox = await new web3.eth.Contract(abi)
    .deploy({data: evm.bytecode.object, arguments: [INITIAL_MSG]})
    .send({ from: accounts[0], gas: '1000000'} )
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        // console.log(inbox);
        assert.ok(inbox.options.address);
    });

    it('has an initial message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(INITIAL_MSG, message);
        console.log(message);
    });
});