const path = require("path") 
// builds a directory path from the compile.js file to the Inbox.sol file
// by using the path module, we're guaranteeing cross-platform compatibility 

const fs = require("fs")
const solc = require("solc")

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol")
const source = fs.readFileSync(inboxPath, "utf8")

const input = {
    language: "Solidity",
    sources: {
        "Inbox.sol" : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"]
            }
        }
    }
}

const output = JSON.parse(solc.compile(JSON.stringify(input)))

module.exports = output.contracts["Inbox.sol"].Inbox