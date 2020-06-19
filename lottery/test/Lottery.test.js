const assert = require("assert")
const ganache = require("ganache-cli")
const Web3 = require("web3")
const provider = Web3.givenProvider || ganache.provider()
const web3 = new Web3(provider)
const { abi, evm } = require("../compile")

let lottery
let accounts

beforeEach(async () => {
    accounts = await web3.eth.getAccounts()

    lottery = await new web3.eth.Contract(abi)
        .deploy({ data: "0x" + evm.bytecode.object })
        .send({ from: accounts[0], gas: "1000000" })   
})

describe("Lottery Contract", () => {
    it("deploys a contract", () => {
        assert.ok(lottery.options.address)
    })
})