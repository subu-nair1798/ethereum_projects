pragma solidity ^0.4.17;

/// specifies the version of Solidity that the code is written with 
/// version identifier to ensure that the compiler uses the appropriate compiler version


contract Inbox{ 
/// defines a new contract that will have methods and variables
/// the word "contract" is a keyword
    
    string public message;
    /// storage variable
    /// declares all of the instance variables (and their types) that will exist in this contract
    /// these variables exist for the entire life of the contract
    /// structure: data_type access name
    /// storage variables are automatically stored in the blockchain
    /// the value assigned to "message" is stored for all eternity on the ethereum blockchain
    /// local variables are one time creations during contract execution and discarded at the end, they never persist on the blockchain
    
    function Inbox(string initialMessage) public {
        /// constructor function
        /// automatically invoked when the contract is deployed on the blockchain 
        message = initialMessage;
    }
    
    /// member functions can be called separately once the contract is deployed on the blockchain
    /// chnages the blockchain
    function setMessage(string newMessage) public {
        message = newMessage;
    }
    
    /// getMessage() acts as a redundant function since declaring the storage variable "message" 
    /// automatically creates a function which returns the variable name (like getMessage) when called
    /// doesn't change the blockchain
    function getMessage() public view returns (string) {
        return message;
        
        /// function name: getMessage()
        /// function type: public view
        /// return types: returns (string) 
        /// "returns" is only used with functions that are marked "view" or "constant"
    }
}

