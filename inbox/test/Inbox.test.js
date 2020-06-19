const assert = require("assert")
// standard library built into the node.js runtime
// used for making assertions about tests (e.g. assert that some value is equal to another value)

const ganache = require("ganache-cli")

const Web3 = require("web3")
// const { doesNotMatch } = require("assert")
// whenever using web3, we are always requiring/importing a constructor function
// used to create instances of the web3 library (hence 'Web3' i.e. constructor naming convention)

const provider =  Web3.givenProvider || ganache.provider()
const web3 = new Web3(provider) 
// instance of the Web3 library
// there can be multiple instances of web3. 
// The purpose of each instance is to connect to a different ethereum network (uncommon)

const { abi, evm } = require("../compile")

const INITIAL_STRING = "Hi there!"
let accounts
let inbox

beforeEach(async () => {
    // Get a list of all account
    // web3 has a lot of modules for different cryptocurrencies and blockchains 
    accounts = await web3.eth.getAccounts()
        
    // Use one of the accounts to deploy the contract
    inbox = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: [INITIAL_STRING] })
        .send({ from: accounts[0], gas: "1000000" })
})

describe("Inbox", () => {
    it("deploys a contract", () => {
        assert.ok(inbox.options.address) // if undefined, the test will fail
    })

    it("has a default message", async () => {
        // first set of paranthesis as being a way to customize the list of arguments being passed to the function
        // second set of paranthesis is used to customize the exact way in which the function will be called (transaction func, call func etc.)
        const message = await inbox.methods.message().call()
        assert.equal(message, INITIAL_STRING)
    })

    it("can change the message", async () => {
        const newMessage = "Bye"
        await inbox.methods.setMessage(newMessage).send({ from: accounts[0] })

        const message = await inbox.methods.message().call()
        assert.equal(message, newMessage)
    })
})



//-----------------------------------------------------SAMPLE CODE------------------------------------------------------//


// class Car {
//     park() {
//         return "stopped"
//     }

//     drive() {
//         return "vroom"
//     }
// }

// let car

// beforeEach(async () => {
//     car = new Car()
// })

// // The string passed is not intrinsically related to the class "Car".
// // it is purely for organisation and interpretability of the output report
// describe("Car", () => {
//     it("can park", async () => {
//         assert.equal(car.park(), "stopped")
//     })

//     it("can drive", async () => {
//         assert.equal(car.drive(), "vroom")
//     })
// }) 