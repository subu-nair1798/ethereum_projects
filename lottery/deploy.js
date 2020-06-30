const HDWalletProvider = require("truffle-hdwallet-provider")
const Web3 = require("web3")
const { abi, evm } = require("./compile")

const provider = new HDWalletProvider(
    "slight post clutch clinic avoid parrot leader release force swing wide join",
    "https://rinkeby.infura.io/v3/d1d22a6bf235434cbd9cef0031eae3bd"
)

const web3 = new Web3(provider)
const deploy = async () => {
    const accounts = await web3.eth.getAccounts()
    console.log("Attempting to deploy from the account: ", accounts[0])

    const result = await new web3.eth.Contract(abi)
        .deploy({ data: "0x" + evm.bytecode.object})
        .send({ from: accounts[0] })
    
    console.log(abi)
    console.log("Contract deployed at: ", result.options.address)
}

deploy()